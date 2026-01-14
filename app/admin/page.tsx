"use client"

import { useState } from "react"
import { Phone, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useOrderStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import type { Order } from "@/lib/types"
import { NewPhoneOrderDialog } from "@/components/admin/new-phone-order-dialog"
import { OrderDetailsDialog } from "@/components/admin/order-details-dialog"

const STATUS_LABELS: Record<Order["status"], string> = {
  new: "Yangi",
  preparing: "Tayyorlanmoqda",
  ready: "Tayyor",
  delivered: "Yetkazildi",
}

const STATUS_COLORS: Record<Order["status"], string> = {
  new: "bg-blue-500",
  preparing: "bg-yellow-500",
  ready: "bg-green-500",
  delivered: "bg-muted-foreground",
}

const SOURCE_LABELS: Record<Order["source"], string> = {
  website: "Sayt",
  mobile: "Mobil",
  "call-center": "Telefon",
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrderStore()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false
    if (sourceFilter !== "all" && order.source !== sourceFilter) return false
    return true
  })

  const orderCounts = {
    new: orders.filter((o) => o.status === "new").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Yangi</p>
                <p className="text-2xl font-bold">{orderCounts.new}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tayyorlanmoqda</p>
                <p className="text-2xl font-bold">{orderCounts.preparing}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tayyor</p>
                <p className="text-2xl font-bold">{orderCounts.ready}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha status</SelectItem>
            <SelectItem value="new">Yangi</SelectItem>
            <SelectItem value="preparing">Tayyorlanmoqda</SelectItem>
            <SelectItem value="ready">Tayyor</SelectItem>
            <SelectItem value="delivered">Yetkazildi</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[150px] bg-background">
            <SelectValue placeholder="Manba" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha manba</SelectItem>
            <SelectItem value="website">Sayt</SelectItem>
            <SelectItem value="mobile">Mobil</SelectItem>
            <SelectItem value="call-center">Telefon</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="bg-background">
          <RefreshCw className="h-4 w-4 mr-2" />
          Yangilash
        </Button>

        <Button className="ml-auto" onClick={() => setShowNewOrderDialog(true)}>
          <Phone className="h-4 w-4 mr-2" />
          Yangi telefon buyurtma
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">ID</th>
                  <th className="text-left p-3 font-medium">Sana</th>
                  <th className="text-left p-3 font-medium">Mijoz</th>
                  <th className="text-left p-3 font-medium">Turi</th>
                  <th className="text-left p-3 font-medium">Taomlar</th>
                  <th className="text-left p-3 font-medium">Jami</th>
                  <th className="text-left p-3 font-medium">Manba</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 font-mono text-xs">{order.id}</td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(order.created_at).toLocaleString("uz-UZ", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      {order.mode === "dine-in" ? (
                        <span>Stol #{order.table_number}</span>
                      ) : (
                        <span className="text-xs">{order.delivery_address?.slice(0, 20)}...</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        className="text-primary hover:underline text-left"
                        onClick={() => setSelectedOrder(order)}
                      >
                        {order.items.length} ta taom
                      </button>
                    </td>
                    <td className="p-3 font-medium">{formatPrice(order.total)}</td>
                    <td className="p-3">
                      <Badge variant="outline">{SOURCE_LABELS[order.source]}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge className={`${STATUS_COLORS[order.status]} text-primary-foreground`}>
                        {STATUS_LABELS[order.status]}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                      >
                        <SelectTrigger className="h-8 w-[140px] bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Yangi</SelectItem>
                          <SelectItem value="preparing">Tayyorlanmoqda</SelectItem>
                          <SelectItem value="ready">Tayyor</SelectItem>
                          <SelectItem value="delivered">Yetkazildi</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      Buyurtmalar topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NewPhoneOrderDialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog} />
      <OrderDetailsDialog order={selectedOrder} open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)} />
    </div>
  )
}
