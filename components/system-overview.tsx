"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react"
import { useSystemData } from "../hooks/use-system-data"
import { Button } from "@/components/ui/button"

export function SystemOverview() {
  const { stats, systemStatus, lastUpdated, isLoading, updateData, isClient } = useSystemData()

  // If not client-side yet, show a loading state
  if (!isClient || !stats || !systemStatus) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">システム概要</h2>
            <p className="text-sm text-gray-500">データ読み込み中...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">読み込み中...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const statsDisplay = [
    {
      title: "総電力消費量",
      value: `${Math.round(stats.totalPower)} MW`,
      change: `${stats.powerChange > 0 ? "+" : ""}${stats.powerChange.toFixed(1)}%`,
      trend: stats.powerChange > 0 ? "up" : "down",
      icon: <Zap className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      title: "アクティブ市民",
      value: stats.activeCitizens.toLocaleString(),
      change: `${stats.citizensChange > 0 ? "+" : ""}${stats.citizensChange.toFixed(1)}%`,
      trend: stats.citizensChange > 0 ? "up" : "down",
      icon: <Users className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      title: "送電網効率",
      value: `${stats.gridEfficiency.toFixed(1)}%`,
      change: `${stats.efficiencyChange > 0 ? "+" : ""}${stats.efficiencyChange.toFixed(1)}%`,
      trend: stats.efficiencyChange > 0 ? "up" : "down",
      icon: <Activity className="w-5 h-5" />,
      color: "text-orange-600",
    },
    {
      title: "アクティブアラート",
      value: stats.activeAlerts.toString(),
      change: `${stats.alertsChange > 0 ? "+" : ""}${stats.alertsChange}`,
      trend: stats.alertsChange < 0 ? "up" : "down", // アラートは減少が良い
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with Update Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">システム概要</h2>
          <p className="text-sm text-gray-500">
            最終更新: {lastUpdated ? lastUpdated.toLocaleTimeString("ja-JP") : ""}
          </p>
        </div>
        <Button onClick={updateData} disabled={isLoading} variant="outline" className="flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "更新中..." : "データ更新"}
        </Button>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">前月比</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              システム状態
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {system.status === "稼働中" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-500" />
                  )}
                  <span className="font-medium">{system.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={system.status === "稼働中" ? "default" : "secondary"}
                    className={
                      system.status === "稼働中" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                    }
                  >
                    {system.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{system.uptime}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Power Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              電力配分
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>住宅用</span>
                  <span>1,423 MW (50%)</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>商業用</span>
                  <span>854 MW (30%)</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>工業用</span>
                  <span>427 MW (15%)</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>公共サービス</span>
                  <span>143 MW (5%)</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>最近のシステム活動</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "2分前", event: "第7地区で電力消費量の急増を検出", type: "warning" },
              { time: "15分前", event: "気象警報：強風が予想されます", type: "info" },
              { time: "1時間前", event: "送電網セクションBの定期メンテナンスが完了", type: "success" },
              { time: "2時間前", event: "新規市民登録：47件の新規アカウント", type: "info" },
              { time: "3時間前", event: "日次バックアップが正常に完了", type: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "warning"
                      ? "bg-orange-500"
                      : activity.type === "success"
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm">{activity.event}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
