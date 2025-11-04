import { SidebarNav } from "@/components/sidebar-nav"
import { ResultsDashboard } from "@/components/results-dashboard"

export const metadata = {
  title: "Scaleo",
  description: "테스트 결과를 분석하고 성능 지표를 확인하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav currentPath="/results" />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ResultsDashboard />
        </div>
      </main>
    </div>
  )
}
