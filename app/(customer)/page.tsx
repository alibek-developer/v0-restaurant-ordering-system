import { HeroSection } from "@/components/customer/hero-section"
import { FeaturedDishes } from "@/components/customer/featured-dishes"
import { CategoryShowcase } from "@/components/customer/category-showcase"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedDishes />
    </>
  )
}
