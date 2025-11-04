"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Trash2, Eye } from "lucide-react"
import { TestDetailModal } from "./test-detail-modal"

interface TestRecord {
  id: number
  name: string
  status: "completed" | "failed"
  successRate: number
  avgResponseTime: number
  totalRequests: number
  completedRequests: number
  date: string
  duration: string
}

const mockRecords: TestRecord[] = [
  {
    id: 1,
    name: "블랙프라이데이 부하 테스트",
    status: "completed",
    successRate: 99.8,
    avgResponseTime: 164,
    totalRequests: 10000,
    completedRequests: 10000,
    date: "2025-01-15",
    duration: "2분 42초",
  },
  {
    id: 2,
    name: "피크 타임 시뮬레이션",
    status: "completed",
    successRate: 98.5,
    avgResponseTime: 245,
    totalRequests: 5000,
    completedRequests: 5000,
    date: "2025-01-14",
    duration: "1분 32초",
  },
  {
    id: 3,
    name: "DB 확장성 검증",
    status: "failed",
    successRate: 87.2,
    avgResponseTime: 1200,
    totalRequests: 8000,
    completedRequests: 6976,
    date: "2025-01-12",
    duration: "3분 18초",
  },
  {
    id: 4,
    name: "API 성능 기준선",
    status: "completed",
    successRate: 99.9,
    avgResponseTime: 89,
    totalRequests: 15000,
    completedRequests: 15000,
    date: "2025-01-10",
    duration: "4분 12초",
  },
  {
    id: 5,
    name: "동시성 테스트",
    status: "completed",
    successRate: 99.1,
    avgResponseTime: 178,
    totalRequests: 12000,
    completedRequests: 12000,
    date: "2025-01-08",
    duration: "2분 56초",
  },
]

export function HistoryView() {
  const router = useRouter()

  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("all")
  const filter = useRef("")
  const search = useRef("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "완료"
      case "failed":
        return "실패"
    }
  }

  const handleViewDetail = (record: TestRecord) => {
    setSelectedRecord(record)
    setShowDetailModal(true)
  }

  const handleCall = () => {
    setShowAlert(true)
    setAlertMessage("삭제되었습니다.")
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  return (
    <>
      <TestDetailModal
        isOpen={showDetailModal}
        record={selectedRecord || undefined}
        onClose={() => setShowDetailModal(false)}
      />

      <div className="space-y-6">
        {showAlert && (
          <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-in fade-in-0 duration-300 z-50">
            {alertMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">테스트 히스토리</h1>
            <p className="text-muted-foreground">지금까지 진행한 모든 테스트 기록</p>
          </div>
          <Button
            onClick={() => {
              {/* TODO: 로그인 여부 로직 구현 */}
              
              const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn")
              if (isLoggedIn) {
                router.push("/test")
              } else {
                router.push("/login")
              }
            }}
            className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground self-start"
          >
            새 테스트 시작
          </Button>
        </div>

        {/* 필터 */}
        <Card className="bg-card/50 border-border/40 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="테스트 이름 검색..."
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => {
                search.current = e.target.value
                console.log(search)
              }}
            />
            <select 
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
              onChange={(e) => {
                {/* API CALL: GET /api/test/history/filter - 테스트 히스토리 필터링 */}
                filter.current = e.target.value
                console.log(filter)
              }}
            >
              <option value="all">모든 상태</option>
              <option value="completed">완료</option>
              <option value="failed">실패</option>
            </select>
          </div>
        </Card>

        {/* 히스토리 테이블 */}
        <Card className="bg-card/50 border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">테스트 이름</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">상태</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">성공률</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">응답시간</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">날짜</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">작업</th>
                </tr>
              </thead>
              <tbody>
                {mockRecords.map((record) => (
                  <tr key={record.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-foreground">{record.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {record.completedRequests.toLocaleString()} / {record.totalRequests.toLocaleString()} 요청
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <span className="text-sm text-muted-foreground">{getStatusLabel(record.status)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                        {record.successRate}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-foreground font-mono">{record.avgResponseTime} ms</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{record.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetail(record)}
                          className="p-2 text-muted-foreground hover:text-primary hover:cursor-pointer transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button 
                          className="p-2 text-muted-foreground hover:text-destructive hover:cursor-pointer transition-colors"
                          onClick={() => {
                            {/* API CALL: DELETE /api/test/:id - 테스트 기록 삭제 */}
                            handleCall()
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 통계 요약 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/40 p-6">
            <p className="text-sm text-muted-foreground mb-2">총 테스트</p>
            <p className="text-3xl font-bold text-foreground">{mockRecords.length}</p>
          </Card>
          <Card className="bg-card/50 border-border/40 p-6">
            <p className="text-sm text-muted-foreground mb-2">완료된 테스트</p>
            <p className="text-3xl font-bold text-green-500">
              {mockRecords.filter((r) => r.status === "completed").length}
            </p>
          </Card>
          <Card className="bg-card/50 border-border/40 p-6">
            <p className="text-sm text-muted-foreground mb-2">평균 성공률</p>
            <p className="text-3xl font-bold text-foreground">
              {(mockRecords.reduce((sum, r) => sum + r.successRate, 0) / mockRecords.length).toFixed(1)}%
            </p>
          </Card>
          <Card className="bg-card/50 border-border/40 p-6">
            <p className="text-sm text-muted-foreground mb-2">처리된 총 요청</p>
            <p className="text-3xl font-bold text-foreground">
              {mockRecords.reduce((sum, r) => sum + r.completedRequests, 0).toLocaleString()}
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
