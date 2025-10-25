"use client"

import { FeatureLayout } from "@/components/feature-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Target, Zap, Brain, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  // Mock data
  const studyStats = {
    totalHours: 24.5,
    sessionsCompleted: 18,
    averageScore: 82,
    streak: 7,
  }

  const weeklyProgress = [
    { day: "Mon", hours: 2.5, quizzes: 3 },
    { day: "Tue", hours: 3.2, quizzes: 4 },
    { day: "Wed", hours: 1.8, quizzes: 2 },
    { day: "Thu", hours: 4.1, quizzes: 5 },
    { day: "Fri", hours: 2.9, quizzes: 3 },
    { day: "Sat", hours: 3.5, quizzes: 4 },
    { day: "Sun", hours: 3.0, quizzes: 3 },
  ]

  const subjectPerformance = [
    { subject: "Transformers", score: 92, target: 85 },
    { subject: "NLP", score: 78, target: 85 },
    { subject: "Deep Learning", score: 88, target: 85 },
    { subject: "Python", score: 95, target: 85 },
    { subject: "Statistics", score: 72, target: 85 },
  ]

  const learningBreakdown = [
    { name: "Quizzes", value: 35, color: "#8b5cf6" },
    { name: "Flashcards", value: 30, color: "#06b6d4" },
    { name: "Summaries", value: 20, color: "#f59e0b" },
    { name: "Study Buddy", value: 15, color: "#10b981" },
  ]

  const weakAreas = [
    { subject: "Statistics", score: 72, recommendation: "Review probability concepts and practice more problems" },
    { subject: "NLP", score: 78, recommendation: "Focus on sequence-to-sequence models and attention mechanisms" },
    { subject: "Data Preprocessing", score: 75, recommendation: "Practice data cleaning and normalization techniques" },
  ]

  const recommendations = [
    {
      title: "Master Statistics",
      description: "Your weakest area. Complete 5 more quizzes on probability theory.",
      priority: "high",
      icon: AlertCircle,
    },
    {
      title: "Maintain Python Streak",
      description: "You're doing great! Keep practicing daily to maintain your 7-day streak.",
      priority: "medium",
      icon: Zap,
    },
    {
      title: "Review NLP Concepts",
      description: "Revisit sequence models. Create new flashcards for better retention.",
      priority: "medium",
      icon: Brain,
    },
  ]

  return (
    <FeatureLayout
      title="Learning Dashboard"
      description="Track your progress, identify weak areas, and get personalized study recommendations"
    >
      <div className="space-y-8">
        {/* Key Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Study Hours</p>
                <p className="text-3xl font-bold">{studyStats.totalHours}</p>
                <p className="text-xs text-green-600">+2.5 this week</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                <p className="text-3xl font-bold">{studyStats.sessionsCompleted}</p>
                <p className="text-xs text-green-600">+3 this week</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold">{studyStats.averageScore}%</p>
                <p className="text-xs text-green-600">+5% improvement</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold">{studyStats.streak} days</p>
                <p className="text-xs text-amber-600">Keep it going!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="progress">Weekly Progress</TabsTrigger>
            <TabsTrigger value="performance">Subject Performance</TabsTrigger>
            <TabsTrigger value="breakdown">Learning Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Study Activity</CardTitle>
                <CardDescription>Hours studied and quizzes completed per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hours" stroke="#8b5cf6" name="Study Hours" />
                    <Line type="monotone" dataKey="quizzes" stroke="#06b6d4" name="Quizzes" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance vs Target</CardTitle>
                <CardDescription>Your scores compared to your learning goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8b5cf6" name="Your Score" />
                    <Bar dataKey="target" fill="#d1d5db" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown">
            <Card>
              <CardHeader>
                <CardTitle>Learning Method Distribution</CardTitle>
                <CardDescription>Time spent on each learning tool</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={learningBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {learningBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Weak Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>Topics where you scored below your target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weakAreas.map((area, idx) => (
                <div key={idx} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{area.subject}</h4>
                      <p className="text-sm text-muted-foreground">Current score: {area.score}%</p>
                    </div>
                    <span className="text-sm font-medium text-amber-600">Below target</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{area.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>AI-powered suggestions to optimize your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, idx) => {
                const Icon = rec.icon
                const priorityColor =
                  rec.priority === "high"
                    ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                    : "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"

                return (
                  <div key={idx} className={`p-4 border rounded-lg ${priorityColor}`}>
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Study Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Study Goals</CardTitle>
            <CardDescription>Set and track your learning objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Complete 50 Quizzes</h4>
                  <span className="text-sm text-muted-foreground">18/50</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "36%" }} />
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Study 30 Hours</h4>
                  <span className="text-sm text-muted-foreground">24.5/30</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "82%" }} />
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Maintain 10-Day Streak</h4>
                  <span className="text-sm text-muted-foreground">7/10</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FeatureLayout>
  )
}
