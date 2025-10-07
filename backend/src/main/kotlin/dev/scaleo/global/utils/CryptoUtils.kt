package dev.scaleo.global.utils

import jakarta.annotation.PostConstruct
import org.apache.commons.codec.binary.Hex
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.nio.charset.StandardCharsets
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

@Component
class CryptoUtils {

  @Value("\${crypto.private-key}")
  private lateinit var nonPrivateKey: String

  @Value("\${crypto.transformation}")
  private lateinit var nonTransformation: String

  @PostConstruct
  fun init() {
    privateKey = this.nonPrivateKey
    transformation = this.nonTransformation
  }

  companion object {
    private lateinit var privateKey: String
    private lateinit var transformation: String

    fun encrypt(plainText: String): String {
      try {
        val cipher = Cipher.getInstance(transformation)
        cipher.init(
          Cipher.ENCRYPT_MODE,
          SecretKeySpec(privateKey.toByteArray(StandardCharsets.UTF_8), "AES"),
          IvParameterSpec(privateKey.substring(0, 16).toByteArray())
        )
        val encryptByte = cipher.doFinal(plainText.toByteArray(StandardCharsets.UTF_8))

        return Hex.encodeHexString(encryptByte)
      } catch (e: Exception) {
        throw RuntimeException("An error occurred during encryption.")
      }
    }

    fun decrypt(cipherText: String): String {
      try {
        val cipher = Cipher.getInstance(transformation)
        cipher.init(
          Cipher.DECRYPT_MODE,
          SecretKeySpec(privateKey.toByteArray(StandardCharsets.UTF_8), "AES"),
          IvParameterSpec(privateKey.substring(0, 16).toByteArray())
        )
        val decryptByte = Hex.decodeHex(cipherText.toCharArray())

        return String(cipher.doFinal(decryptByte), StandardCharsets.UTF_8)
      } catch (e: Exception) {
        throw RuntimeException("An error occurred during decryption.")
      }
    }
  }
}
