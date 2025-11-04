import { SidebarNav } from "@/components/sidebar-nav"
import { HistoryView } from "@/components/history-view"

export const metadata = {
  title: "Scaleo",
  description: "테스트 히스토리와 결과를 확인하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav currentPath="/history" />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HistoryView />
        </div>
      </main>
    </div>
  )
}
