"use client"

import { useNotifications } from "../hooks/use-notifications"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react"

export function NotificationPanel() {
  const { notifications, removeNotification, isClient } = useNotifications()

  // Don't render anything during server-side rendering
  if (!isClient) return null

  // Don't render if no notifications
  if (notifications.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-orange-50 border-orange-200"
      case "success":
        return "bg-green-50 border-green-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="fixed top-4 right-4 w-80 space-y-2 z-50">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`${getTypeColor(notification.type)} shadow-lg`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.timestamp.toLocaleTimeString("ja-JP")}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
