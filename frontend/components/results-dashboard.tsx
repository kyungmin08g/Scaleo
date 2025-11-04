"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const dummyData = [
  { time: "00:42", endpoint: "GET /api/users", status: 200, duration: 162 },
  { time: "00:41", endpoint: "POST /api/data", status: 201, duration: 185 },
  { time: "00:40", endpoint: "GET /api/products", status: 200, duration: 148 },
  { time: "00:39", endpoint: "PUT /api/users/123", status: 200, duration: 172 },
  { time: "00:38", endpoint: "GET /api/orders", status: 200, duration: 156 },
  { time: "00:37", endpoint: "DELETE /api/cache", status: 204, duration: 89 },
]

export function ResultsDashboard() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">테스트 결과</h1>
          <p className="text-muted-foreground">테스트</p>
        </div>
      </div>

      {/* 요청 로그 */}
      <Card className="bg-card/50 border-border/40 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">최근 요청 로그</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">시간</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">엔드포인트</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">상태</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">응답시간</th>
              </tr>
            </thead>
            <tbody>
              
              {dummyData.map((log, idx) => (
                <tr key={idx} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{log.time}</td>
                  <td className="py-3 px-4 text-foreground font-mono text-xs">{log.endpoint}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground">{log.duration} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
