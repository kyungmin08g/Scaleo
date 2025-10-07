package dev.scaleo.global.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.servers.Server
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

  @Bean
  fun openAPI(): OpenAPI {
    val info = Info()
      .title("Scaleo Specification")
      .description("Scaleo API Docs")
      .version("1.0.0")

    // JWT 구현 시 주석 제거
//    val jwtSchemeName = "JWT TOKEN"
//    val securityRequirement = SecurityRequirement().addList(jwtSchemeName)
//
//    val components = Components().addSecuritySchemes(
//      jwtSchemeName, SecurityScheme()
//      .name("Authorization")
//      .type(SecurityScheme.Type.HTTP)
//      .scheme("bearer")
//      .bearerFormat("JWT")
//      .`in`(SecurityScheme.In.HEADER)
//    )

    return OpenAPI()
      .info(info)
      .addServersItem(Server().url("/"))
//      .addSecurityItem(securityRequirement)
//      .components(components)
  }
}
