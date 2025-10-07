package dev.scaleo.global.config.jpa

import dev.scaleo.global.utils.CryptoUtils
import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter
import org.springframework.util.StringUtils

@Converter(autoApply = false)
class CryptoConverter : AttributeConverter<String, String> {

  override fun convertToDatabaseColumn(text: String): String? {
    return if (!StringUtils.hasText(text)) null else CryptoUtils.encrypt(text)
  }

  override fun convertToEntityAttribute(dbData: String): String? {
    return if (!StringUtils.hasText(dbData)) null else CryptoUtils.decrypt(dbData)
  }
}
