"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Eye, EyeOff } from "lucide-react"
import { TestLoadingModal } from "./test-loading-modal"

interface DBConnection {
  id: number
  type: "mysql" | "postgresql"
  host: string
  port: string
  database: string
  username: string
  password: string
  urlParams: string
  showPassword: boolean
}

export function DataTestForm() {
  const navigate = useNavigate()
  const [scenarioName, setScenarioName] = useState("")
  const [dataSize, setDataSize] = useState("100000")
  const [batchSize, setBatchSize] = useState("1000")
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const [dbConnections, setDbConnections] = useState<DBConnection[]>([
    {
      id: 1,
      type: "mysql",
      host: "",
      port: "3306",
      database: "",
      username: "",
      password: "",
      urlParams: "",
      showPassword: false,
    },
  ])

  const removeDBConnection = (id: number) => {
    if (dbConnections.length > 1) {
      setDbConnections(dbConnections.filter((d) => d.id !== id))
    }
  }

  const updateDBConnection = (id: number, field: keyof DBConnection, value: any) => {
    setDbConnections(
      dbConnections.map((d) => (
        d.id === id ? { 
          ...d, [field]: value
        } : d
      ))
    )
  }

  const handleAlert = () => {
    setAlertMessage("필수 항목을 입력해주세요.")
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleTestStart = async () => {
    if (!scenarioName || !dataSize || !batchSize || !query) {
      handleAlert()
      return
    }

    dbConnections.map((d) => {
      if (!d.database || !d.host || !d.port || !d.username || !d.password || !d.type) {
        handleAlert()
        return
      } else {
        setIsLoading(true)

        // API CALL: POST /api/tests/data
        // Body: {
        //   scenarioName: string
        //   dataSize: number
        //   batchSize: number
        //   query: string
        //   dbConnections: DBConnection[]
        // }
        // Response: { testId: string, status: 'running' }

        setTimeout(() => {
          setIsLoading(false)
          navigate("/results")
        }, 3000)
      }
    })
  }

  return (
    <>
      <TestLoadingModal isOpen={isLoading} scenarioName={scenarioName} testType="data" />

      {showAlert && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-in fade-in-0 duration-300 z-50">
          {alertMessage}
        </div>
      )}

      <form className="space-y-8">
        <Card className="bg-card/50 border-border/40 p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">테스트 기본 정보</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">시나리오 이름 *</label>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="예: 대량 데이터 처리 테스트"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">총 데이터 행 수 *</label>
                <input
                  type="number"
                  value={dataSize}
                  onChange={(e) => setDataSize(e.target.value)}
                  placeholder="100000"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">배치 크기 *</label>
                <input
                  type="number"
                  value={batchSize}
                  onChange={(e) => setBatchSize(e.target.value)}
                  placeholder="1000"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">쿼리 *
                <span className="text-xs text-muted-foreground ml-2">정확한 쿼리를 입력하세요</span>
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SELECT * FROM users WHERE active = true"
                rows={4}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 border-border/40 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">데이터베이스 연결</h2>
          </div>

          <div className="space-y-4">

            {dbConnections.map((db) => (
              <div key={db.id} className="p-4 border border-border/40 rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">데이터베이스</span>

                  {dbConnections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDBConnection(db.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">DB 타입 *</label>
                    <select
                      value={db.type}
                      onChange={(e) => updateDBConnection(db.id, "type", e.target.value)}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
                    >
                      <option value="mysql">MySQL</option>
                      <option value="postgresql">PostgreSQL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">호스트 *</label>
                    <input
                      type="text"
                      value={db.host}
                      onChange={(e) => updateDBConnection(db.id, "host", e.target.value)}
                      placeholder="localhost"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">포트 *</label>
                    <input
                      type="text"
                      value={db.port}
                      onChange={(e) => updateDBConnection(db.id, "port", e.target.value)}
                      placeholder="3306"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">데이터베이스명 *</label>
                    <input
                      type="text"
                      value={db.database}
                      onChange={(e) => updateDBConnection(db.id, "database", e.target.value)}
                      placeholder="testdb"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">사용자명 *</label>
                    <input
                      type="text"
                      value={db.username}
                      onChange={(e) => updateDBConnection(db.id, "username", e.target.value)}
                      placeholder="root"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">비밀번호 *</label>
                    <div className="relative">
                      <input
                        type={db.showPassword ? "text" : "password"}
                        value={db.password}
                        onChange={(e) => updateDBConnection(db.id, "password", e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => updateDBConnection(db.id, "showPassword", !db.showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer"
                      >
                        {db.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">DB URL 파라미터</label>
                    <input
                      type="text"
                      value={db.urlParams}
                      onChange={(e) => updateDBConnection(db.id, "urlParams", e.target.value)}
                      placeholder="charset=utf8mb4&timeout=30s"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            onClick={handleTestStart}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold hover:cursor-pointer"
          >
            테스트 시작하기
          </Button>
        </div>
      </form>
    </>
  )
}
