package dev.scaleo.domain.test.service

import dev.scaleo.domain.test.controller.response.DetailTestResponse
import dev.scaleo.domain.test.repository.DetailTestRepository
import dev.scaleo.global.api_response.exception.GeneralException
import dev.scaleo.global.api_response.status.ErrorStatus
import lombok.RequiredArgsConstructor
import org.springframework.transaction.annotation.Transactional

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
class DetailTestService(
  private val detailTestRepository: DetailTestRepository
) {

  fun getTest(testId: Long): DetailTestResponse {
    val response: DetailTestResponse = detailTestRepository.getTest(testId) ?: throw GeneralException(
      ErrorStatus.NOT_FOUND,
      "존재하지 않는 TEST ID입니다."
    )

    return response
  }
}
