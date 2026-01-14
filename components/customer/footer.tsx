import Link from "next/link"
import { Phone, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="font-bold text-xl">O'zbek Oshxonasi</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              An'anaviy o'zbek taomlari eng sifatli mahsulotlardan tayyorlanadi. Oilaviy muhit va mehmonnavozlik.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Bog'lanish</h3>
            <div className="flex flex-col gap-3 text-background/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Toshkent sh., Amir Temur ko'chasi, 1-uy</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Har kuni: 10:00 - 23:00</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Havolalar</h3>
            <div className="flex flex-col gap-2">
              <Link href="/menu" className="text-background/70 hover:text-background transition-colors">
                Menyu
              </Link>
              <Link href="/about" className="text-background/70 hover:text-background transition-colors">
                Biz haqimizda
              </Link>
              <Link href="/checkout" className="text-background/70 hover:text-background transition-colors">
                Buyurtma berish
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/50">
          <p>© 2026 O'zbek Oshxonasi. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
