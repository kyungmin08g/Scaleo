import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const benefits = [
  {
    title: "개발자 경험 향상",
    items: ["복잡한 테스트 환경 설정 제거", "클릭 몇 번으로 대규모 트래픽 테스트 시작", "직관적인 UI로 쉬운 관리"],
  },
  {
    title: "시간과 비용 절감",
    items: ["반복적인 수동 작업 자동화", "테스트 환경 구축 시간 단축", "성능 최적화에 집중 가능"],
  },
  {
    title: "실무 경험 확보",
    items: ["대규모 트래픽 처리 경험 축적", "성능 병목 분석 및 개선 학습", "포트폴리오 강화"],
  },
  {
    title: "데이터 기반 의사결정",
    items: ["상세한 성능 지표 수집", "모니터링과 분석", "개선 포인트 자동 제안"],
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Scaleo를 사용할 때의 이점</h2>
          <p className="text-lg text-muted-foreground">
            경험 부족한 개발자부터 시니어 엔지니어까지 모두에게 이로운 플랫폼
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            
            <Card key={benefit.title} className="bg-card/50 border-border/40 p-8 items-center shadow-primary">
              <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
              <ul className="space-y-3">

                {benefit.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
