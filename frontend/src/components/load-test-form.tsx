"use client"

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { TestLoadingModal } from "./test-loading-modal"

interface KeyValuePair {
  id: string
  key: string
  value: string
}

interface APIEndpoint {
  id: number
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  url: string
  contentType: string
  bodyType: "json" | "form" | "text"
  queryParams: KeyValuePair[]
  headers: KeyValuePair[]
  body: KeyValuePair[]
  authType: "none" | "basic" | "bearer" | "api-key"
  authValue: string
}

export function LoadTestForm() {
  const navigate = useNavigate()

  const isRequiredFieldCheck = useRef(false)
  const isChecked = useRef(false)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [scenarioName, setScenarioName] = useState("")
  const [trafficCount, setTrafficCount] = useState("1000")
  const [isTestRunning, setIsTestRunning] = useState(false)

  const [apiEndpoints, setApiEndpoints] = useState<APIEndpoint[]>([
    {
      id: 1,
      method: "GET",
      url: "",
      contentType: "application/json",
      bodyType: "json",
      queryParams: [],
      headers: [],
      body: [],
      authType: "none",
      authValue: "",
    },
  ])

  const addAPIEndpoint = () => {
    const newId = Math.max(...apiEndpoints.map((a) => a.id || 0)) + 1
    setApiEndpoints([
      ...apiEndpoints,
      {
        id: newId,
        method: "GET",
        url: "",
        contentType: "application/json",
        bodyType: "json",
        queryParams: [],
        headers: [],
        body: [],
        authType: "none",
        authValue: "",
      },
    ])
  }

  const removeAPIEndpoint = (id: number) => {
    if (apiEndpoints.length > 1) {
      setApiEndpoints(apiEndpoints.filter((a) => a.id !== id))
    }
  }

  const updateAPIEndpoint = (id: number, field: string, value: any) => {
    setApiEndpoints(
      apiEndpoints.map((a) => (
        a.id === id ? {
          ...a, [field]: value
        } : a
      ))
    )
  }

  const addKeyValuePair = (endpointId: number, fieldName: "queryParams" | "headers" | "body") => {
    setApiEndpoints(
      apiEndpoints.map((a) => {
        if (a.id === endpointId) {
          return {
            ...a,
            [fieldName]: [...a[fieldName], { id: Math.random().toString(), key: "", value: "" }],
          }
        }

        return a
      }),
    )
  }

  const removeKeyValuePair = (endpointId: number, fieldName: "queryParams" | "headers" | "body", pairId: string) => {
    setApiEndpoints(
      apiEndpoints.map((a) => {
        if (a.id === endpointId) {
          return {
            ...a,
            [fieldName]: a[fieldName].filter((pair) => pair.id !== pairId),
          }
        }

        return a
      }),
    )
  }

  const updateKeyValuePair = (
    endpointId: number,
    fieldName: "queryParams" | "headers" | "body",
    pairId: string,
    key: "key" | "value",
    newValue: string,
  ) => {
    setApiEndpoints(
      apiEndpoints.map((a) => {
        if (a.id === endpointId) {
          return {
            ...a,
            [fieldName]: a[fieldName].map((pair) => (pair.id === pairId ? { ...pair, [key]: newValue } : pair)),
          }
        }

        return a
      }),
    )
  }

  // 서비스 내부 알림 활성화 함수
  const handleAlert = (message: string) => {
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  // 입력 필드에 대한 값 존재 여부 확인 함수
  const fieldCheck = (data: APIEndpoint, value: KeyValuePair, index: number, desc: string) => {
    if (!value.key) {
      console.log(`EndpointId: ${data.id} → Index ${index}의 Key 값이 존재하지 않음. (alert::${desc})`)

      handleAlert("필수 항목을 입력해주세요.")
      isChecked.current = true
    } else {
      if ((index - 1) > -1) {
        data.queryParams.find((d) => d.key == "") ? () => { // 이전 필드에 값이 존재하지 않을 경우 return
          console.log(`EndpointId: ${data.id} → 이전 필드(index: ${index - 1})에 값이 존재하지 않음. (alert::${desc})`)
          return
        } : true
      } else {
        console.log(`EndpointId: ${data.id} → Index ${index}의 값이 존재함. (alert::${desc})`)
        isChecked.current = false
      }
    }
  }

  // 필수 입력 필드에 대한 값 존재 여부 확인 함수
  const isInputRequiredFieldCheck = (data: APIEndpoint) => {
    if (!data.method || !data.url || !data.contentType || !data.bodyType) { // 필수 입력 필드의 값이 존재하지 않을 경우
      console.log(`EndpointId: ${data.id} → 필수 입력 필드의 값이 존재하지 않음. (alert::Error)`)

      isRequiredFieldCheck.current = false
      handleAlert("필수 항목을 입력해주세요.")

      return true
    } else if (data.authType != "none" && !data.authValue) { // 인증 타입의 대한 값이 존재하지 않을 경우
      console.log(`EndpointId: ${data.id} → 인증 타입에 해당하는 값이 존재하지 않음. (alert::AuthType)`)

      isRequiredFieldCheck.current = false
      handleAlert("인증 타입의 값이 존재하지 않습니다.")

      return true
    }

    if (data.queryParams.length > 0 || data.headers.length > 0 || data.body.length > 0) {
      data.queryParams.forEach((value, index) => fieldCheck(data, value, index, "QueryParams")) // QueryParams
      data.headers.forEach((value, index) => fieldCheck(data, value, index, "Headers")) // Headers
      data.body.forEach((value, index) => fieldCheck(data, value, index, "Body")) // Body

      if (isChecked.current) return true
    }
  }

  // 테스트 시작 함수 (API 호출)
  const handleStartTest = () => {
    if (!scenarioName || !trafficCount) { // 필수 입력 필드에 다한 값 존재 여부
      handleAlert("필수 항목을 입력해주세요.")
      return
    }

    const num = apiEndpoints.findIndex(isInputRequiredFieldCheck) // true(0): 테스트 실행 X, false(-1): 테스트 실행 O
    if (num == -1) isRequiredFieldCheck.current = true

    if (isRequiredFieldCheck.current) {
      setIsTestRunning(true)

      // TODO: Key 값이 ""이면 API Body에 포함하지 않도록 Body 재구성 로직 구현

      // API CALL: POST /api/test/load/start
      // 테스트 시작 요청
      // 요청 본문: { scenarioName, trafficCount, apiEndpoints }
      // 응답: { testId: "...", status: "running" }

      setTimeout(() => {
        setIsTestRunning(false)
        navigate("/results")
      }, 3000)
    }
  }

  return (
    <>
      <TestLoadingModal isOpen={isTestRunning} scenarioName={scenarioName} testType="load" />

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
                placeholder="예: 서버 부하 테스트"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">총 요청 수 *</label>
              <input
                type="number"
                value={trafficCount}
                onChange={(e) => setTrafficCount(e.target.value)}
                placeholder="1000"
                required
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-card/50 border-border/40 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">테스트 대상 API</h2>
            <Button
              type="button"
              onClick={addAPIEndpoint}
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground hover:cursor-pointer"
            >
              <Plus className="w-4 h-4" />추가
            </Button>
          </div>

          <div className="space-y-8">

            {apiEndpoints.map((api, index) => (
              <div key={api.id} className="p-6 border border-border/40 rounded-lg space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">엔드포인트 {index + 1}</span>
                  {apiEndpoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAPIEndpoint(api.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">기본 설정</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">HTTP 메서드 *</label>
                      <select
                        value={api.method}
                        onChange={(e) => updateAPIEndpoint(api.id, "method", e.target.value)}
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
                        required
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium text-foreground mb-2">요청 API 주소 *</label>
                      <input
                        type="text"
                        value={api.url}
                        onChange={(e) => updateAPIEndpoint(api.id, "url", e.target.value)}
                        placeholder="https://api.example.com/v1/users"
                        required
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Content-Type *</label>
                      <select
                        value={api.contentType}
                        onChange={(e) => updateAPIEndpoint(api.id, "contentType", e.target.value)}
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
                      >
                        <option value="application/json">application/json</option>
                        <option value="application/x-www-form-urlencoded">form-urlencoded</option>
                        <option value="text/plain">text/plain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Body Type *</label>
                      <select
                        value={api.bodyType}
                        onChange={(e) => updateAPIEndpoint(api.id, "bodyType", e.target.value as any)}
                        className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
                      >
                        <option value="json">JSON</option>
                        <option value="form">Form Data</option>
                        <option value="text">Text</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">Query Params</h4>
                      <Button
                        type="button"
                        onClick={() => addKeyValuePair(api.id, "queryParams")}
                        size="sm"
                        variant="outline"
                        className="gap-2 h-8 text-xs hover:cursor-pointer hover:text-foreground"
                      >
                        <Plus className="w-3 h-3" />추가
                      </Button>
                    </div>
                    <div className="space-y-2">

                      {api.queryParams.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">Query 파라미터를 추가해주세요</p>
                      ) : (
                        api.queryParams.map((param) => (
                          <div key={param.id} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={param.key}
                              onChange={(e) =>
                                updateKeyValuePair(api.id, "queryParams", param.id, "key", e.target.value)
                              }
                              placeholder="Key"
                              className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                              type="text"
                              value={param.value}
                              onChange={(e) =>
                                updateKeyValuePair(api.id, "queryParams", param.id, "value", e.target.value)
                              }
                              placeholder="Value"
                              className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => removeKeyValuePair(api.id, "queryParams", param.id)}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">Headers</h4>
                      <Button
                        type="button"
                        onClick={() => addKeyValuePair(api.id, "headers")}
                        size="sm"
                        variant="outline"
                        className="gap-2 h-8 text-xs hover:cursor-pointer hover:text-foreground"
                      >
                        <Plus className="w-3 h-3" />추가
                      </Button>
                    </div>
                    <div className="space-y-2">

                      {api.headers.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">Header를 추가해주세요</p>
                      ) : (
                        api.headers.map((header) => (
                          <div key={header.id} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={header.key}
                              onChange={(e) => updateKeyValuePair(api.id, "headers", header.id, "key", e.target.value)}
                              placeholder="Key (예: Authorization)"
                              className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                              type="text"
                              value={header.value}
                              onChange={(e) =>
                                updateKeyValuePair(api.id, "headers", header.id, "value", e.target.value)
                              }
                              placeholder="Value"
                              className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                              type="button"
                              onClick={() => removeKeyValuePair(api.id, "headers", header.id)}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">Body</h4>
                      {["POST", "PUT", "PATCH"].includes(api.method) && (
                        <Button
                          type="button"
                          onClick={() => addKeyValuePair(api.id, "body")}
                          size="sm"
                          variant="outline"
                          className="gap-2 h-8 text-xs hover:cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />추가
                        </Button>
                      )}
                    </div>
                    {["POST", "PUT", "PATCH"].includes(api.method) ? (
                      <div className="space-y-2">

                        {api.body.length === 0 ? (
                          <p className="text-xs text-muted-foreground py-2">Body 필드를 추가해주세요</p>
                        ) : (
                          api.body.map((field) => (
                            <div key={field.id} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={field.key}
                                onChange={(e) => updateKeyValuePair(api.id, "body", field.id, "key", e.target.value)}
                                placeholder="Key"
                                className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                              <input
                                type="text"
                                value={field.value}
                                onChange={(e) => updateKeyValuePair(api.id, "body", field.id, "value", e.target.value)}
                                placeholder="Value"
                                className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                              <button
                                type="button"
                                onClick={() => removeKeyValuePair(api.id, "body", field.id)}
                                className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground py-2">GET, DELETE 요청은 Body를 지원하지 않습니다</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">인증</h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">인증 방식 *</label>
                    <select
                      value={api.authType}
                      onChange={(e) => updateAPIEndpoint(api.id, "authType", e.target.value)}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
                    >
                      <option value="none">없음</option>
                      <option value="basic">Basic Auth</option>
                      <option value="bearer">Bearer Token</option>
                      <option value="api-key">API Key</option>
                    </select>
                  </div>

                  {api.authType === "basic" && (
                    <div className="space-y-2 p-3 bg-secondary/20 border border-border/40 rounded">
                      <p className="text-xs text-muted-foreground mb-2">username:password 형식으로 입력하세요 *</p>
                      <input
                        type="password"
                        value={api.authValue}
                        onChange={(e) => updateAPIEndpoint(api.id, "authValue", e.target.value)}
                        placeholder="username:password"
                        required
                        className="w-full px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {api.authType === "bearer" && (
                    <div className="space-y-2 p-3 bg-secondary/20 border border-border/40 rounded">
                      <p className="text-xs text-muted-foreground mb-2">JWT 토큰을 입력하세요 *</p>
                      <input
                        type="password"
                        value={api.authValue}
                        onChange={(e) => updateAPIEndpoint(api.id, "authValue", e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIs..."
                        required
                        className="w-full px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {api.authType === "api-key" && (
                    <div className="space-y-2 p-3 bg-secondary/20 border border-border/40 rounded">
                      <p className="text-xs text-muted-foreground mb-2">API 키를 입력하세요 *</p>
                      <input
                        type="password"
                        value={api.authValue}
                        onChange={(e) => updateAPIEndpoint(api.id, "authValue", e.target.value)}
                        placeholder="sk_live_..."
                        required
                        className="w-full px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-secondary/20 border border-border/40 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>CORS 주의:</strong> 상대 서버가 이 서비스의 주소를 허용해야 요청이 성공합니다. 상대 서버
                    관리자에게 이 서비스 주소(Origin)를 등록해달라고 요청하세요.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            onClick={handleStartTest}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold hover:cursor-pointer"
          >
            테스트 시작하기
          </Button>
        </div>
      </form>
    </>
  )
}
