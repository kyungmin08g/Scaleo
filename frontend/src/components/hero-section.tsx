"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Zap } from "lucide-react"

const statsData = [
  { title: "요청 처리", desc: "1,000+" },
  { title: "진입 장벽", desc: "0 설정" },
  { title: "테스트 시작까지", desc: "1분" },
  { title: "결과 분석", desc: "실시간" }
]

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 grid-line opacity-40" />

      {/* Glow effects */}
      <div className="absolute top-32 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Build Better Performance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">대규모 트래픽 테스트</span>
            <br />
            <span className="text-foreground">단 한 곳에서 관리하세요</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Scaleo는 복잡한 성능 테스트 환경 설정을 없애고, 대규모 트래픽과 데이터 처리 경험을 쉽게 얻을 수 있게 합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground gap-2 group"
              onClick={() => {
                {/* TODO: 로그인 여부 로직 구현 */}

                const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn")
                if (isLoggedIn) {
                  navigate("/test")
                } else {
                  navigate("/login")
                }
              }}
            >
              무료로 시작하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-16 border-t border-border/40">
            {statsData.map((data, index) => 
              <div key={index}>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{data.desc}</div>
                <p className="text-sm text-muted-foreground">{data.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
