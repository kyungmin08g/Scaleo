package dev.scaleo.global.api_response

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonPropertyOrder
import dev.scaleo.global.api_response.status.SuccessStatus

@JsonPropertyOrder
data class ApiResponse<T>(
  val isSuccess: Boolean,
  val code: String,
  val message: String,

  @field:JsonInclude(JsonInclude.Include.NON_NULL)
  val result: T?,
) {

  companion object {
    fun <T> onSuccess(result: T): ApiResponse<T> {
      return ApiResponse(
        true,
        SuccessStatus.OK.code,
        SuccessStatus.OK.message,
        result
      )
    }

    fun <T> onSuccess(): ApiResponse<T> {
      return ApiResponse(
        true,
        SuccessStatus.OK.code,
        SuccessStatus.OK.message,
        null
      )
    }

    fun <T> onFailure(
      code: String,
      message: String,
      data: T?
    ): ApiResponse<T> {
      return ApiResponse(false, code, message, data)
    }
  }
}
