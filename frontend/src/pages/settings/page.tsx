import { SidebarNav } from "@/components/sidebar-nav"
import { SettingsView } from "@/components/settings-view"

export const metadata = {
  title: "Scaleo",
  description: "계정 설정과 환경설정을 관리하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav currentPath="/settings" />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SettingsView />
        </div>
      </main>
    </div>
  )
}
