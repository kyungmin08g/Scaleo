package dev.scaleo.global.api_response.exception

import dev.scaleo.global.api_response.dto.ApiDto

interface BaseErrorCode {
  val reasonHttpStatus: ApiDto
}
