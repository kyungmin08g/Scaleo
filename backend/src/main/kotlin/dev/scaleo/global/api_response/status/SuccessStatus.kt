package dev.scaleo.global.api_response.status

import lombok.AllArgsConstructor
import lombok.Getter
import org.springframework.http.HttpStatus

@Getter
@AllArgsConstructor
enum class SuccessStatus(
  val httpStatus: HttpStatus,
  val code: String,
  val message: String
) {
  OK(HttpStatus.OK, "COMMON200", "요청이 성공적으로 처리되었습니다.");
}
