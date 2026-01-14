"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useMenuStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { CATEGORIES } from "@/lib/types"
import type { MenuItem } from "@/lib/types"
import { MenuItemDialog } from "@/components/admin/menu-item-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminMenuPage() {
  const { items, updateItem, deleteItem } = useMenuStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null)

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getCategoryName = (categoryId: string) => {
    return CATEGORIES.find((c) => c.id === categoryId)?.name || categoryId
  }

  const handleToggleWebsite = (item: MenuItem) => {
    updateItem(item.id, { available_on_website: !item.available_on_website })
  }

  const handleToggleMobile = (item: MenuItem) => {
    updateItem(item.id, { available_on_mobile: !item.available_on_mobile })
  }

  const handleDelete = () => {
    if (deletingItem) {
      deleteItem(deletingItem.id)
      setDeletingItem(null)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Taom qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Yangi taom
        </Button>
      </div>

      {/* Menu Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Menyu ({filteredItems.length} ta taom)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Rasm</th>
                  <th className="text-left p-3 font-medium">Nomi</th>
                  <th className="text-left p-3 font-medium">Kategoriya</th>
                  <th className="text-left p-3 font-medium">Narxi</th>
                  <th className="text-center p-3 font-medium">Saytda</th>
                  <th className="text-center p-3 font-medium">Mobileda</th>
                  <th className="text-left p-3 font-medium">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden">
                        <Image
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{getCategoryName(item.category)}</Badge>
                    </td>
                    <td className="p-3 font-medium">{formatPrice(item.price)}</td>
                    <td className="p-3 text-center">
                      <Checkbox checked={item.available_on_website} onCheckedChange={() => handleToggleWebsite(item)} />
                    </td>
                    <td className="p-3 text-center">
                      <Checkbox checked={item.available_on_mobile} onCheckedChange={() => handleToggleMobile(item)} />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => setDeletingItem(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      Taomlar topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <MenuItemDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <MenuItemDialog open={!!editingItem} onOpenChange={() => setEditingItem(null)} editItem={editingItem} />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Taomni o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              "{deletingItem?.name}" taomini o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
