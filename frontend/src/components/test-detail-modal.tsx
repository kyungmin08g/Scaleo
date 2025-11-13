"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, BarChart3, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface TestDetailModalProps {
  isOpen: boolean
  record?: {
    id: number
    name: string
    status: "completed" | "running" | "failed"
    successRate: number
    avgResponseTime: number
    totalRequests: number
    completedRequests: number
    date: string
    duration: string
  }
  onClose: () => void
}

export function TestDetailModal({ isOpen, record, onClose }: TestDetailModalProps) {
  if (!isOpen || !record) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border/40 flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-foreground">테스트 상세 분석</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground hover:cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 기본 정보 */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              기본 정보
            </h3>
            {/* API CALL: GET 테스트 상세 조회 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">테스트 이름</p>
                <p className="font-medium text-foreground">{record.name}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">테스트 상태</p>
                <div className="flex items-center gap-2">
                  {record.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {record.status === "failed" && <AlertCircle className="w-4 h-4 text-red-500" />}
                  <p className="font-medium text-foreground">
                    {record.status === "completed" ? "완료" : record.status === "failed" ? "실패" : "실행 중"}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">실행 일시</p>
                <p className="font-medium text-foreground">{record.date}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">소요 시간</p>
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {record.duration}
                </p>
              </div>
            </div>
          </div>

          {/* 성능 메트릭 */}
          <div>
            {/* API CALL: GET 테스트 상세 조회 */}
            <h3 className="text-lg font-semibold text-foreground mb-4">성능 메트릭</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary/20 rounded-lg border border-green-500/20">
                <p className="text-xs text-muted-foreground mb-2">성공률</p>
                <p className="text-3xl font-bold text-green-500">{record.successRate}%</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg border border-blue-500/20">
                <p className="text-xs text-muted-foreground mb-2">평균 응답 시간</p>
                <p className="text-3xl font-bold text-blue-500">{record.avgResponseTime}ms</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg border border-cyan-500/20">
                <p className="text-xs text-muted-foreground mb-2">요청 처리</p>
                <p className="text-lg font-bold text-cyan-500">
                  {record.completedRequests.toLocaleString()} / {record.totalRequests.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 상세 통계 */}
          <div>
            {/* API CALL: GET 테스트 상세 조회 */}
            <h3 className="text-lg font-semibold text-foreground mb-4">상세 통계</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                <span className="text-sm text-muted-foreground">성공한 요청</span>
                <span className="font-mono font-semibold text-foreground">
                  {Math.round((record.completedRequests * record.successRate) / 100).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                <span className="text-sm text-muted-foreground">실패한 요청</span>
                <span className="font-mono font-semibold text-red-500">
                  {Math.round(record.completedRequests * (1 - record.successRate / 100)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                <span className="text-sm text-muted-foreground">미처리 요청</span>
                <span className="font-mono font-semibold text-yellow-500">
                  {(record.totalRequests - record.completedRequests).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                <span className="text-sm text-muted-foreground">초당 처리량 (RPS)</span>
                <span className="font-mono font-semibold text-foreground">
                  {(record.completedRequests / (Number.parseInt(record.duration) * 60)).toFixed(2)} req/s
                </span>
              </div>
            </div>
          </div>

          {/* 권장 사항 */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">최적화 권장사항</h3>
            <div className="p-4 bg-secondary/20 border border-border/40 rounded-lg space-y-2">
              {/* API CALL: GET 최적화 권장 멘트 조회 */}
              {record.successRate < 95 && (
                <p className="text-sm text-yellow-500">성공률이 95% 이하입니다. API 응답 오류를 확인해주세요.</p>
              )}
              {record.avgResponseTime > 500 && (
                <p className="text-sm text-yellow-500">
                  평균 응답 시간이 길어보입니다. 데이터베이스 쿼리 최적화를 고려하세요.
                </p>
              )}
              {record.completedRequests < record.totalRequests * 0.9 && (
                <p className="text-sm text-yellow-500">처리되지 않은 요청이 많습니다. 서버 자원을 확인해주세요.</p>
              )}
              {record.successRate >= 95 && record.avgResponseTime <= 500 && (
                <p className="text-sm text-green-500">모든 성능 지표가 양호합니다!</p>
              )}
            </div>
          </div>

          {/* 에러 로그 */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">에러 로그 (최근 5개)</h3>
            {/* API CALL: GET /api/test/:id/errors - 테스트 에러 로그 조회 */}
            <div className="space-y-2">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-muted-foreground">
                Connection timeout at 14:32:15 - 3 occurrences
              </div>
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-muted-foreground">
                500 Internal Server Error at 14:31:42 - 1 occurrence
              </div>
            </div>
          </div>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground">닫기</Button>
        </div>
      </Card>
    </div>
  )
}
