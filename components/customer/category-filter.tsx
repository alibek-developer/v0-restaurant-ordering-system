"use client"

import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/types"

interface CategoryFilterProps {
  selected: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={selected === null ? "default" : "outline"} onClick={() => onSelect(null)} size="sm">
        Hammasi
      </Button>
      {CATEGORIES.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? "default" : "outline"}
          onClick={() => onSelect(category.id)}
          size="sm"
        >
          <span className="mr-1">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  )
}
