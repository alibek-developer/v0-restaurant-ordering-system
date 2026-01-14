"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useMenuStore } from "@/lib/store"
import { MenuCard } from "@/components/customer/menu-card"
import { CategoryFilter } from "@/components/customer/category-filter"

function MenuContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const items = useMenuStore((state) => state.items)

  useEffect(() => {
    setSelectedCategory(searchParams.get("category"))
  }, [searchParams])

  const filteredItems = items.filter((item) => {
    if (!item.available_on_website) return false
    if (selectedCategory && item.category !== selectedCategory) return false
    return true
  })

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Menyu</h1>
        <p className="text-muted-foreground mb-6">Barcha taomlarimiz sifatli mahsulotlardan tayyorlanadi</p>
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>Bu kategoriyada taom topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  )
}

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={null}>
        <MenuContent />
      </Suspense>
    </div>
  )
}
