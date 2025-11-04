import { SidebarNav } from "@/components/sidebar-nav"
import { TestTypeSelector } from "@/components/test-type-selector"

export const metadata = {
  title: "Scaleo",
  description: "테스트 유형을 선택하고 시나리오를 설정하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function TestPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav currentPath="/test" />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">테스트 유형 선택</h1>
              <p className="text-muted-foreground">테스트 목적에 맞는 유형을 선택하고 시나리오를 설정하세요.</p>
            </div>

            <TestTypeSelector />
          </div>
        </div>
      </main>
    </div>
  )
}
