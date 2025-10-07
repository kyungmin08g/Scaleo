package dev.scaleo.global.api_response.dto

import org.springframework.http.HttpStatus

data class ApiDto(
  val httpStatus: HttpStatus,
  val isSuccess: Boolean,
  val code: String,
  val message: String
)
