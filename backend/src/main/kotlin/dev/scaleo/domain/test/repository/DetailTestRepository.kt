package dev.scaleo.domain.test.repository

import com.linecorp.kotlinjdsl.dsl.jpql.jpql
import com.linecorp.kotlinjdsl.render.jpql.JpqlRenderContext
import com.linecorp.kotlinjdsl.support.spring.data.jpa.extension.createQuery
import dev.scaleo.domain.test.Test
import dev.scaleo.domain.test.controller.response.DetailTestResponse
import jakarta.persistence.EntityManager
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Repository

@Repository
@RequiredArgsConstructor
class DetailTestRepository(
  private val context: JpqlRenderContext,
  private val entityManager: EntityManager
) {

  fun getTest(testId: Long?): DetailTestResponse? {
    val query = jpql {
      selectNew<DetailTestResponse>(
        path(Test::id),
        path(Test::title),
        path(Test::content),
      ).from(
        entity(Test::class)
      ).where(
        path(Test::id).eq(testId)
      )
    }

    return entityManager.createQuery(query, context).resultList.firstOrNull()
  }
}
