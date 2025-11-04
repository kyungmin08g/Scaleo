import { Card } from "@/components/ui/card"
import { Activity, Database, Zap, LineChart, Shield, Settings } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "자동화된 트래픽 생성",
    description: "복잡한 설정 없이 불규칙 트래픽을 자동으로 생성하고 관리합니다.",
  },
  {
    icon: Database,
    title: "DB 연결",
    description: "MySQL, PostgreSQL 등 다양한 데이터베이스를 연결해 테스트합니다.",
  },
  {
    icon: LineChart,
    title: "성능 분석",
    description: "API 응답 시간, 처리량을 시각화합니다.",
  },
  {
    icon: Zap,
    title: "빠른 테스트 시작",
    description: "테스트 시나리오만 설정하면 즉시 대규모 부하 테스트를 시작합니다.",
  },
  {
    icon: Shield,
    title: "안전한 테스트",
    description: "사용자가 직접 승인한 후에만 트래픽을 실행하여 안정성을 보장합니다.",
  },
  {
    icon: Settings,
    title: "상세한 결과 관리",
    description: "테스트 기록, 히스토리 관리, 성능 개선 포인트를 한눈에 확인합니다.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-line opacity-20" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">강력한 기능들</h2>
          <p className="text-lg text-muted-foreground">
            개발자들이 원하는 모든 테스트 기능을 하나의 플랫폼에서 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="bg-card/50 border-border/40 hover:border-primary/50 transition-colors p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
