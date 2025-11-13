import { SidebarNav } from "@/components/sidebar-nav"
import { LoadTestForm } from "@/components/load-test-form"

export const metadata = {
  title: "Scaleo",
  description: "대규모 트래픽 부하 테스트를 설정하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function LoadTestPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav currentPath="/test" />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">부하 테스트 시나리오</h1>
              <p className="text-muted-foreground">대규모 트래픽이 API에 미치는 영향을 테스트하세요.</p>
            </div>

            <LoadTestForm />
          </div>
        </div>
      </main>
    </div>
  )
}
