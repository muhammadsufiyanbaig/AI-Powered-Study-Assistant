"use client"

import { useState } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuizQuestion {
  id: string
  question: string
  type: "multiple-choice" | "short-answer"
  options?: string[]
  correctAnswer: string
  explanation: string
}

interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  answers: Record<string, string>
  submitted: boolean
}

export default function QuizPage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const { toast } = useToast()

  const handleGenerateQuiz = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to generate a quiz",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock quiz questions
      const mockQuestions: QuizQuestion[] = [
        {
          id: "q1",
          question: "What is the primary advantage of transformer architectures in NLP?",
          type: "multiple-choice",
          options: [
            "They process sequences sequentially",
            "They use parallel processing with attention mechanisms",
            "They require less memory than RNNs",
            "They are easier to implement",
          ],
          correctAnswer: "They use parallel processing with attention mechanisms",
          explanation:
            "Transformers use self-attention mechanisms that allow parallel processing of sequences, making them much faster than sequential models like RNNs.",
        },
        {
          id: "q2",
          question: "Explain how the attention mechanism works in transformers.",
          type: "short-answer",
          correctAnswer:
            "The attention mechanism computes weighted sums of values based on query-key similarities, allowing the model to focus on relevant parts of the input.",
          explanation:
            "The attention mechanism calculates attention weights by comparing queries with keys, then uses these weights to create a weighted sum of values. This allows the model to dynamically focus on different parts of the input.",
        },
        {
          id: "q3",
          question: "Which of the following is NOT a component of the transformer architecture?",
          type: "multiple-choice",
          options: ["Multi-head attention", "Feed-forward networks", "Recurrent connections", "Positional encoding"],
          correctAnswer: "Recurrent connections",
          explanation:
            "Transformers do not use recurrent connections. They rely entirely on attention mechanisms and feed-forward networks, which is why they can process sequences in parallel.",
        },
        {
          id: "q4",
          question: "What is the purpose of positional encoding in transformers?",
          type: "short-answer",
          correctAnswer:
            "Positional encoding provides information about the position of tokens in the sequence, since transformers process all tokens in parallel.",
          explanation:
            "Since transformers process all tokens simultaneously (unlike RNNs), they need positional encoding to understand the order of tokens in the sequence.",
        },
        {
          id: "q5",
          question: "How many attention heads are typically used in modern transformer models?",
          type: "multiple-choice",
          options: ["2-4 heads", "8-16 heads", "32-64 heads", "128+ heads"],
          correctAnswer: "8-16 heads",
          explanation:
            "Most modern transformers like BERT and GPT use 8-16 attention heads. This allows the model to attend to different representation subspaces simultaneously.",
        },
      ]

      setQuiz({
        questions: mockQuestions,
        currentIndex: 0,
        answers: {},
        submitted: false,
      })

      toast({
        title: "Success",
        description: "Quiz generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate quiz",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (answer: string) => {
    if (!quiz) return
    setQuiz({
      ...quiz,
      answers: {
        ...quiz.answers,
        [quiz.questions[quiz.currentIndex].id]: answer,
      },
    })
  }

  const handleNext = () => {
    if (!quiz) return
    if (quiz.currentIndex < quiz.questions.length - 1) {
      setQuiz({
        ...quiz,
        currentIndex: quiz.currentIndex + 1,
      })
    }
  }

  const handlePrevious = () => {
    if (!quiz) return
    if (quiz.currentIndex > 0) {
      setQuiz({
        ...quiz,
        currentIndex: quiz.currentIndex - 1,
      })
    }
  }

  const handleSubmit = () => {
    if (!quiz) return
    setQuiz({
      ...quiz,
      submitted: true,
    })
  }

  const handleReset = () => {
    setQuiz(null)
    setInput("")
  }

  if (!quiz) {
    return (
      <FeatureLayout
        title="Smart Quiz Generator"
        description="Create multiple-choice and short-answer quizzes with instant feedback and explanations"
      >
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Generate a Quiz</CardTitle>
              <CardDescription>Paste content to automatically generate quiz questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your study material, article, or notes here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-96 resize-none"
              />
              <Button onClick={handleGenerateQuiz} disabled={loading} className="w-full">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Generating Quiz..." : "Generate Quiz"}
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Quiz Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multiple-choice and short-answer questions</li>
                <li>• Instant feedback with detailed explanations</li>
                <li>• Tests conceptual understanding, not just memorization</li>
                <li>• Progress tracking through the quiz</li>
                <li>• Review answers before final submission</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </FeatureLayout>
    )
  }

  const currentQuestion = quiz.questions[quiz.currentIndex]
  const currentAnswer = quiz.answers[currentQuestion.id] || ""
  const isAnswered = currentAnswer.length > 0
  const isCorrect = currentAnswer === currentQuestion.correctAnswer

  return (
    <FeatureLayout
      title="Smart Quiz Generator"
      description="Create multiple-choice and short-answer quizzes with instant feedback and explanations"
    >
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Question {quiz.currentIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-muted-foreground">{Object.keys(quiz.answers).length} answered</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${((quiz.currentIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion.type === "multiple-choice" ? (
              <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <Textarea
                placeholder="Type your answer here..."
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="min-h-32 resize-none"
              />
            )}

            {/* Feedback Section */}
            {quiz.submitted && isAnswered && (
              <div
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                }`}
              >
                <div className="flex gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`font-semibold ${isCorrect ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"}`}
                    >
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    <p
                      className={`text-sm mt-1 ${isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
                    >
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={quiz.currentIndex === 0}>
            Previous
          </Button>

          <div className="flex gap-3">
            {!quiz.submitted ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={quiz.currentIndex === quiz.questions.length - 1}
                >
                  Next
                </Button>
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                  Submit Quiz
                </Button>
              </>
            ) : (
              <Button onClick={handleReset} className="bg-primary hover:bg-primary/90">
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
          <p className="text-sm font-medium mb-3">Questions</p>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setQuiz({ ...quiz, currentIndex: idx })}
                className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                  idx === quiz.currentIndex
                    ? "bg-primary text-primary-foreground"
                    : quiz.answers[q.id]
                      ? "bg-secondary text-foreground hover:bg-secondary/80"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FeatureLayout>
  )
}
