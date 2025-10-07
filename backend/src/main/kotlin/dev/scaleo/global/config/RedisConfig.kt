package dev.scaleo.global.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.RedisConnectionFactory
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.serializer.StringRedisSerializer

@Configuration
class RedisConfig {

  @Value("\${spring.data.redis.host}")
  private lateinit var host: String

  @Value("\${spring.data.redis.port}")
  private lateinit var port: String

  @Bean
  fun redisConnectionFactory(): RedisConnectionFactory {
    return LettuceConnectionFactory(host, port.toInt())
  }

  @Bean
  fun redisTemplate(connectionFactory: RedisConnectionFactory): RedisTemplate<String, Any> {
    val template = RedisTemplate<String, Any>()
    template.connectionFactory = connectionFactory
    template.keySerializer = StringRedisSerializer()
    template.valueSerializer = StringRedisSerializer()

    return template
  }
}
