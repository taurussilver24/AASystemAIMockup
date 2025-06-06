"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Users, Cloud, AlertTriangle, Settings, FileText, Bell, Activity, BarChart3 } from "lucide-react"
import { SystemOverview } from "./system-overview"
import { PowerManagement } from "./power-management"
import { CitizenManagement } from "./citizen-management"
import { WeatherAnalysis } from "./weather-analysis"
import { AlertCenter } from "./alert-center"
import { ReportsSection } from "./reports-section"
import { SystemSettings } from "./system-settings"
import { NotificationPanel } from "./notification-panel"

export function ElectricityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent hydration errors by not rendering until client-side
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">市民電力管理システム</h1>
                <p className="text-lg text-gray-600">包括的な電力網監視と市民サービス</p>
              </div>
            </div>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">市民電力管理システム</h1>
              <p className="text-lg text-gray-600">包括的な電力網監視と市民サービス</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                システム稼働中
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                3件のアラート
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              概要
            </TabsTrigger>
            <TabsTrigger value="power" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              電力
            </TabsTrigger>
            <TabsTrigger value="citizens" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              市民
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              気象
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              アラート
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              レポート
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              設定
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="power">
            <PowerManagement />
          </TabsContent>

          <TabsContent value="citizens">
            <CitizenManagement />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherAnalysis />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertCenter />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>

        {/* Notification Panel */}
        <NotificationPanel />
      </div>
    </div>
  )
}
