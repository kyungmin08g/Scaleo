package dev.scaleo.domain.test.controller.response

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "테스트 목록 조회 응답 객체")
data class ListTestResponse(

  @field:Schema(description = "테스트 목록")
  val testList: MutableList<ListTestDto>
)
