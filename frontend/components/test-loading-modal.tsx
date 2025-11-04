"use client"

interface TestLoadingModalProps {
  isOpen: boolean
  scenarioName: string
  testType: "load" | "data"
}

export function TestLoadingModal({ isOpen, scenarioName, testType }: TestLoadingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border/40 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-xl font-semibold text-foreground mb-2">{scenarioName || "테스트 실행 중"}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {testType === "load" ? "부하 테스트" : "데이터 테스트"}가 진행 중입니다.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-secondary opacity-30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-cyan-400 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-semibold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">로딩</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-foreground">테스트 실행 중...</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>

          <div className="pt-4 border-t border-border/40">
            <p className="text-xs text-muted-foreground text-center">테스트가 진행 중이니 잠시만 기다려주세요...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
