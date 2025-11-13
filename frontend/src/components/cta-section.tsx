"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function CTASection() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn")
    if (isLoggedIn) {
      navigate("/test")
    } else {
      navigate("/login")
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-secondary/30 to-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-lg text-muted-foreground mb-8">
            계정을 만들어 대규모 트래픽을 테스트하여 히스토리를 저장하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleStartTest}
              size="lg"
              className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground gap-2 group w-full sm:w-auto"
            >
              테스트 시작하기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">신용카드 정보 없이 무료로 시작할 수 있습니다.</p>
        </div>
      </div>
    </section>
  )
}
