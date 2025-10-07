package dev.scaleo.domain.test.repository

import com.linecorp.kotlinjdsl.dsl.jpql.jpql
import com.linecorp.kotlinjdsl.render.jpql.JpqlRenderContext
import com.linecorp.kotlinjdsl.support.spring.data.jpa.extension.createQuery
import dev.scaleo.domain.test.Test
import dev.scaleo.domain.test.controller.response.ListTestDto
import jakarta.persistence.EntityManager
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Repository

@Repository
@RequiredArgsConstructor
class ListTestRepository(
  private val context: JpqlRenderContext,
  private val entityManager: EntityManager
) {

  fun testList(): MutableList<ListTestDto> {
    val query = jpql {
      selectNew<ListTestDto>(
        path(Test::id),
        path(Test::title)
      ).from(
        entity(Test::class)
      )
    }

    return entityManager.createQuery(query, context).resultList
  }
}
