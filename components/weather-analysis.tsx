"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Gauge, TrendingUp, AlertTriangle } from "lucide-react"

export function WeatherAnalysis() {
  const currentWeather = {
    temperature: 24,
    humidity: 68,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: "部分的に曇り",
  }

  const forecast = [
    { day: "今日", high: 26, low: 18, condition: "部分的に曇り", rain: 20, icon: <Cloud className="w-5 h-5" /> },
    { day: "明日", high: 28, low: 20, condition: "晴れ", rain: 5, icon: <Sun className="w-5 h-5" /> },
    { day: "水曜", high: 22, low: 16, condition: "雨", rain: 80, icon: <CloudRain className="w-5 h-5" /> },
    { day: "木曜", high: 25, low: 17, condition: "曇り", rain: 30, icon: <Cloud className="w-5 h-5" /> },
    { day: "金曜", high: 27, low: 19, condition: "晴れ", rain: 10, icon: <Sun className="w-5 h-5" /> },
  ]

  const powerCorrelation = [
    { factor: "気温", correlation: 0.85, impact: "高", description: "高温時にエアコン使用量が増加" },
    { factor: "湿度", correlation: 0.62, impact: "中", description: "快適性と冷房需要に影響" },
    { factor: "風速", correlation: -0.43, impact: "中", description: "強風時は冷房需要が減少" },
    { factor: "降雨", correlation: -0.28, impact: "低", description: "雨天時は屋外活動が減少" },
  ]

  const alerts = [
    {
      type: "熱波警報",
      severity: "高",
      message: "今後3日間、35°C以上の気温が予想されます。電力需要の増加に備えてください。",
      impact: "電力需要が15-20%増加する可能性",
    },
    {
      type: "嵐警報",
      severity: "中",
      message: "水曜日の夕方に雷雨が予想されます。電力網の障害の可能性があります。",
      impact: "C地区とE地区で停電の可能性",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">現在の天気</TabsTrigger>
          <TabsTrigger value="forecast">予報</TabsTrigger>
          <TabsTrigger value="correlation">電力相関</TabsTrigger>
          <TabsTrigger value="alerts">気象警報</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Weather Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">気温</CardTitle>
                <Thermometer className="w-4 h-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentWeather.temperature}°C</div>
                <p className="text-xs text-muted-foreground">体感温度 26°C</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">湿度</CardTitle>
                <Droplets className="w-4 h-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
                <p className="text-xs text-muted-foreground">普通</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">風速</CardTitle>
                <Wind className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentWeather.windSpeed} km/h</div>
                <p className="text-xs text-muted-foreground">軽風</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">気圧</CardTitle>
                <Gauge className="w-4 h-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentWeather.pressure} hPa</div>
                <p className="text-xs text-muted-foreground">正常</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Current Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  現在の状況
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{currentWeather.temperature}°C</div>
                  <div className="text-lg text-blue-800 mb-4">{currentWeather.condition}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{currentWeather.visibility} km</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Sun className="w-4 h-4" />
                      <span>UV {currentWeather.uvIndex}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>電力需要への影響</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">中程度の影響</span>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    現在の気象条件により、冷房需要で電力需要が8%増加すると予想されます。
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>予想需要増加</span>
                      <span className="font-semibold">+8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold">冷房負荷</div>
                    <div className="text-lg font-bold text-blue-600">+180 MW</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold">再生可能エネルギー出力</div>
                    <div className="text-lg font-bold text-green-600">+45 MW</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>5日間天気予報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50">
                    <div className="font-semibold mb-2">{day.day}</div>
                    <div className="flex justify-center mb-3 text-blue-600">{day.icon}</div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold">{day.high}°</div>
                      <div className="text-sm text-gray-500">{day.low}°</div>
                      <div className="text-xs text-blue-600">{day.rain}% 雨</div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">{day.condition}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>電力需要予測</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{day.icon}</div>
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-gray-500">
                          {day.high}°/{day.low}° • {day.condition}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{day.high > 25 ? "+12%" : day.high < 20 ? "-5%" : "+3%"}</div>
                      <div className="text-sm text-gray-500">需要変化</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>気象-電力相関分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {powerCorrelation.map((factor, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{factor.factor}</div>
                        <div className="text-sm text-gray-500">{factor.description}</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            factor.impact === "高" ? "destructive" : factor.impact === "中" ? "secondary" : "outline"
                          }
                        >
                          {factor.impact}影響
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>相関強度</span>
                        <span className="font-semibold">{Math.abs(factor.correlation)}</span>
                      </div>
                      <Progress value={Math.abs(factor.correlation) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>過去の気象影響</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">+23%</div>
                    <div className="text-sm text-red-800">夏季ピーク需要</div>
                    <div className="text-xs text-gray-600">春季平均比</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">-15%</div>
                    <div className="text-sm text-blue-800">雨天時減少</div>
                    <div className="text-xs text-gray-600">晴天時比</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+8%</div>
                    <div className="text-sm text-green-800">風力発電増加</div>
                    <div className="text-xs text-gray-600">強風時</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  alert.severity === "高"
                    ? "border-l-red-500 bg-red-50"
                    : alert.severity === "中"
                      ? "border-l-orange-500 bg-orange-50"
                      : "border-l-yellow-500 bg-yellow-50"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        alert.severity === "高"
                          ? "text-red-600"
                          : alert.severity === "中"
                            ? "text-orange-600"
                            : "text-yellow-600"
                      }`}
                    />
                    {alert.type}
                    <Badge
                      variant={alert.severity === "高" ? "destructive" : "secondary"}
                      className={
                        alert.severity === "高"
                          ? ""
                          : alert.severity === "中"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{alert.message}</p>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm font-semibold mb-1">予想される影響:</div>
                    <div className="text-sm text-gray-700">{alert.impact}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>気象観測所</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["観測所A", "観測所B", "観測所C", "観測所D", "観測所E"].map((station, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{station}</div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        オンライン
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>気温:</span>
                        <span>{24 + index}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>湿度:</span>
                        <span>{65 + index * 2}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>最終更新:</span>
                        <span>2分前</span>
                      </div>
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
