package dev.scaleo.domain.test.controller.response

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "테스트 상세 조회 응답 객체")
data class DetailTestResponse(

  @field:Schema(description = "테스트 ID")
  val testId: Long,

  @field:Schema(description = "제목")
  val title: String,

  @field:Schema(description = "내용")
  val content: String
)
