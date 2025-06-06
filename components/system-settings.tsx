"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Database,
  Shield,
  Bell,
  Users,
  Zap,
  Save,
  RefreshCw,
  CheckCircle,
  Key,
  Lock,
  Monitor,
  HardDrive,
} from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    powerThreshold: 90,
    tempThreshold: 35,
    autoAlerts: true,
    emailNotifications: true,
    smsNotifications: true,
    maintenanceMode: false,
  })

  const systemInfo = {
    version: "2.1.4",
    uptime: "99.8%",
    lastUpdate: "2024-01-10",
    database: "PostgreSQL 14.2",
    storage: "使用済み 2.4 TB / 総容量 5.0 TB",
  }

  const securitySettings = [
    { name: "二要素認証", enabled: true, description: "管理者アクセスに2FAを要求" },
    { name: "セッションタイムアウト", enabled: true, description: "30分後に自動ログアウト" },
    { name: "IPホワイトリスト", enabled: false, description: "特定のIP範囲へのアクセス制限" },
    { name: "監査ログ", enabled: true, description: "すべてのシステムアクセスと変更をログ記録" },
  ]

  const userRoles = [
    { name: "システム管理者", users: 3, permissions: "すべてのシステム機能への完全アクセス" },
    { name: "運用管理者", users: 8, permissions: "電力管理と監視" },
    { name: "カスタマーサービス", users: 15, permissions: "市民管理とサポート" },
    { name: "アナリスト", users: 5, permissions: "レポートと分析へのアクセス" },
    { name: "閲覧者", users: 12, permissions: "ダッシュボードへの読み取り専用アクセス" },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">一般</TabsTrigger>
          <TabsTrigger value="alerts">アラート</TabsTrigger>
          <TabsTrigger value="security">セキュリティ</TabsTrigger>
          <TabsTrigger value="users">ユーザー</TabsTrigger>
          <TabsTrigger value="system">システム</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  システム設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">電力需要閾値 (%)</label>
                    <Input
                      type="number"
                      value={settings.powerThreshold}
                      onChange={(e) => setSettings({ ...settings, powerThreshold: Number.parseInt(e.target.value) })}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">電力需要がこの割合を超えた時にアラート</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">気温アラート閾値 (°C)</label>
                    <Input
                      type="number"
                      value={settings.tempThreshold}
                      onChange={(e) => setSettings({ ...settings, tempThreshold: Number.parseInt(e.target.value) })}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">この気温を超えた時に気象アラートを送信</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">自動アラート</div>
                      <div className="text-sm text-gray-500">自動アラート生成を有効化</div>
                    </div>
                    <Switch
                      checked={settings.autoAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">メンテナンスモード</div>
                      <div className="text-sm text-gray-500">重要でない機能を一時的に無効化</div>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  設定を保存
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  システム情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">システムバージョン</span>
                    <span className="font-medium">{systemInfo.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">稼働時間</span>
                    <Badge className="bg-green-100 text-green-800">{systemInfo.uptime}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">最終更新</span>
                    <span className="font-medium">{systemInfo.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">データベース</span>
                    <span className="font-medium">{systemInfo.database}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">ストレージ</span>
                    <span className="font-medium">{systemInfo.storage}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    更新確認
                  </Button>
                  <Button variant="outline" className="w-full">
                    <HardDrive className="w-4 h-4 mr-2" />
                    システムバックアップ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                通知設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">メール通知</div>
                    <div className="text-sm text-gray-500">メールでアラートを送信</div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">SMS通知</div>
                    <div className="text-sm text-gray-500">緊急アラートをSMSで送信</div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">アラート優先度</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">緊急アラート</span>
                      <Badge variant="destructive">即座</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">警告アラート</span>
                      <Badge className="bg-orange-100 text-orange-800">5分</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">情報アラート</span>
                      <Badge variant="outline">15分</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  セキュリティ設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{setting.name}</div>
                      <div className="text-sm text-gray-500">{setting.description}</div>
                    </div>
                    <Badge
                      variant={setting.enabled ? "default" : "secondary"}
                      className={setting.enabled ? "bg-green-100 text-green-800" : ""}
                    >
                      {setting.enabled ? "有効" : "無効"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  アクセス制御
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">セキュリティ状態: 良好</span>
                    </div>
                    <p className="text-sm text-green-700">すべてのセキュリティ対策が有効です</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ログイン失敗回数 (24時間)</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>アクティブセッション</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>最終セキュリティスキャン</span>
                      <span className="font-medium">2時間前</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    全ユーザーを強制ログアウト
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  ユーザー管理
                </div>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  ユーザー追加
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-gray-500">{role.permissions}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">{role.users}</div>
                        <div className="text-sm text-gray-500">ユーザー</div>
                      </div>
                      <Button variant="outline" size="sm">
                        管理
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  データベース管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">データベースサイズ</span>
                    <span className="font-medium">2.4 TB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">最終バックアップ</span>
                    <span className="font-medium">2時間前</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">接続プール</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    今すぐバックアップ
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    データベース最適化
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  パフォーマンス監視
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU使用率</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">メモリ使用率</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ディスクI/O</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ネットワーク</span>
                    <Badge className="bg-green-100 text-green-800">安定</Badge>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">システムパフォーマンス: 最適</span>
                  </div>
                  <p className="text-sm text-blue-700">すべてのシステムが正常なパラメータ内で動作しています</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
