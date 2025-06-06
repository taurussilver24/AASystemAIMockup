"use client"

import { useState, useEffect } from "react"

interface Notification {
  id: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  timestamp: Date
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]) // 最新5件のみ保持
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // 自動でランダムな通知を生成（デモ用）
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      const notifications = [
        { type: "info" as const, title: "定期メンテナンス", message: "セクションBのメンテナンスが完了しました" },
        { type: "warning" as const, title: "高負荷警告", message: "C地区で電力需要が増加しています" },
        { type: "success" as const, title: "システム復旧", message: "アラートシステムが正常に復旧しました" },
        { type: "info" as const, title: "新規登録", message: "15件の新規市民アカウントが登録されました" },
      ]

      if (Math.random() > 0.7) {
        // 30%の確率で通知
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
        addNotification(randomNotification)
      }
    }, 45000) // 45秒ごと

    return () => clearInterval(interval)
  }, [isClient])

  return {
    notifications,
    addNotification,
    removeNotification,
    isClient,
  }
}
