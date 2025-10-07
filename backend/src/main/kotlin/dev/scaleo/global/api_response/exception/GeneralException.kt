package dev.scaleo.global.api_response.exception

import dev.scaleo.global.api_response.dto.ApiDto
import dev.scaleo.global.api_response.status.ErrorStatus

data class GeneralException(
  val errorStatus: ErrorStatus,
  override val message: String
) : RuntimeException(errorStatus.getMessage(message)) {
  private val code: BaseErrorCode = errorStatus

  val reasonHttpStatus: ApiDto
    get() = this.code.reasonHttpStatus
}
