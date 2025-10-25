"use client"

import { useState } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SummaryResult {
  tldr: string
  detailed: string
  keyPoints: string[]
  methodology: string
  conclusions: string
}

export default function SummarizerPage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<SummaryResult | null>(null)
  const [activeTab, setActiveTab] = useState("tldr")
  const { toast } = useToast()

  const handleSummarize = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content to summarize",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call - in production, this would call your AI backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock response
      setSummary({
        tldr: "This research explores advanced machine learning techniques for natural language processing, demonstrating significant improvements in model accuracy and efficiency through novel architectural innovations.",
        detailed:
          "The paper presents a comprehensive study of transformer-based architectures applied to NLP tasks. The authors introduce a new attention mechanism that reduces computational complexity while maintaining or improving accuracy. Their methodology involves training on multiple datasets and comparing against state-of-the-art baselines. Results show a 15% improvement in processing speed and 8% improvement in accuracy metrics.",
        keyPoints: [
          "Novel attention mechanism reduces computational complexity",
          "15% improvement in processing speed achieved",
          "8% improvement in accuracy metrics",
          "Tested on multiple benchmark datasets",
          "Scalable to larger models and datasets",
        ],
        methodology:
          "The research employed a comparative analysis approach, training transformer models with the proposed attention mechanism on standard NLP benchmarks including GLUE and SuperGLUE. The team used cross-validation techniques and statistical significance testing to validate results.",
        conclusions:
          "The proposed attention mechanism offers a promising direction for efficient NLP models. Future work should explore applications to other domains and investigate further optimizations for edge deployment.",
      })

      toast({
        title: "Success",
        description: "Content summarized successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to summarize content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Summary copied to clipboard",
    })
  }

  const handleDownload = () => {
    if (!summary) return

    const content = `
RESEARCH PAPER SUMMARY
======================

TL;DR:
${summary.tldr}

KEY POINTS:
${summary.keyPoints.map((point) => `• ${point}`).join("\n")}

METHODOLOGY:
${summary.methodology}

DETAILED SUMMARY:
${summary.detailed}

CONCLUSIONS:
${summary.conclusions}
    `.trim()

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", "summary.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Downloaded",
      description: "Summary downloaded as text file",
    })
  }

  return (
    <FeatureLayout
      title="Research Paper Summarizer"
      description="Upload or paste academic papers and get instant summaries with key points, methodology, and conclusions"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paste Your Content</CardTitle>
              <CardDescription>Enter a research paper, article, or any academic text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your research paper, article, or academic text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-96 resize-none"
              />
              <Button onClick={handleSummarize} disabled={loading} className="w-full">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Summarizing..." : "Summarize Content"}
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use clear, well-structured academic text</li>
                <li>• Include abstracts and conclusions for better summaries</li>
                <li>• Longer content (500+ words) produces better results</li>
                <li>• Technical papers work best with domain-specific content</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div>
          {summary ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Summary Results</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(summary[activeTab as keyof SummaryResult] as string)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDownload}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tldr">TL;DR</TabsTrigger>
                    <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
                    <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tldr" className="space-y-4 mt-4">
                    <p className="text-sm leading-relaxed">{summary.tldr}</p>
                  </TabsContent>

                  <TabsContent value="keyPoints" className="space-y-4 mt-4">
                    <ul className="space-y-3">
                      {summary.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-primary font-semibold flex-shrink-0">•</span>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="detailed" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Methodology</h4>
                        <p className="text-sm text-muted-foreground">{summary.methodology}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Summary</h4>
                        <p className="text-sm text-muted-foreground">{summary.detailed}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Conclusions</h4>
                        <p className="text-sm text-muted-foreground">{summary.conclusions}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-96">
              <CardContent className="text-center">
                <p className="text-muted-foreground">Paste content and click "Summarize" to see results here</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </FeatureLayout>
  )
}
