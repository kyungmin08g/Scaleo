package dev.scaleo.domain.test.controller.request

import io.swagger.v3.oas.annotations.media.Schema

@JvmRecord
@Schema(description = "테스트 생성 요청 객체")
data class CreateTestRequest(

  @field:Schema(description = "제목")
  val title: String,

  @field:Schema(description = "내용")
  val content: String
)
