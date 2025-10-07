package dev.scaleo.domain.test.service

import dev.scaleo.domain.test.controller.response.ListTestResponse
import dev.scaleo.domain.test.repository.ListTestRepository
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class ListTestService(
  private val listTestRepository: ListTestRepository
) {

  fun getTestList(): ListTestResponse {
    return ListTestResponse(testList = listTestRepository.testList())
  }
}
