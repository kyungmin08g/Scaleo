package dev.scaleo.global.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client

@Configuration
class S3Config {

  @Bean
  fun s3Client(credentialsProvider: AwsCredentialsProvider): S3Client {
    return S3Client.builder()
      .credentialsProvider(credentialsProvider)
      .region(Region.AP_NORTHEAST_2)
      .build()
  }
}
