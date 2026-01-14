"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMenuStore } from "@/lib/store"
import { CATEGORIES } from "@/lib/types"
import type { MenuItem } from "@/lib/types"

interface MenuItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editItem?: MenuItem | null
}

export function MenuItemDialog({ open, onOpenChange, editItem }: MenuItemDialogProps) {
  const { addItem, updateItem } = useMenuStore()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [availableOnWebsite, setAvailableOnWebsite] = useState(true)
  const [availableOnMobile, setAvailableOnMobile] = useState(true)

  useEffect(() => {
    if (editItem) {
      setName(editItem.name)
      setDescription(editItem.description)
      setPrice(editItem.price.toString())
      setCategory(editItem.category)
      setImageUrl(editItem.image_url)
      setAvailableOnWebsite(editItem.available_on_website)
      setAvailableOnMobile(editItem.available_on_mobile)
    } else {
      resetForm()
    }
  }, [editItem, open])

  const resetForm = () => {
    setName("")
    setDescription("")
    setPrice("")
    setCategory("")
    setImageUrl("")
    setAvailableOnWebsite(true)
    setAvailableOnMobile(true)
  }

  const handleSubmit = () => {
    const itemData: MenuItem = {
      id: editItem?.id || Date.now().toString(),
      name,
      description,
      price: Number.parseInt(price, 10),
      category,
      image_url: imageUrl || "/placeholder.svg?height=300&width=400",
      available_on_website: availableOnWebsite,
      available_on_mobile: availableOnMobile,
    }

    if (editItem) {
      updateItem(editItem.id, itemData)
    } else {
      addItem(itemData)
    }

    onOpenChange(false)
    resetForm()
  }

  const isValid = name && description && price && category

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editItem ? "Taomni tahrirlash" : "Yangi taom qo'shish"}</DialogTitle>
          <DialogDescription>
            {editItem ? "Taom ma'lumotlarini o'zgartiring" : "Menyuga yangi taom qo'shing"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="item-name">Nomi</Label>
            <Input id="item-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="item-desc">Tavsif</Label>
            <Textarea id="item-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="item-price">Narxi (so'm)</Label>
              <Input id="item-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="item-category">Kategoriya</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="item-image">Rasm URL</Label>
            <Input
              id="item-image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/placeholder.svg"
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="available-website"
                checked={availableOnWebsite}
                onCheckedChange={(checked) => setAvailableOnWebsite(checked as boolean)}
              />
              <Label htmlFor="available-website">Saytda ko'rsatish</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="available-mobile"
                checked={availableOnMobile}
                onCheckedChange={(checked) => setAvailableOnMobile(checked as boolean)}
              />
              <Label htmlFor="available-mobile">Mobileda ko'rsatish</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            {editItem ? "Saqlash" : "Qo'shish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
