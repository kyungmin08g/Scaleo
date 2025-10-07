package dev.scaleo.domain.test.service

import dev.scaleo.domain.test.Test
import dev.scaleo.domain.test.controller.request.CreateTestRequest
import dev.scaleo.domain.test.repository.TestRepository
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@RequiredArgsConstructor
@Transactional
class CreateTestService(
  private val testRepository: TestRepository
) {

  fun createTest(request: CreateTestRequest) {
    this.testRepository.save(
      Test(
          title = request.title,
          content = request.content
      )
    )
  }
}
