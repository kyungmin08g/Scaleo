import Link from "next/link"
import { Github, Instagram } from "lucide-react"

const featuresTitleData = [
  { title: "부하 테스트" },
  { title: "데이터 테스트" },
  { title: "성능 분석" }
]

const lawTitleData = [
  { title: "이용약관" },
  { title: "개인정보 보호" }
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 서비스 소개 */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Scaleo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              대규모 트래픽 테스트를 간단하게. 복잡한 설정 없이 강력한 성능 분석을 경험하세요.
            </p>
          </div>

          {/* 서비스 기능 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">서비스</h4>
            <ul className="space-y-3">
              {featuresTitleData.map((data, index) =>
                <li key={index}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {data.title}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* 법률 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">법률</h4>
            <ul className="space-y-3">
              {lawTitleData.map((date, index) => 
                <li key={index}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {date.title}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* 하단 구분선 및 소셜 링크 */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">© 2025 Scaleo. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/kyungmin08g/Scaleo"
                className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
