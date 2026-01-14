import Link from "next/link"
import { ArrowRight, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-[url('/uzbek-restaurant-interior-warm-lighting.jpg')] bg-cover bg-center opacity-20" />
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">An'anaviy O'zbek Taomlari</h1>
          <p className="text-lg md:text-xl text-background/80 mb-8 leading-relaxed">
            Eng mazali palov, lag'mon, manti va boshqa milliy taomlarimizni tatib ko'ring. Oilaviy retseptlar, sifatli
            mahsulotlar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/menu">
              <Button size="lg" variant="secondary" className="text-foreground">
                Menyuni ko'rish
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/checkout">
              <Button
                size="lg"
                variant="outline"
                className="border-background/50 text-background hover:bg-background/10 bg-transparent"
              >
                Buyurtma berish
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-background/70">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>3 km gacha bepul yetkazish</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>30-45 daqiqada yetkazamiz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
