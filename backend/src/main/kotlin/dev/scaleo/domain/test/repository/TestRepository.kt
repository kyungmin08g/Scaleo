package dev.scaleo.domain.test.repository

import dev.scaleo.domain.test.Test
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TestRepository : JpaRepository<Test, Long>
