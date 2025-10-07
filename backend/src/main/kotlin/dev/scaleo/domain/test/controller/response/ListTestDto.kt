package dev.scaleo.domain.test.controller.response

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "테스트 목록 조회 응답 DTO")
data class ListTestDto(

  @field:Schema(description = "테스트 ID")
  val testId: Long,

  @field:Schema(description = "제목")
  val title: String?
)
