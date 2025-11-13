import { Button } from "@/components/ui/button"

const headeraTitleData = [
  { title: "기능", link: "#features" },
  { title: "이점", link: "#benefits" }
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                <img src="/service-logo.png" alt="Scaleo" />
              </div>
              <span className="hidden sm:inline font-bold text-lg">Scaleo</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {headeraTitleData.map((data, index) => 
                <a href={data.link} key={index} className="text-muted-foreground hover:text-foreground transition-colors">
                  {data.title}
                </a>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">

            {/* 로그인 여부 확인 로직 구현 */}
            {(typeof window !== "undefined" && localStorage.getItem("isLoggedIn")) ? 
              <a href="/test">
                <Button size="sm" className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground">
                  Get Started
                </Button>
              </a> : 
              <a href="/login">
                <Button size="sm" className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-primary-foreground">
                  Get Started
                </Button>
              </a>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
