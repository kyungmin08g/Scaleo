package dev.scaleo.global.api_response.status

import dev.scaleo.global.api_response.dto.ApiDto
import dev.scaleo.global.api_response.exception.BaseErrorCode
import lombok.Getter
import lombok.RequiredArgsConstructor
import org.springframework.http.HttpStatus
import java.util.*
import java.util.function.Predicate

@Getter
@RequiredArgsConstructor
enum class ErrorStatus(
  val httpStatus: HttpStatus,
  val code: String,
  var message: String? = null
) : BaseErrorCode {

  INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "COMMON500"),

  BAD_REQUEST(HttpStatus.BAD_REQUEST, "COMMON400"),
  NOT_FOUND(HttpStatus.NOT_FOUND, "COMMON404"),
  KEY_NOT_EXIST(HttpStatus.NOT_FOUND, "KEY_NOT_EXIST"),
  UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "COMMON401"),
  TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "TOKEN_EXPIRED");

  fun getMessage(message: String?): String? {
    this.message = message
    return Optional.ofNullable<String>(message)
      .filter(Predicate.not(Predicate { obj: String -> obj.isBlank() }))
      .orElse(this.message)
  }

  override val reasonHttpStatus: ApiDto
    get() = ApiDto(
      message = message!!,
      code = code,
      isSuccess = false,
      httpStatus = httpStatus
    )
}
