"use client"

import { useState, useRef, useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send, Lightbulb, BookOpen, HelpCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function StudyBuddyPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your Study Buddy. I'm here to help you understand difficult concepts, answer questions, and provide explanations. What would you like to learn about today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock responses based on keywords
      let response = ""
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("transformer")) {
        response =
          "A transformer is a deep learning architecture introduced in the paper 'Attention is All You Need'. It uses self-attention mechanisms to process sequences in parallel, making it much faster than RNNs. The key innovation is the attention mechanism, which allows each token to attend to all other tokens in the sequence. This enables the model to capture long-range dependencies effectively. Transformers have become the foundation for modern NLP models like BERT, GPT, and T5."
      } else if (lowerInput.includes("attention")) {
        response =
          "Attention is a mechanism that allows the model to focus on different parts of the input when processing each token. It works by computing attention weights based on the similarity between queries and keys, then using these weights to create a weighted sum of values. This allows the model to dynamically focus on relevant information. Multi-head attention extends this by running multiple attention operations in parallel, allowing the model to attend to different representation subspaces."
      } else if (lowerInput.includes("how")) {
        response =
          "Great question! To help you better, could you be more specific? For example, you could ask 'How does backpropagation work?' or 'How do I implement a neural network?' I'm here to explain any concept in simple terms."
      } else if (lowerInput.includes("explain")) {
        response =
          "I'd be happy to explain! Could you tell me which concept you'd like me to explain? For example, you could ask about neural networks, machine learning algorithms, data structures, or any other topic you're studying."
      } else {
        response =
          "That's an interesting question! Let me break it down for you: The key to understanding this concept is to think about it in terms of its core components. First, consider the fundamental principles. Second, look at how these principles interact. Finally, practice applying these concepts to real-world examples. Would you like me to dive deeper into any specific aspect?"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const suggestedQuestions = [
    "Explain transformers in simple terms",
    "How does attention work?",
    "What is backpropagation?",
    "Explain neural networks",
  ]

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <FeatureLayout
      title="Study Buddy Chat"
      description="Get conversational Q&A support and explanations for difficult concepts"
    >
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 1 && (
              <div className="space-y-4 mb-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-accent" />
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">Welcome to Study Buddy</h3>
                  <p className="text-muted-foreground max-w-md">
                    Ask me anything about your studies. I'm here to explain concepts, answer questions, and help you
                    learn better.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-3">Suggested questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left text-sm p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <Input
                placeholder="Ask me anything about your studies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleSendMessage()
                  }
                }}
                disabled={loading}
              />
              <Button onClick={handleSendMessage} disabled={loading || !input.trim()} size="icon">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Press Enter to send or click the send button. Study Buddy is here to help you learn!
            </p>
          </div>
        </Card>
      </div>
    </FeatureLayout>
  )
}
