import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { BenefitsSection } from "@/components/benefits-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Scaleo",
  description: "복잡한 성능 테스트 환경을 없애고, 간단하게 대규모 트래픽을 테스트하세요.",
  icons: { icon: '/service-logo.png', }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
