"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Database } from "lucide-react"

interface TestType {
  id: string
  title: string
  description: string
  icon: any
  href: string
  color: string
}

const testTypes: TestType[] = [
  {
    id: "load",
    title: "부하 테스트",
    description: "대규모 트래픽이 시스템에 미치는 영향을 테스트합니다.",
    icon: Zap,
    href: "/test/load",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "data",
    title: "데이터 테스트",
    description: "방대한 데이터 처리 시 DB 성능을 테스트합니다.",
    icon: Database,
    href: "/test/data",
    color: "from-purple-500 to-pink-500",
  },
]

export function TestTypeSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {testTypes.map((type) => {
        const Icon = type.icon

        return (
          <a key={type.id} href={type.href}>
            <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition-colors h-full cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground hover:cursor-pointer">시작하기</Button>
                </div>
              </div>
            </Card>
          </a>
        )
      })}
    </div>
  )
}
