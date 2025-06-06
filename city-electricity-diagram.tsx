"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Zap, Cloud, AlertTriangle, Settings, Shield, FileText, Users, Activity, Bell } from "lucide-react"

interface ClassBox {
  id: string
  name: string
  nameEn: string
  attributes: string[]
  methods: string[]
  isAbstract?: boolean
  icon: React.ReactNode
  position: { x: number; y: number }
  layer: string
}

const classes: ClassBox[] = [
  // System Control Layer
  {
    id: "controller",
    name: "システム制御器",
    nameEn: "System Controller",
    attributes: ["システムID: String", "実行状態: String", "開始時刻: DateTime"],
    methods: ["処理開始(): void", "並列処理制御(): void", "処理終了(): void", "エラー処理(): void"],
    icon: <Settings className="w-4 h-4" />,
    position: { x: 0, y: 0 },
    layer: "Control",
  },
  {
    id: "citizen",
    name: "市民",
    nameEn: "Citizen",
    attributes: ["市民ID: String", "名前: String", "生年月日: Date", "住所: String", "電話番号: String"],
    methods: ["情報変更(): void", "情報取得(): CitizenInfo", "アラート受信(): void"],
    icon: <Users className="w-4 h-4" />,
    position: { x: 1, y: 0 },
    layer: "Control",
  },
  {
    id: "database",
    name: "データベース管理",
    nameEn: "Database Management",
    attributes: ["接続情報: ConnectionInfo", "テーブル管理: TableManager", "トランザクション: Transaction"],
    methods: ["接続確立(): Boolean", "データ保存(): Boolean", "データ取得(): ResultSet", "整合性チェック(): Boolean"],
    icon: <Database className="w-4 h-4" />,
    position: { x: 2, y: 0 },
    layer: "Control",
  },
  // Data Processing Layer
  {
    id: "parallel",
    name: "並列処理管理",
    nameEn: "Parallel Processing",
    attributes: ["プロセスID: String", "スレッドプール: ThreadPool", "タスクキュー: TaskQueue"],
    methods: ["フォーク処理(): void", "ジョイン処理(): void", "タスク分散(): void", "結果統合(): Result"],
    icon: <Activity className="w-4 h-4" />,
    position: { x: 0, y: 1 },
    layer: "Processing",
  },
  {
    id: "powerdata",
    name: "電力データ管理",
    nameEn: "Power Data Management",
    attributes: ["データID: String", "測定日時: DateTime", "使用量: Double", "供給量: Double"],
    methods: ["データ取得(): PowerData", "監視(): void", "計算(): Double", "予測生成(): ForecastData"],
    icon: <Zap className="w-4 h-4" />,
    position: { x: 1, y: 1 },
    layer: "Processing",
  },
  {
    id: "weatherdata",
    name: "気象データ管理",
    nameEn: "Weather Data Management",
    attributes: ["データID: String", "測定日時: DateTime", "気温: Double", "湿度: Double"],
    methods: ["データ取得(): WeatherData", "予報取得(): Forecast", "傾向分析(): TrendData", "警報判定(): Boolean"],
    icon: <Cloud className="w-4 h-4" />,
    position: { x: 2, y: 1 },
    layer: "Processing",
  },
  // Analysis Layer
  {
    id: "analyzer",
    name: "データ分析エンジン",
    nameEn: "Data Analysis Engine",
    attributes: ["分析ID: String", "アルゴリズム: Algorithm", "閾値設定: ThresholdConfig"],
    methods: [
      "需要分析(): AnalysisResult",
      "気象分析(): CorrelationData",
      "需要予測(): PredictionResult",
      "分析実行(): Result",
    ],
    isAbstract: true,
    icon: <Activity className="w-4 h-4" />,
    position: { x: 1, y: 2 },
    layer: "Analysis",
  },
  // Notification Layer
  {
    id: "report",
    name: "レポート生成",
    nameEn: "Report Generation",
    attributes: ["レポートID: String", "テンプレート: Template", "生成日時: DateTime"],
    methods: ["日次レポート(): Report", "月次統計(): Statistics", "分析結果出力(): Report", "PDF出力(): Boolean"],
    icon: <FileText className="w-4 h-4" />,
    position: { x: 0, y: 3 },
    layer: "Notification",
  },
  {
    id: "alert",
    name: "アラート管理",
    nameEn: "Alert Management",
    attributes: ["アラートID: String", "メッセージ: Template", "緊急度: Priority", "送信チャネル: Channel"],
    methods: ["アラート生成(): Alert", "緊急度判定(): Priority", "メッセージ作成(): String", "多チャネル送信(): void"],
    icon: <AlertTriangle className="w-4 h-4" />,
    position: { x: 1, y: 3 },
    layer: "Notification",
  },
  {
    id: "notification",
    name: "通知サービス",
    nameEn: "Notification Service",
    attributes: ["サービスID: String", "通知方式: Method", "配信状況: Status"],
    methods: ["メール送信(): Boolean", "SMS送信(): Boolean", "プッシュ通知(): Boolean", "配信確認(): Report"],
    icon: <Bell className="w-4 h-4" />,
    position: { x: 2, y: 3 },
    layer: "Notification",
  },
  // Foundation Layer
  {
    id: "config",
    name: "設定管理",
    nameEn: "Configuration Management",
    attributes: ["設定ID: String", "システム設定: Config", "ユーザー設定: Config"],
    methods: ["設定読込(): Configuration", "設定保存(): Boolean", "設定検証(): Boolean"],
    icon: <Settings className="w-4 h-4" />,
    position: { x: 0, y: 4 },
    layer: "Foundation",
  },
  {
    id: "logger",
    name: "ログ管理",
    nameEn: "Log Management",
    attributes: ["ログID: String", "ログレベル: LogLevel", "出力先: OutputTarget"],
    methods: ["ログ出力(): void", "エラーログ(): void", "ログ検索(): List<Log>"],
    icon: <FileText className="w-4 h-4" />,
    position: { x: 1, y: 4 },
    layer: "Foundation",
  },
  {
    id: "security",
    name: "セキュリティ管理",
    nameEn: "Security Management",
    attributes: ["セキュリティID: String", "認証設定: AuthConfig", "暗号化設定: Config"],
    methods: ["認証(): Boolean", "権限チェック(): Boolean", "データ暗号化(): Data"],
    icon: <Shield className="w-4 h-4" />,
    position: { x: 2, y: 4 },
    layer: "Foundation",
  },
]

