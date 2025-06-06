"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Edit,
  Eye,
} from "lucide-react"

export function CitizenManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const citizenStats = [
    { title: "総市民数", value: "156,432", change: "+3.2%", icon: <Users className="w-5 h-5" /> },
    { title: "アクティブアカウント", value: "154,891", change: "+2.8%", icon: <CheckCircle className="w-5 h-5" /> },
    { title: "高消費者", value: "2,847", change: "+15%", icon: <TrendingUp className="w-5 h-5" /> },
    { title: "サービス要求", value: "47", change: "-12%", icon: <AlertTriangle className="w-5 h-5" /> },
  ]

  const citizens = [
    {
      id: "C001",
      name: "田中 太郎",
      email: "tanaka@email.com",
      phone: "090-1234-5678",
      address: "A地区, ブロック 12-3",
      consumption: 450,
      status: "アクティブ",
      alerts: 0,
    },
    {
      id: "C002",
      name: "佐藤 花子",
      email: "sato@email.com",
      phone: "090-2345-6789",
      address: "B地区, ブロック 8-7",
      consumption: 320,
      status: "アクティブ",
      alerts: 1,
    },
    {
      id: "C003",
      name: "鈴木 一郎",
      email: "suzuki@email.com",
      phone: "090-3456-7890",
      address: "C地区, ブロック 15-2",
      consumption: 680,
      status: "高使用量",
      alerts: 2,
    },
    {
      id: "C004",
      name: "高橋 美咲",
      email: "takahashi@email.com",
      phone: "090-4567-8901",
      address: "A地区, ブロック 5-9",
      consumption: 280,
      status: "アクティブ",
      alerts: 0,
    },
    {
      id: "C005",
      name: "伊藤 健太",
      email: "ito@email.com",
      phone: "090-5678-9012",
      address: "D地区, ブロック 22-1",
      consumption: 520,
      status: "アクティブ",
      alerts: 1,
    },
  ]

  const serviceRequests = [
    {
      id: "SR001",
      citizen: "田中 太郎",
      type: "料金照会",
      status: "保留中",
      priority: "中",
      created: "2024-01-15",
    },
    {
      id: "SR002",
      citizen: "佐藤 花子",
      type: "停電報告",
      status: "処理中",
      priority: "高",
      created: "2024-01-14",
    },
    {
      id: "SR003",
      citizen: "鈴木 一郎",
      type: "メーター読み取り問題",
      status: "解決済み",
      priority: "低",
      created: "2024-01-13",
    },
  ]

  const filteredCitizens = citizens.filter(
    (citizen) =>
      citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="citizens">市民</TabsTrigger>
          <TabsTrigger value="requests">サービス要求</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {citizenStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className="text-blue-600">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">前月比 {stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>最近の登録</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {citizens.slice(0, 5).map((citizen) => (
                  <div key={citizen.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{citizen.name}</div>
                      <div className="text-sm text-gray-500">{citizen.address}</div>
                    </div>
                    <Badge variant="outline">新規</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>高使用量アラート</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {citizens
                  .filter((c) => c.status === "高使用量")
                  .map((citizen) => (
                    <div key={citizen.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium">{citizen.name}</div>
                        <div className="text-sm text-orange-600">{citizen.consumption} kWh/月</div>
                      </div>
                      <Badge variant="destructive">高使用量</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="citizens" className="space-y-6">
          {/* Search and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="市民を検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              市民追加
            </Button>
          </div>

          {/* Citizens Table */}
          <Card>
            <CardHeader>
              <CardTitle>市民ディレクトリ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCitizens.map((citizen) => (
                  <div
                    key={citizen.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{citizen.name}</div>
                        <div className="text-sm text-gray-500">ID: {citizen.id}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {citizen.email}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3" />
                          {citizen.phone}
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {citizen.address}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Zap className="w-3 h-3" />
                          {citizen.consumption} kWh/月
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={citizen.status === "アクティブ" ? "default" : "destructive"}
                          className={citizen.status === "アクティブ" ? "bg-green-100 text-green-800" : ""}
                        >
                          {citizen.status}
                        </Badge>
                        {citizen.alerts > 0 && (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {citizen.alerts} アラート
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                サービス要求
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  新規要求
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">{request.type}</div>
                        <div className="text-sm text-gray-500">
                          {request.citizen} • {request.created}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          request.priority === "高"
                            ? "destructive"
                            : request.priority === "中"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {request.priority}
                      </Badge>
                      <Badge
                        variant={
                          request.status === "解決済み"
                            ? "default"
                            : request.status === "処理中"
                              ? "secondary"
                              : "outline"
                        }
                        className={request.status === "解決済み" ? "bg-green-100 text-green-800" : ""}
                      >
                        {request.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        詳細表示
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>使用量分布</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>低使用量 (0-300 kWh)</span>
                    <span className="font-semibold">45,329 市民</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>中使用量 (300-500 kWh)</span>
                    <span className="font-semibold">89,156 市民</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>高使用量 (500+ kWh)</span>
                    <span className="font-semibold">21,947 市民</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>地理的分布</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>A地区</span>
                    <span className="font-semibold">32,145 市民</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>B地区</span>
                    <span className="font-semibold">28,967 市民</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>C地区</span>
                    <span className="font-semibold">41,203 市民</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>D地区</span>
                    <span className="font-semibold">25,891 市民</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>E地区</span>
                    <span className="font-semibold">28,226 市民</span>
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
