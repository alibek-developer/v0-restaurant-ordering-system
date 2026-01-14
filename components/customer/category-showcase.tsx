import Link from "next/link"
import { CATEGORIES } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

export function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Kategoriyalar</h2>
          <p className="text-muted-foreground">Barcha turdagi taomlarimiz</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/menu?category=${category.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  <h3 className="font-medium text-foreground">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
