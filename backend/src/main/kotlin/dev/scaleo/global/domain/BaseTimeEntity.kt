package dev.scaleo.global.domain

import jakarta.persistence.Column
import jakarta.persistence.EntityListeners
import jakarta.persistence.MappedSuperclass
import lombok.Getter
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Getter
@EntityListeners(AuditingEntityListener::class)
@MappedSuperclass
class BaseTimeEntity {

  @CreatedDate
  @Column(name = "created_at", updatable = false)
  lateinit var createdAt: LocalDateTime

  @LastModifiedDate
  @Column(name = "updated_at")
  lateinit var updatedAt: LocalDateTime
}