const layerColors = {
  Control: "bg-blue-50 border-blue-200",
  Processing: "bg-green-50 border-green-200",
  Analysis: "bg-purple-50 border-purple-200",
  Notification: "bg-orange-50 border-orange-200",
  Foundation: "bg-gray-50 border-gray-200",
}

const layerNames = {
  Control: "制御層 (Control Layer)",
  Processing: "データ処理層 (Data Processing Layer)",
  Analysis: "分析層 (Analysis Layer)",
  Notification: "通知層 (Notification Layer)",
  Foundation: "基盤層 (Foundation Layer)",
}

export default function Component() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [showEnglish, setShowEnglish] = useState(false)

  const layers = ["Control", "Processing", "Analysis", "Notification", "Foundation"]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">市民情報管理システム 詳細クラス図</h1>
        <p className="text-lg text-muted-foreground">City Electricity Management System - Detailed Class Diagram</p>
        <div className="flex justify-center gap-4">
          <Button variant={showEnglish ? "outline" : "default"} onClick={() => setShowEnglish(false)}>
            日本語
          </Button>
          <Button variant={showEnglish ? "default" : "outline"} onClick={() => setShowEnglish(true)}>
            English
          </Button>
        </div>
      </div>

      {layers.map((layer) => (
        <div key={layer} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{layerNames[layer as keyof typeof layerNames]}</h2>
            <Badge variant="outline">{classes.filter((c) => c.layer === layer).length} classes</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes
              .filter((cls) => cls.layer === layer)
              .map((cls) => (
                <Card
                  key={cls.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    layerColors[cls.layer as keyof typeof layerColors]
                  } ${cls.isAbstract ? "border-dashed" : ""} ${selectedClass === cls.id ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setSelectedClass(selectedClass === cls.id ? null : cls.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {cls.icon}
                      <div>
                        <div className="font-bold">{showEnglish ? cls.nameEn : cls.name}</div>
                        {cls.isAbstract && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Abstract
                          </Badge>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Attributes</h4>
                      <div className="space-y-1">
                        {cls.attributes.map((attr, idx) => (
                          <div key={idx} className="text-xs font-mono bg-white/50 px-2 py-1 rounded">
                            - {attr}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Methods</h4>
                      <div className="space-y-1">
                        {cls.methods.map((method, idx) => (
                          <div
                            key={idx}
                            className={`text-xs font-mono bg-white/50 px-2 py-1 rounded ${
                              cls.isAbstract && idx === cls.methods.length - 1 ? "italic" : ""
                            }`}
                          >
                            + {method}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-4">システム構成 (System Architecture)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>制御層:</strong> システム全体の制御
          </div>
          <div>
            <strong>データ処理層:</strong> 電力・気象データ管理
          </div>
          <div>
            <strong>分析層:</strong> データ分析・予測
          </div>
          <div>
            <strong>通知層:</strong> アラート・レポート
          </div>
          <div>
            <strong>基盤層:</strong> 設定・ログ・セキュリティ
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2">Legend / 凡例</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-solid border-gray-400"></div>
            <span>通常クラス</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-dashed border-gray-400"></div>
            <span>抽象クラス</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Abstract</Badge>
            <span>抽象クラス</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200"></div>
            <span>レイヤー分類</span>
          </div>
        </div>
      </div>
    </div>
  )
}
