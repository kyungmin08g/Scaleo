"use client"

import { Button } from "@/components/ui/button"
import { Github, Chrome } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  
  const handleGitHubLogin = () => {
    // API CALL: POST /api/auth/github
    // GitHub OAuth 인증 요청 및 사용자 정보 저장
    // 응답: { success: true, user: {...}, token: "..." }
    navigate("/test")
  }

  const handleGoogleLogin = () => {
    // API CALL: POST /api/auth/google
    // Google OAuth 인증 요청 및 사용자 정보 저장
    // 응답: { success: true, user: {...}, token: "..." }
    navigate("/test")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="text-center">
            <a href="#" className="inline-flex items-center justify-center text-center">
              <div className="w-5.5 h-5.5 rounded from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground mb-4 m-2">
                <img src="/service-logo.png" alt="Scaleo"/>
              </div>
            </a>
            <a href="#" className="inline-block">
              <h1 className="text-2xl font-bold text-foreground text-balance">Scaleo</h1>
            </a>
          </div>          
        </div>

        {/* Card */}
        <div className="bg-secondary/50 backdrop-blur border border-secondary rounded-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">로그인</h2>
            <p className="text-foreground/60 text-sm">대규모 트래픽과 데이터 처리를 테스트하세요</p>
          </div>

          {/* GitHub Login */}
          <Button
            onClick={handleGitHubLogin}
            variant="outline"
            className="w-full h-12 border border-secondary-foreground/20 hover:cursor-pointer hover:text-foreground text-foreground flex items-center justify-center gap-2 transition-colors bg-transparent"
          >
            <Github className="w-5 h-5" />
            <span>GitHub로 계속하기</span>
          </Button>

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 border border-secondary-foreground hover:cursor-pointer hover:text-foreground text-foreground flex items-center justify-center gap-2 transition-colors bg-transparent"
          >
            <Chrome className="w-5 h-5" />
            <span>Google로 계속하기</span>
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-secondary/50 px-2 text-foreground/60">또는</span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-secondary border border-cyan-500/20 rounded-lg p-4 space-y-2">
            <p className="text-sm text-foreground/80 font-medium">OAuth 로그인이 필요합니다</p>
            <p className="text-xs text-foreground/60">
              GitHub 또는 Google 계정으로 로그인하여 Scaleo의 모든 기능을 사용할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-foreground/50 mt-6">
          로그인하면{" "}
          <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            이용약관
          </a>
          과{" "}
          <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            개인정보처리방침
          </a>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  )
}
