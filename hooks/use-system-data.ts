"use client"

import { useState, useEffect, useCallback } from "react"

interface SystemStats {
  totalPower: number
  activeCitizens: number
  gridEfficiency: number
  activeAlerts: number
  powerChange: number
  citizensChange: number
  efficiencyChange: number
  alertsChange: number
}

interface SystemStatus {
  name: string
  status: "稼働中" | "メンテナンス中" | "オフライン"
  uptime: string
}

export function useSystemData() {
  // Use null for initial state to prevent hydration mismatch
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [systemStatus, setSystemStatus] = useState<SystemStatus[] | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Initialize data only on client side
  useEffect(() => {
    setIsClient(true)

    // Initial data
    setStats({
      totalPower: 2847,
      activeCitizens: 156432,
      gridEfficiency: 94.7,
      activeAlerts: 3,
      powerChange: 12,
      citizensChange: 3.2,
      efficiencyChange: -0.8,
      alertsChange: -2,
    })

    setSystemStatus([
      { name: "電力網", status: "稼働中", uptime: "99.8%" },
      { name: "気象監視", status: "稼働中", uptime: "99.9%" },
      { name: "市民サービス", status: "稼働中", uptime: "99.7%" },
      { name: "アラートシステム", status: "メンテナンス中", uptime: "98.2%" },
      { name: "データベース", status: "稼働中", uptime: "99.9%" },
      { name: "セキュリティ", status: "稼働中", uptime: "100%" },
    ])

    setLastUpdated(new Date())
  }, [])

  // データを更新する関数
  const updateData = useCallback(() => {
    if (!stats || !systemStatus) return

    setIsLoading(true)

    // リアルなデータ変動をシミュレート
    setTimeout(() => {
      setStats((prevStats) => {
        if (!prevStats) return prevStats
        return {
          totalPower: prevStats.totalPower + (Math.random() - 0.5) * 100,
          activeCitizens: prevStats.activeCitizens + Math.floor((Math.random() - 0.5) * 50),
          gridEfficiency: Math.max(85, Math.min(99, prevStats.gridEfficiency + (Math.random() - 0.5) * 2)),
          activeAlerts: Math.max(0, prevStats.activeAlerts + Math.floor((Math.random() - 0.5) * 2)),
          powerChange: (Math.random() - 0.5) * 20,
          citizensChange: (Math.random() - 0.5) * 10,
          efficiencyChange: (Math.random() - 0.5) * 4,
          alertsChange: Math.floor((Math.random() - 0.5) * 6),
        }
      })

      // システム状態もランダムに更新
      setSystemStatus((prevStatus) => {
        if (!prevStatus) return prevStatus
        return prevStatus.map((system) => ({
          ...system,
          uptime: `${(99 + Math.random()).toFixed(1)}%`,
          status: Math.random() > 0.9 ? "メンテナンス中" : "稼働中",
        }))
      })

      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000) // 1秒の遅延でリアルなAPI呼び出しをシミュレート
  }, [stats, systemStatus])

  // 自動更新（30秒ごと）
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(updateData, 30000)
    return () => clearInterval(interval)
  }, [updateData, isClient])

  return {
    stats,
    systemStatus,
    lastUpdated,
    isLoading,
    updateData,
    isClient,
  }
}
