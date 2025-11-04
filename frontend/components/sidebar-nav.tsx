"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Activity, BarChart3, Settings, History, Menu, X } from "lucide-react"

interface SidebarNavProps {
  className?: string
  currentPath?: string
}

const navItems = [
  { icon: Activity, label: "새 테스트", href: "/test" },
  { icon: BarChart3, label: "결과", href: "/results" },
  { icon: History, label: "히스토리", href: "/history" },
  { icon: Settings, label: "설정", href: "/settings" },
]

export function SidebarNav({ className, currentPath = "/test" }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-secondary/50 border border-border/40 hover:bg-secondary text-foreground transition-colors"
        aria-label="메뉴 열기"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />}

      {/* Desktop sidebar - always visible */}
      <aside className={cn("hidden lg:flex w-64 bg-secondary/50 border-r border-border/40 p-6 flex-col", className)}>
        <div className="mb-8">
          <Link href="/test" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
              <img src="/service-logo.png" alt="Scaleo" />
            </div>
            <span className="font-bold text-lg">Scaleo</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <aside
        className={cn(
          "fixed lg:hidden left-0 top-0 w-64 h-screen bg-secondary/50 border-r border-border/40 p-6 flex flex-col z-40 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8">
          <Link href="/test" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 rounded from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
              <img src="/service-logo.png" alt="Scaleo" />
            </div>
            <span className="font-bold text-lg">Scaleo</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
