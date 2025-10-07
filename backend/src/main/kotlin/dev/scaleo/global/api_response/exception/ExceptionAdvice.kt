package dev.scaleo.global.api_response.exception

import dev.scaleo.global.api_response.ApiResponse
import dev.scaleo.global.api_response.dto.ApiDto
import dev.scaleo.global.api_response.status.ErrorStatus
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.ConstraintViolation
import jakarta.validation.ConstraintViolationException
import lombok.extern.slf4j.Slf4j
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.ServletWebRequest
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.lang.RuntimeException
import java.util.Optional
import java.util.function.Consumer
import java.util.function.Supplier

@Slf4j
@RestControllerAdvice(annotations = [RestController::class])
class ExceptionAdvice : ResponseEntityExceptionHandler() {

  @ExceptionHandler
  fun validation(
    e: ConstraintViolationException,
    request: WebRequest
  ): ResponseEntity<Any?>? {
    val errorMessage = e.constraintViolations.stream()
      .map { obj: ConstraintViolation<*>? -> obj!!.message }
      .findFirst()
      .orElseThrow(Supplier {
        RuntimeException("Error occurred while extracting ConstraintViolationException")
      })

    return handleExceptionInternalConstraint(e, ErrorStatus.valueOf(errorMessage), request)
  }

  override fun handleMethodArgumentNotValid(
    e: MethodArgumentNotValidException,
    headers: HttpHeaders,
    status: HttpStatusCode,
    request: WebRequest
  ): ResponseEntity<Any?>? {
    val errors: MutableMap<String?, String?> = LinkedHashMap()

    e.bindingResult.fieldErrors.forEach(Consumer { fieldError: FieldError? ->
      val fieldName: String = fieldError!!.field
      val errorMessage = Optional.ofNullable<String>(fieldError.defaultMessage).orElse("")

      errors.merge(
        fieldName,
        errorMessage
      ) { existingErrorMessage: String?, newErrorMessage: String? -> "$existingErrorMessage, $newErrorMessage" }
    })

    return handleExceptionInternalArgs(e, ErrorStatus.BAD_REQUEST, request, errors)
  }

  @ExceptionHandler
  fun exception(e: Exception, request: WebRequest): ResponseEntity<Any?>? {
    e.printStackTrace()

    return handleExceptionInternalFalse(e, ErrorStatus.INTERNAL_ERROR.httpStatus, request, e.message)
  }

  @ExceptionHandler(value = [GeneralException::class])
  fun onThrowException(
    generalException: GeneralException,
    request: HttpServletRequest
  ): ResponseEntity<Any?>? {
    val errorReasonHttpStatus: ApiDto = generalException.reasonHttpStatus

    return handleExceptionInternal(generalException, errorReasonHttpStatus, request)
  }

  private fun handleExceptionInternal(
    e: Exception,
    reason: ApiDto,
    request: HttpServletRequest
  ): ResponseEntity<Any?>? {
    val body: ApiResponse<Any?> = ApiResponse.onFailure(reason.code, reason.message, null)
    e.printStackTrace()
    val webRequest: WebRequest = ServletWebRequest(request)

    return super.handleExceptionInternal(e, body, HttpHeaders.EMPTY, reason.httpStatus, webRequest)
  }

  private fun handleExceptionInternalFalse(
    e: Exception,
    status: HttpStatus,
    request: WebRequest,
    errorPoint: String?
  ): ResponseEntity<Any?>? {
    val body: ApiResponse<Any?> = ApiResponse.onFailure(
      ErrorStatus.INTERNAL_ERROR.code,
      ErrorStatus.INTERNAL_ERROR.message ?: "Server error",
      errorPoint
    )

    return super.handleExceptionInternal(
      e,
      body,
      HttpHeaders.EMPTY,
      status,
      request
    )
  }

  private fun handleExceptionInternalArgs(
    e: Exception,
    errorCommonStatus: ErrorStatus,
    request: WebRequest,
    errorArgs: MutableMap<String?, String?>?
  ): ResponseEntity<Any?>? {
    val body: ApiResponse<Any?> = ApiResponse.onFailure(errorCommonStatus.code, errorCommonStatus.message!!, errorArgs)

    return super.handleExceptionInternal(
      e,
      body,
      HttpHeaders.EMPTY,
      errorCommonStatus.httpStatus,
      request
    )
  }

  private fun handleExceptionInternalConstraint(
    e: java.lang.Exception, errorCommonStatus: ErrorStatus,
    request: WebRequest
  ): ResponseEntity<Any?>? {
    val body: ApiResponse<Any?> = ApiResponse.onFailure(errorCommonStatus.code, errorCommonStatus.message!!, null)

    return super.handleExceptionInternal(
      e,
      body,
      HttpHeaders.EMPTY,
      errorCommonStatus.httpStatus,
      request
    )
  }
}
