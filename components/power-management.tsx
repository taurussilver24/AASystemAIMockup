"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  TrendingUp,
  Battery,
  Sun,
  Wind,
  Factory,
  Home,
  Building,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react"

export function PowerManagement() {
  const [selectedGrid, setSelectedGrid] = useState("all")

  const powerSources = [
    {
      name: "太陽光",
      capacity: 850,
      current: 720,
      efficiency: 84.7,
      icon: <Sun className="w-4 h-4" />,
      color: "bg-yellow-500",
    },
    {
      name: "風力",
      capacity: 650,
      current: 580,
      efficiency: 89.2,
      icon: <Wind className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      name: "水力",
      capacity: 1200,
      current: 1150,
      efficiency: 95.8,
      icon: <Battery className="w-4 h-4" />,
      color: "bg-cyan-500",
    },
    {
      name: "火力",
      capacity: 800,
      current: 397,
      efficiency: 49.6,
      icon: <Factory className="w-4 h-4" />,
      color: "bg-gray-500",
    },
  ]

  const gridSections = [
    { id: "A", name: "A地区", load: 420, capacity: 500, status: "正常", consumers: 12500 },
    { id: "B", name: "B地区", load: 380, capacity: 450, status: "正常", consumers: 11200 },
    { id: "C", name: "C地区", load: 445, capacity: 480, status: "高負荷", consumers: 13800 },
    { id: "D", name: "D地区", load: 290, capacity: 400, status: "正常", consumers: 8900 },
    { id: "E", name: "E地区", load: 520, capacity: 550, status: "危険", consumers: 15600 },
  ]

  const demandForecast = [
    { time: "00:00", demand: 1800, supply: 2100 },
    { time: "06:00", demand: 2200, supply: 2400 },
    { time: "12:00", demand: 2800, supply: 2900 },
    { time: "18:00", demand: 3200, supply: 3100 },
    { time: "24:00", demand: 2400, supply: 2600 },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="generation">発電</TabsTrigger>
          <TabsTrigger value="distribution">配電</TabsTrigger>
          <TabsTrigger value="forecast">予測</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Power Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総発電量</CardTitle>
                <Zap className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847 MW</div>
                <p className="text-xs text-muted-foreground">昨日比 +12%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">現在の需要</CardTitle>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,055 MW</div>
                <p className="text-xs text-muted-foreground">ピーク: 3,200 MW</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">送電網効率</CardTitle>
                <Battery className="w-4 h-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.7%</div>
                <p className="text-xs text-muted-foreground">目標: 95%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">予備容量</CardTitle>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">792 MW</div>
                <p className="text-xs text-muted-foreground">27.8% バッファ</p>
              </CardContent>
            </Card>
          </div>

          {/* Grid Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                送電網セクション状態
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  更新
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gridSections.map((section) => (
                  <div key={section.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{section.name}</h3>
                      <Badge
                        variant={
                          section.status === "正常"
                            ? "default"
                            : section.status === "高負荷"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          section.status === "正常"
                            ? "bg-green-100 text-green-800"
                            : section.status === "高負荷"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {section.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>負荷</span>
                        <span>
                          {section.load} / {section.capacity} MW
                        </span>
                      </div>
                      <Progress value={(section.load / section.capacity) * 100} className="h-2" />
                      <div className="text-xs text-gray-500">{section.consumers.toLocaleString()} 消費者</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>発電源</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {powerSources.map((source, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${source.color} text-white`}>{source.icon}</div>
                        <h3 className="font-semibold">{source.name}</h3>
                      </div>
                      <Badge variant="outline">{source.efficiency}% 効率</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>現在の出力</span>
                        <span>
                          {source.current} / {source.capacity} MW
                        </span>
                      </div>
                      <Progress value={(source.current / source.capacity) * 100} className="h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>セクター別消費量</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">住宅用</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">1,423 MW</div>
                      <div className="text-sm text-gray-500">50%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-green-600" />
                      <span className="font-medium">商業用</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">854 MW</div>
                      <div className="text-sm text-gray-500">30%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Factory className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">工業用</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">427 MW</div>
                      <div className="text-sm text-gray-500">15%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ピーク負荷管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">ピーク時間アラート</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    18:00-19:00にピーク需要が予想されます。負荷分散を検討してください。
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">現在の負荷</span>
                    <span className="font-semibold">2,055 MW</span>
                  </div>
                  <Progress value={64} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 MW</span>
                    <span>3,200 MW (ピーク容量)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>24時間需要予測</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandForecast.map((forecast, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{forecast.time}</div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-500">需要: </span>
                        <span className="font-semibold">{forecast.demand} MW</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">供給: </span>
                        <span className="font-semibold">{forecast.supply} MW</span>
                      </div>
                      <Badge
                        variant={forecast.supply > forecast.demand ? "default" : "destructive"}
                        className={forecast.supply > forecast.demand ? "bg-green-100 text-green-800" : ""}
                      >
                        {forecast.supply > forecast.demand ? "余剰" : "不足"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
