import Image from "next/image"
import { Clock, MapPin, Phone, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Biz haqimizda</h1>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
          <Image src="/uzbek-restaurant-interior-traditional-decor.jpg" alt="Restoran ichki ko'rinishi" fill className="object-cover" />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-muted-foreground leading-relaxed">
            O'zbek Oshxonasi 2010 yilda ochilib, o'zbek milliy oshxonasining eng yaxshi an'analarini saqlab kelmoqda.
            Bizning oshpazlarimiz ko'p yillik tajribaga ega bo'lib, har bir taomni sevgi va g'amxo'rlik bilan
            tayyorlashadi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Biz faqat eng sifatli mahsulotlardan foydalanamiz va har kuni yangi taomlar tayyorlaymiz. Oilaviy muhit va
            mehmonnavozlik bizning asosiy qadriyatlarimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Ish vaqti</h3>
              </div>
              <p className="text-muted-foreground">Har kuni: 10:00 - 23:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Manzil</h3>
              </div>
              <p className="text-muted-foreground">Toshkent sh., Amir Temur ko'chasi, 1-uy</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Telefon</h3>
              </div>
              <p className="text-muted-foreground">+998 71 123 45 67</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Sig'im</h3>
              </div>
              <p className="text-muted-foreground">100+ o'rindiq, oilaviy xonalar mavjud</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
