"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore, useOrderStore } from "@/lib/store"
import { formatPrice, calculateDeliveryFee, generateOrderId } from "@/lib/utils"
import { FREE_DELIVERY_DISTANCE_KM, FREE_DELIVERY_MIN_TOTAL } from "@/lib/types"
import type { Order } from "@/lib/types"
import { LocationPicker } from "@/components/customer/location-picker"

type OrderMode = "dine-in" | "delivery"
type PaymentMethod = "cash" | "card" | "click" | "payme"

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()
  const { addOrder } = useOrderStore()

  const [orderMode, setOrderMode] = useState<OrderMode>("delivery")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  const subtotal = getTotal()
  const deliveryFee =
    orderMode === "delivery" && deliveryDistance ? calculateDeliveryFee(deliveryDistance, subtotal) : 0
  const total = subtotal + deliveryFee

  const handleLocationSelect = (address: string, distance: number) => {
    setDeliveryAddress(address)
    setDeliveryDistance(distance)
  }

  const handlePlaceOrder = () => {
    const newOrderId = generateOrderId()
    const order: Order = {
      id: newOrderId,
      created_at: new Date().toISOString(),
      customer_name: customerName,
      customer_phone: customerPhone,
      mode: orderMode,
      table_number: orderMode === "dine-in" ? tableNumber : undefined,
      delivery_address: orderMode === "delivery" ? deliveryAddress : undefined,
      delivery_distance: orderMode === "delivery" ? (deliveryDistance ?? undefined) : undefined,
      items: items,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      status: "new",
      source: "website",
      payment_method: paymentMethod,
    }
    addOrder(order)
    setOrderId(newOrderId)
    setOrderPlaced(true)
    clearCart()
  }

  const isFormValid =
    customerName &&
    customerPhone &&
    items.length > 0 &&
    (orderMode === "dine-in" ? tableNumber : deliveryAddress && deliveryDistance !== null)

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-foreground">Buyurtma qabul qilindi!</h1>
          <p className="text-muted-foreground mb-2">
            Buyurtma raqami: <span className="font-mono font-semibold">{orderId}</span>
          </p>
          <p className="text-muted-foreground mb-8">Tez orada siz bilan bog'lanamiz.</p>
          <Link href="/menu">
            <Button>Menyuga qaytish</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Savatcha bo'sh</h1>
          <p className="text-muted-foreground mb-8">Buyurtma berish uchun avval taom tanlang</p>
          <Link href="/menu">
            <Button>Menyuga o'tish</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/menu" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Menyuga qaytish
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-foreground">Buyurtma berish</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Aloqa ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Ismingiz</Label>
                <Input
                  id="name"
                  placeholder="Ism Familiya"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon raqam</Label>
                <Input
                  id="phone"
                  placeholder="+998 90 123 45 67"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Mode */}
          <Card>
            <CardHeader>
              <CardTitle>Buyurtma turi</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={orderMode} onValueChange={(v) => setOrderMode(v as OrderMode)}>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    <span className="font-medium">Yetkazib berish</span>
                    <p className="text-sm text-muted-foreground">Manzilingizga yetkazamiz</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer mt-2">
                  <RadioGroupItem value="dine-in" id="dine-in" />
                  <Label htmlFor="dine-in" className="flex-1 cursor-pointer">
                    <span className="font-medium">Restoranda</span>
                    <p className="text-sm text-muted-foreground">Stol raqamini kiriting</p>
                  </Label>
                </div>
              </RadioGroup>

              {orderMode === "dine-in" && (
                <div className="mt-4">
                  <Label htmlFor="table">Stol raqami</Label>
                  <Input
                    id="table"
                    placeholder="Masalan: 5"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </div>
              )}

              {orderMode === "delivery" && (
                <div className="mt-4">
                  <Label className="mb-2 block">Yetkazish manzili</Label>
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                  {deliveryAddress && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{deliveryAddress}</p>
                          <p className="text-xs text-muted-foreground">
                            Masofa: {deliveryDistance?.toFixed(1)} km
                            {deliveryDistance && deliveryDistance <= FREE_DELIVERY_DISTANCE_KM && (
                              <span className="text-accent ml-2">• Bepul yetkazish!</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {FREE_DELIVERY_DISTANCE_KM} km gacha yoki {formatPrice(FREE_DELIVERY_MIN_TOTAL)} dan ortiq
                    buyurtmalarga bepul yetkazish
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>To'lov usuli</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">
                      Naqd pul
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer">
                      Karta
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="click" id="click" />
                    <Label htmlFor="click" className="cursor-pointer">
                      Click
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="payme" id="payme" />
                    <Label htmlFor="payme" className="cursor-pointer">
                      Payme
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Buyurtma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-primary text-sm">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taomlar:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {orderMode === "delivery" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Yetkazish:</span>
                    <span className={deliveryFee === 0 ? "text-accent" : ""}>
                      {deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Jami:</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg" disabled={!isFormValid} onClick={handlePlaceOrder}>
                Buyurtma berish
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
