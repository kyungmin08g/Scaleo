import { Button } from "@/components/ui/button"
import Link from "next/link"

const headerLinkTitleData = [
  { title: "기능" },
  { title: "이점" }
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                <img src="/service-logo.png" alt="Scaleo" />
              </div>
              <span className="hidden sm:inline font-bold text-lg">Scaleo</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {headerLinkTitleData.map((data, index) => 
                <Link href="#features" key={index} className="text-muted-foreground hover:text-foreground transition-colors">
                  {data.title}
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">

            {/* 로그인 여부 확인 로직 구현 */}
            {(typeof window !== "undefined" && localStorage.getItem("isLoggedIn")) ? 
              <Link href="/test">
                <Button size="sm" className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground">
                  Get Started
                </Button>
              </Link> : 
              <Link href="/login">
                <Button size="sm" className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground">
                  Get Started
                </Button>
              </Link>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
