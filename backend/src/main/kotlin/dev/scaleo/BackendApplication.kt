package dev.scaleo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@EnableJpaAuditing
@SpringBootApplication
class BackendApplication

fun main(args: Array<String>) {
  runApplication<dev.scaleo.BackendApplication>(*args)
}
