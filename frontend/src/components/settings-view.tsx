"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"
import { useState } from "react"

export function SettingsView() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    job: "신입 개발자",
  })

  const [notifications, setNotifications] = useState({
    emailOnCompletion: true,
    emailOnError: true,
    weeklyReport: false,
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const handleLogout = () => {
    // API CALL: POST /api/auth/logout
    // 로그아웃 요청
    // 응답: { success: true }
    // localStorage.clear() 또는 토큰 삭제 후 /login으로 이동
  }

  const handleDeleteAccount = () => {
    // API CALL: DELETE /api/user/account
    // 계정 삭제 요청
    // 응답: { success: true, message: "계정이 삭제되었습니다." }
  }

  const handleCall = () => {
    console.log(`name: ${profile.name}, email: ${profile.email}, job: ${profile.job}`)

    setShowAlert(true)
    setAlertMessage("프로필이 저장되었습니다.")
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* 알림창 */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-in fade-in-0 duration-300 z-50">
          {alertMessage}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">설정</h1>
        <p className="text-muted-foreground">계정과 환경설정을 관리하세요</p>
      </div>

      {/* 프로필 정보 */}
      <Card className="bg-card/50 border-border/40 p-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">프로필 정보</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">이름</label>
            <input
              type="text"
              value={profile.name}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">이메일</label>
            <input
              type="email"
              value={profile.email}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">직무</label>
            <select 
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
              onChange={(e) => setProfile({ ...profile, job: e.target.value })}
            >
              <option>신입 개발자</option>
              <option>프론트 개발자</option>
              <option>백엔드 개발자</option>
              <option>데이터베이스 엔지니어</option>
              <option>시니어 엔지니어</option>
            </select>
          </div>
        </div>

        {/* API CALL: PUT /api/user/profile - 프로필 정보 업데이트 */}
        <Button 
          className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground"
          onClick={handleCall}
        >
          프로필 저장
        </Button>
      </Card>

      {/* 알림 설정 */}
      <Card className="bg-card/50 border-border/40 p-8">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />알림 설정
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-4 p-4 border border-border/40 rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.emailOnCompletion}
              onChange={(e) => setNotifications({ ...notifications, emailOnCompletion: e.target.checked })}
              className="w-5 h-5"
            />
            <div>
              <p className="font-medium text-foreground">테스트 완료 시 이메일 알림</p>
              <p className="text-xs text-muted-foreground">테스트가 완료되면 이메일로 알려줍니다</p>
            </div>
          </label>

          <label className="flex items-center gap-4 p-4 border border-border/40 rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.emailOnError}
              onChange={(e) => setNotifications({ ...notifications, emailOnError: e.target.checked })}
              className="w-5 h-5"
            />
            <div>
              <p className="font-medium text-foreground">에러 발생 시 이메일 알림</p>
              <p className="text-xs text-muted-foreground">테스트 중 에러가 발생하면 알려줍니다</p>
            </div>
          </label>

          <label className="flex items-center gap-4 p-4 border border-border/40 rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.weeklyReport}
              onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
              className="w-5 h-5"
            />
            <div>
              <p className="font-medium text-foreground">주간 리포트</p>
              <p className="text-xs text-muted-foreground">매주 월요일에 테스트 요약을 받습니다</p>
            </div>
          </label>
        </div>
      </Card>

      {/* 계정 삭제 */}
      <Card className="bg-destructive/10 border border-destructive/20 p-8">
        <h2 className="text-xl font-semibold text-destructive mb-2">계정 삭제</h2>
        <p className="text-sm text-muted-foreground mb-4">
          계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
        </p>
        <Button onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90 hover:cursor-pointer text-white">
          계정 삭제
        </Button>
      </Card>

      {/* 로그아웃 */}
      <Button
        onClick={handleLogout}
        size="lg"
        className="w-full border-border bg-transparent text-foreground hover:bg-transparent hover:cursor-pointer py-6 text-base font-semibold transition-colors"
      >
        <LogOut className="w-4 h-4 mr-2" />
        로그아웃
      </Button>
    </div>
  )
}
