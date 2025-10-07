package dev.scaleo.domain.test.controller

import dev.scaleo.domain.test.controller.request.CreateTestRequest
import dev.scaleo.domain.test.controller.response.DetailTestResponse
import dev.scaleo.domain.test.controller.response.ListTestResponse
import dev.scaleo.domain.test.service.TestService
import dev.scaleo.global.api_response.ApiResponse
import io.swagger.v3.oas.annotations.Hidden
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import lombok.RequiredArgsConstructor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Hidden
@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
@Tag(name = "Test", description = "테스트 관련 API")
class TestController(
  private val testService: TestService
) {

  @PostMapping
  @Operation(summary = "테스트 생성")
  fun createTest(
    @RequestBody @Valid request: CreateTestRequest
  ): ApiResponse<Void?> {
    testService.createTest(request)
    return ApiResponse.onSuccess()
  }

  @GetMapping("/{testId}")
  @Operation(summary = "테스트 상세 조회")
  fun getTest(
    @PathVariable("testId") testId: Long
  ): ApiResponse<DetailTestResponse> {
    return ApiResponse.onSuccess(testService.getTest(testId))
  }

  @GetMapping
  @Operation(summary = "테스트 목록 조회")
  fun testList(): ApiResponse<ListTestResponse> {
    return ApiResponse.onSuccess(testService.getTestList())
  }
}
