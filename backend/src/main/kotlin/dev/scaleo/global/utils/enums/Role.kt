package dev.scaleo.global.utils.enums

import lombok.AllArgsConstructor
import lombok.Getter

@Getter
@AllArgsConstructor
enum class Role(
  val value: String
) {
  USER("회원"),
  ADMIN("관리자")
}
