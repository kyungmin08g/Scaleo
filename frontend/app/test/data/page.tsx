import { SidebarNav } from "@/components/sidebar-nav"
import { DataTestForm } from "@/components/data-test-form"

export const metadata = {
  title: "Scaleo",
  description: "대규모 데이터 처리 테스트를 설정하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function DataTestPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav currentPath="/test" />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">데이터 테스트 시나리오</h1>
              <p className="text-muted-foreground">방대한 데이터 처리 시 DB 성능을 테스트하세요.</p>
            </div>

            <DataTestForm />
          </div>
        </div>
      </main>
    </div>
  )
}
