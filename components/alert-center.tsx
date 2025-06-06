"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Search,
  Send,
  Settings,
  Users,
  Filter,
  Plus,
} from "lucide-react"

export function AlertCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)

  const alertStats = [
    { title: "アクティブアラート", value: "3", change: "-2", icon: <AlertTriangle className="w-5 h-5" /> },
    { title: "本日解決済み", value: "12", change: "+4", icon: <CheckCircle className="w-5 h-5" /> },
    { title: "レビュー待ち", value: "7", change: "+1", icon: <Clock className="w-5 h-5" /> },
    { title: "通知済み市民", value: "1,247", change: "+89", icon: <Users className="w-5 h-5" /> },
  ]

  const alerts = [
    {
      id: "ALT001",
      type: "停電",
      severity: "緊急",
      title: "C地区で停電発生",
      description: "変圧器故障により2,500世帯に影響",
      location: "C地区、送電網セクション7",
      timestamp: "2024-01-15 14:30",
      status: "アクティブ",
      affectedCitizens: 2500,
      estimatedResolution: "2時間",
      assignedTo: "緊急対応チームアルファ",
    },
    {
      id: "ALT002",
      type: "高需要",
      severity: "警告",
      title: "ピーク需要が容量に接近",
      description: "電力需要が送電網容量の95%に到達",
      location: "市全域",
      timestamp: "2024-01-15 13:45",
      status: "監視中",
      affectedCitizens: 156432,
      estimatedResolution: "1時間",
      assignedTo: "負荷管理チーム",
    },
    {
      id: "ALT003",
      type: "気象警報",
      severity: "情報",
      title: "嵐警報発令",
      description: "今夜激しい雷雨が予想されます",
      location: "D地区・E地区",
      timestamp: "2024-01-15 12:00",
      status: "アクティブ",
      affectedCitizens: 44500,
      estimatedResolution: "6時間",
      assignedTo: "気象対応チーム",
    },
    {
      id: "ALT004",
      type: "メンテナンス",
      severity: "情報",
      title: "定期メンテナンス完了",
      description: "送電網セクションBのメンテナンスが予定より早く完了",
      location: "B地区、送電網セクション3",
      timestamp: "2024-01-15 11:30",
      status: "解決済み",
      affectedCitizens: 0,
      estimatedResolution: "完了",
      assignedTo: "メンテナンスチームベータ",
    },
  ]

  const notificationChannels = [
    { name: "メール", enabled: true, sent: 1247, failed: 3 },
    { name: "SMS", enabled: true, sent: 892, failed: 12 },
    { name: "プッシュ通知", enabled: true, sent: 2156, failed: 8 },
    { name: "緊急放送", enabled: false, sent: 0, failed: 0 },
  ]

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">アクティブアラート</TabsTrigger>
          <TabsTrigger value="history">アラート履歴</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="settings">アラート設定</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Alert Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alertStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="text-blue-600">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">昨日比 {stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="アラートを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                フィルター
              </Button>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              アラート作成
            </Button>
          </div>

          {/* Active Alerts */}
          <div className="space-y-4">
            {filteredAlerts
              .filter((alert) => alert.status !== "解決済み")
              .map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${
                    alert.severity === "緊急"
                      ? "border-l-red-500 bg-red-50"
                      : alert.severity === "警告"
                        ? "border-l-orange-500 bg-orange-50"
                        : "border-l-blue-500 bg-blue-50"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            alert.severity === "緊急"
                              ? "text-red-600"
                              : alert.severity === "警告"
                                ? "text-orange-600"
                                : "text-blue-600"
                          }`}
                        />
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={alert.severity === "緊急" ? "destructive" : "secondary"}
                              className={
                                alert.severity === "緊急"
                                  ? ""
                                  : alert.severity === "警告"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {alert.severity}
                            </Badge>
                            <Badge variant="outline">{alert.type}</Badge>
                            <span className="text-sm text-gray-500">{alert.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          通知
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{alert.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">場所:</span>
                        <div className="text-gray-600">{alert.location}</div>
                      </div>
                      <div>
                        <span className="font-semibold">影響市民数:</span>
                        <div className="text-gray-600">{alert.affectedCitizens.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="font-semibold">予想解決時間:</span>
                        <div className="text-gray-600">{alert.estimatedResolution}</div>
                      </div>
                      <div>
                        <span className="font-semibold">担当者:</span>
                        <div className="text-gray-600">{alert.assignedTo}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>最近のアラート履歴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          alert.status === "解決済み"
                            ? "bg-green-500"
                            : alert.severity === "緊急"
                              ? "bg-red-500"
                              : alert.severity === "警告"
                                ? "bg-orange-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-gray-500">
                          {alert.type} • {alert.location} • {alert.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={alert.status === "解決済み" ? "default" : "outline"}
                        className={alert.status === "解決済み" ? "bg-green-100 text-green-800" : ""}
                      >
                        {alert.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{alert.affectedCitizens.toLocaleString()} 影響</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>通知チャネル</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationChannels.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {channel.name === "メール" && <Mail className="w-5 h-5 text-blue-600" />}
                      {channel.name === "SMS" && <MessageSquare className="w-5 h-5 text-green-600" />}
                      {channel.name === "プッシュ通知" && <Bell className="w-5 h-5 text-purple-600" />}
                      {channel.name === "緊急放送" && <Send className="w-5 h-5 text-red-600" />}
                      <div>
                        <div className="font-medium">{channel.name}</div>
                        <div className="text-sm text-gray-500">
                          送信: {channel.sent} • 失敗: {channel.failed}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={channel.enabled ? "default" : "secondary"}
                      className={channel.enabled ? "bg-green-100 text-green-800" : ""}
                    >
                      {channel.enabled ? "有効" : "無効"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>最近の通知</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    message: "C地区住民に停電アラートを送信",
                    time: "5分前",
                    channel: "SMS",
                    status: "配信済み",
                  },
                  {
                    message: "ピーク需要警告を放送",
                    time: "15分前",
                    channel: "メール",
                    status: "配信済み",
                  },
                  { message: "嵐警報通知", time: "1時間前", channel: "プッシュ", status: "配信済み" },
                  {
                    message: "メンテナンス完了通知",
                    time: "2時間前",
                    channel: "メール",
                    status: "配信済み",
                  },
                  { message: "週間電力使用量サマリー", time: "1日前", channel: "メール", status: "失敗" },
                ].map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.status === "配信済み" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {notification.channel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>アラート閾値</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">電力需要閾値</div>
                      <div className="text-sm text-gray-500">需要が容量を超えた時にアラート</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">90%</div>
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">気温アラート</div>
                      <div className="text-sm text-gray-500">高温警報</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">35°C</div>
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">送電網効率</div>
                      <div className="text-sm text-gray-500">低効率警告</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">85%</div>
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">緊急アラート</div>
                      <div className="text-sm text-gray-500">緊急事態の即座通知</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">有効</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">日次サマリー</div>
                      <div className="text-sm text-gray-500">日次アラートサマリーレポート</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">有効</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">メンテナンス通知</div>
                      <div className="text-sm text-gray-500">定期メンテナンス通知</div>
                    </div>
                    <Badge variant="secondary">無効</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
