package dev.scaleo.domain.test.service

import dev.scaleo.domain.test.controller.response.DetailTestResponse
import dev.scaleo.domain.test.controller.response.ListTestResponse
import dev.scaleo.domain.test.controller.request.CreateTestRequest
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class TestService(
  private val createTestService: CreateTestService,
  private val detailTestService: DetailTestService,
  private val listTestService: ListTestService
) {

  fun createTest(request: CreateTestRequest) {
    createTestService.createTest(request)
  }

  fun getTest(testId: Long): DetailTestResponse {
    return detailTestService.getTest(testId)
  }

  fun getTestList(): ListTestResponse {
    return listTestService.getTestList()
  }
}
