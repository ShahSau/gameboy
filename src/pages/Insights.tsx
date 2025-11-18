import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Gamepad2, Monitor, Smartphone, GripVertical } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion, Reorder } from "framer-motion";

const Insights = () => {
  const [items, setItems] = useState([
    { id: "genre-performance", type: "genre" },
    { id: "games-by-tag", type: "tag" },
    { id: "games-by-platform", type: "platform" },
  ]);

  // Mock analytics data - simulating data from /game list endpoint
  const tagChartData = [
    { name: "Multiplayer", value: 245, color: "hsl(var(--primary))" },
    { name: "Singleplayer", value: 198, color: "hsl(var(--accent))" },
    { name: "Co-op", value: 134, color: "#10b981" },
    { name: "PvP", value: 167, color: "#3b82f6" },
    { name: "Open World", value: 89, color: "#8b5cf6" },
    { name: "Story Rich", value: 112, color: "#f59e0b" },
    { name: "Fantasy", value: 78, color: "#ec4899" },
    { name: "Sci-Fi", value: 92, color: "#06b6d4" },
  ];

  const platformChartData = [
    { name: "PC", games: 421, fill: "hsl(var(--primary))" },
    { name: "PlayStation", games: 298, fill: "hsl(var(--accent))" },
    { name: "Xbox", games: 187, fill: "#10b981" },
    { name: "Mobile", games: 156, fill: "#3b82f6" },
    { name: "Switch", games: 134, fill: "#8b5cf6" },
  ];

  const releasesPerYearData = [
    { year: "2018", releases: 45 },
    { year: "2019", releases: 62 },
    { year: "2020", releases: 89 },
    { year: "2021", releases: 134 },
    { year: "2022", releases: 187 },
    { year: "2023", releases: 223 },
    { year: "2024", releases: 167 },
  ];

  const genreData = [
    { name: "Shooter", games: 156, players: "2.4M", growth: "+12%", color: "bg-primary" },
    { name: "RPG", games: 142, players: "2.1M", growth: "+8%", color: "bg-accent" },
    { name: "Battle Royale", games: 89, players: "3.2M", growth: "+24%", color: "bg-green-500" },
    { name: "MMORPG", games: 67, players: "1.8M", growth: "+5%", color: "bg-blue-500" },
    { name: "Action", games: 203, players: "2.9M", growth: "+15%", color: "bg-purple-500" },
    { name: "Adventure", games: 134, players: "1.5M", growth: "+3%", color: "bg-orange-500" },
  ];

  const platformData = [
    { name: "PC", games: 421, players: "4.2M", share: "45%", icon: Monitor },
    { name: "PlayStation", games: 298, players: "2.8M", share: "30%", icon: Gamepad2 },
    { name: "Xbox", games: 187, players: "1.5M", share: "16%", icon: Gamepad2 },
    { name: "Mobile", games: 156, players: "0.9M", share: "9%", icon: Smartphone },
  ];

  const trendingStats = [
    { label: "Total Games", value: "1,247", change: "+23", icon: Gamepad2 },
    { label: "Active Players", value: "9.4M", change: "+12%", icon: Users },
    { label: "New Releases", value: "45", change: "+8", icon: TrendingUp },
    { label: "Top Rated", value: "89", change: "+5", icon: BarChart3 },
  ];

  const topGames = [
    { rank: 1, title: "Valorant", genre: "Shooter", players: "845K", rating: 9.2 },
    { rank: 2, title: "Fortnite", genre: "Battle Royale", players: "782K", rating: 8.9 },
    { rank: 3, title: "Apex Legends", genre: "Battle Royale", players: "654K", rating: 8.7 },
    { rank: 4, title: "PUBG", genre: "Battle Royale", players: "621K", rating: 8.5 },
    { rank: 5, title: "Elden Ring", genre: "RPG", players: "543K", rating: 9.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Game Insights</h1>
          <p className="text-muted-foreground">Dashboard showing genre/platform analytics and more</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            Drag to reorder sections
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {trendingStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Draggable Data Visualization Sections */}
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-6 mb-8">
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item} className="cursor-move">
              {item.type === "genre" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-glow transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle>Genre Performance</CardTitle>
                        <CardDescription>Game distribution and player engagement by genre</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {genreData.map((genre, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${genre.color}`}></div>
                                <span className="font-semibold">{genre.name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-muted-foreground">{genre.games} games</span>
                                <span className="font-semibold">{genre.players}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {genre.growth}
                                </Badge>
                              </div>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${genre.color}`}
                                style={{ width: `${(genre.games / 250) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {item.type === "tag" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-glow transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle>Games by Tag</CardTitle>
                        <CardDescription>Distribution of games across different tags</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={tagChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {tagChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {item.type === "platform" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-glow transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle>Games by Platform</CardTitle>
                        <CardDescription>Number of games available on each platform</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={platformChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--card))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Bar dataKey="games" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Line Chart - Releases per Year */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Releases per Year</CardTitle>
            <CardDescription>Game release trends over the years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={releasesPerYearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="releases" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabs with Platform Analytics and Top Games */}
        <Tabs defaultValue="platforms" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="platforms">Platform Analytics</TabsTrigger>
            <TabsTrigger value="trending">Top Games</TabsTrigger>
          </TabsList>

          {/* Platform Analytics */}
          <TabsContent value="platforms">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformData.map((platform, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <platform.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">{platform.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Games</span>
                        <span className="font-semibold">{platform.games}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Players</span>
                        <span className="font-semibold">{platform.players}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Market Share</span>
                        <Badge variant="secondary">{platform.share}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Games */}
          <TabsContent value="trending">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Games</CardTitle>
                <CardDescription>Most played games recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topGames.map((game) => (
                    <div key={game.rank} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                          {game.rank}
                        </div>
                        <div>
                          <h4 className="font-bold">{game.title}</h4>
                          <p className="text-sm text-muted-foreground">{game.genre}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Players</p>
                          <p className="font-semibold">{game.players}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-background px-3 py-1.5 rounded-lg">
                          <BarChart3 className="h-4 w-4 text-accent" />
                          <span className="font-semibold">{game.rating}</span>
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
    </div>
  );
};

export default Insights;
