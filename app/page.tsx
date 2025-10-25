"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Lightbulb, MessageSquare, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const features = [
    {
      id: "summarizer",
      title: "Research Paper Summarizer",
      description: "Upload or paste academic papers and get instant summaries with key points and conclusions",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      href: "/summarizer",
    },
    {
      id: "quiz",
      title: "Smart Quiz Generator",
      description: "Create multiple-choice and short-answer quizzes with instant feedback and explanations",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      href: "/quiz",
    },
    {
      id: "flashcards",
      title: "Flashcard Creator",
      description: "Convert topics into interactive flashcards for active recall practice and spaced repetition",
      icon: Lightbulb,
      color: "from-amber-500 to-orange-500",
      href: "/flashcards",
    },
    {
      id: "dashboard",
      title: "Learning Dashboard",
      description: "Track your progress, identify weak areas, and get personalized study recommendations",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500",
      href: "/dashboard",
    },
    {
      id: "buddy",
      title: "Study Buddy Chat",
      description: "Get conversational Q&A support and explanations for difficult concepts",
      icon: MessageSquare,
      color: "from-indigo-500 to-blue-500",
      href: "/study-buddy",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">StudyAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How it Works
            </a>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-balance">Learn Smarter, Not Harder</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Your AI-powered study companion that simplifies complex knowledge, boosts learning efficiency, and
            personalizes your study experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Learning Now
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Learning Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master any subject with AI-powered assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.id} href={feature.href}>
                <Card
                  className="h-full cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group"
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      Explore <span>→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-card/50 rounded-2xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Simple steps to transform your learning experience</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Upload Content", desc: "Paste your research paper, article, or topic" },
            { step: "2", title: "AI Analysis", desc: "Our AI instantly processes and understands the material" },
            { step: "3", title: "Generate Tools", desc: "Create summaries, quizzes, and flashcards automatically" },
            {
              step: "4",
              title: "Learn & Track",
              desc: "Study with personalized recommendations and progress tracking",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 text-center border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and researchers who are learning smarter with AI-powered study tools.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">StudyAI</span>
              </div>
              <p className="text-sm text-muted-foreground">Learn smarter with AI-powered study tools.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 StudyAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
