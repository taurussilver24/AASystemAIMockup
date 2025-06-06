"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Share,
} from "lucide-react"

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const reportStats = [
    { title: "今月生成数", value: "47", change: "+12%", icon: <FileText className="w-5 h-5" /> },
    { title: "自動生成", value: "32", change: "+8%", icon: <Clock className="w-5 h-5" /> },
    { title: "ダウンロード数", value: "156", change: "+23%", icon: <Download className="w-5 h-5" /> },
    { title: "共有数", value: "89", change: "+15%", icon: <Share className="w-5 h-5" /> },
  ]

  const reports = [
    {
      id: "RPT001",
      title: "月次電力消費レポート",
      type: "電力分析",
      period: "2024年1月",
      status: "完了",
      generated: "2024-01-15 09:00",
      size: "2.4 MB",
      format: "PDF",
      downloads: 23,
    },
    {
      id: "RPT002",
      title: "市民サービスサマリー",
      type: "サービスレポート",
      period: "2024年1月第2週",
      status: "完了",
      generated: "2024-01-14 18:30",
      size: "1.8 MB",
      format: "PDF",
      downloads: 15,
    },
    {
      id: "RPT003",
      title: "気象影響分析",
      type: "気象レポート",
      period: "2023年Q4",
      status: "生成中",
      generated: "進行中",
      size: "保留中",
      format: "PDF",
      downloads: 0,
    },
    {
      id: "RPT004",
      title: "送電網効率レポート",
      type: "技術レポート",
      period: "2023年12月",
      status: "完了",
      generated: "2024-01-01 12:00",
      size: "3.2 MB",
      format: "PDF",
      downloads: 45,
    },
    {
      id: "RPT005",
      title: "アラート対応分析",
      type: "運用レポート",
      period: "2024年1月",
      status: "予定済み",
      generated: "2024-01-16予定",
      size: "保留中",
      format: "PDF",
      downloads: 0,
    },
  ]

  const templates = [
    {
      name: "日次運用サマリー",
      description: "発電、消費、アラートの日次概要",
      frequency: "日次",
      lastGenerated: "今日 06:00",
      enabled: true,
    },
    {
      name: "週次市民レポート",
      description: "市民サービスと要求の週次サマリー",
      frequency: "週次",
      lastGenerated: "月曜日 08:00",
      enabled: true,
    },
    {
      name: "月次電力分析",
      description: "包括的な月次電力消費・効率分析",
      frequency: "月次",
      lastGenerated: "2024年1月1日",
      enabled: true,
    },
    {
      name: "四半期気象影響",
      description: "電力消費への気象影響の四半期分析",
      frequency: "四半期",
      lastGenerated: "2023年10月1日",
      enabled: false,
    },
  ]

  const analytics = {
    powerConsumption: {
      current: 2847,
      previous: 2541,
      change: 12.0,
    },
    efficiency: {
      current: 94.7,
      previous: 95.2,
      change: -0.5,
    },
    citizenSatisfaction: {
      current: 87.3,
      previous: 85.1,
      change: 2.2,
    },
    alertResponse: {
      current: 4.2,
      previous: 5.1,
      change: -0.9,
    },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">レポート</TabsTrigger>
          <TabsTrigger value="templates">テンプレート</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          <TabsTrigger value="schedule">スケジュール</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Report Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportStats.map((stat, index) => (
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

          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                レポート生成
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                レポート予約
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">期間:</span>
              <Button
                variant={selectedPeriod === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("daily")}
              >
                日次
              </Button>
              <Button
                variant={selectedPeriod === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("weekly")}
              >
                週次
              </Button>
              <Button
                variant={selectedPeriod === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("monthly")}
              >
                月次
              </Button>
            </div>
          </div>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle>最近のレポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-gray-500">
                          {report.type} • {report.period}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-sm text-right">
                        <div>{report.generated}</div>
                        <div className="text-gray-500">
                          {report.size} • {report.format}
                        </div>
                      </div>

                      <Badge
                        variant={
                          report.status === "完了" ? "default" : report.status === "生成中" ? "secondary" : "outline"
                        }
                        className={
                          report.status === "完了"
                            ? "bg-green-100 text-green-800"
                            : report.status === "生成中"
                              ? "bg-orange-100 text-orange-800"
                              : ""
                        }
                      >
                        {report.status}
                      </Badge>

                      <div className="text-sm text-gray-500">{report.downloads} ダウンロード</div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={report.status !== "完了"}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" disabled={report.status !== "完了"}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" disabled={report.status !== "完了"}>
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                レポートテンプレート
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  テンプレート作成
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {templates.map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge
                        variant={template.enabled ? "default" : "secondary"}
                        className={template.enabled ? "bg-green-100 text-green-800" : ""}
                      >
                        {template.enabled ? "アクティブ" : "非アクティブ"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">頻度: {template.frequency}</span>
                      <span className="text-gray-500">最終: {template.lastGenerated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                      <Button variant="outline" size="sm">
                        今すぐ生成
                      </Button>
                      <Button variant="outline" size="sm">
                        {template.enabled ? "無効化" : "有効化"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">電力消費量</CardTitle>
                <Zap className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.powerConsumption.current} MW</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics.powerConsumption.change}%</span>
                  <span className="text-sm text-gray-500 ml-1">前月比</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">送電網効率</CardTitle>
                <BarChart3 className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.efficiency.current}%</div>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">{analytics.efficiency.change}%</span>
                  <span className="text-sm text-gray-500 ml-1">前月比</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">市民満足度</CardTitle>
                <Users className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.citizenSatisfaction.current}%</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics.citizenSatisfaction.change}%</span>
                  <span className="text-sm text-gray-500 ml-1">前月比</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均対応時間</CardTitle>
                <Clock className="w-4 h-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.alertResponse.current}時間</div>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{analytics.alertResponse.change}時間</span>
                  <span className="text-sm text-gray-500 ml-1">改善</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>月次トレンド</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>発電効率</span>
                    <span className="font-semibold text-green-600">↑ 2.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ピーク需要管理</span>
                    <span className="font-semibold text-green-600">↑ 5.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>アラート解決時間</span>
                    <span className="font-semibold text-green-600">↓ 18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>市民サービス要求</span>
                    <span className="font-semibold text-orange-600">↑ 8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>主要業績指標</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>システム稼働時間</span>
                    <span className="font-semibold">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>再生可能エネルギー比率</span>
                    <span className="font-semibold">67.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>送電網安定性指数</span>
                    <span className="font-semibold">94.7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>顧客満足度</span>
                    <span className="font-semibold">87.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>予定されたレポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "日次運用サマリー", next: "明日 06:00", frequency: "日次" },
                  { name: "週次市民レポート", next: "月曜日 08:00", frequency: "週次" },
                  { name: "月次電力分析", next: "2024年2月1日", frequency: "月次" },
                  { name: "四半期気象影響", next: "2024年4月1日", frequency: "四半期" },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{schedule.name}</div>
                      <div className="text-sm text-gray-500">次回生成: {schedule.next}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{schedule.frequency}</Badge>
                      <Button variant="outline" size="sm">
                        スケジュール編集
                      </Button>
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
