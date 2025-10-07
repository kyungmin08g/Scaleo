package dev.scaleo.global.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
class CorsConfig : WebMvcConfigurer {
  override fun addCorsMappings(registry: CorsRegistry) {
    registry.addMapping("/**")
      .allowedOriginPatterns(
        "http://localhost:3000"
      )
      .allowedMethods("*")
      .allowedHeaders("*")
      .allowCredentials(true)
      .exposedHeaders("Authorization")
      .maxAge(3600)
  }
}
