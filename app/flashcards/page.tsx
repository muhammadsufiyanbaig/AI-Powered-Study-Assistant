"use client"

import { useState } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Loader2, Shuffle, ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Flashcard {
  id: string
  front: string
  back: string
  status: "new" | "learning" | "learned"
}

interface FlashcardState {
  cards: Flashcard[]
  currentIndex: number
  isFlipped: boolean
  shuffled: boolean
  stats: {
    learned: number
    learning: number
    new: number
  }
}

export default function FlashcardsPage() {
  const [input, setInput] = useState("")
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [deck, setDeck] = useState<FlashcardState | null>(null)
  const { toast } = useToast()

  const handleGenerateFlashcards = async () => {
    if (!input.trim() || !topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a topic and content",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock flashcards
      const mockCards: Flashcard[] = [
        {
          id: "fc1",
          front: "What is a transformer?",
          back: "A transformer is a deep learning architecture based on self-attention mechanisms that processes sequences in parallel, enabling efficient training on large datasets.",
          status: "new",
        },
        {
          id: "fc2",
          front: "What is self-attention?",
          back: "Self-attention is a mechanism that allows each token in a sequence to attend to all other tokens, computing weighted sums based on query-key-value interactions.",
          status: "new",
        },
        {
          id: "fc3",
          front: "What are attention heads?",
          back: "Attention heads are parallel attention mechanisms that allow the model to attend to different representation subspaces simultaneously, improving model expressiveness.",
          status: "new",
        },
        {
          id: "fc4",
          front: "What is positional encoding?",
          back: "Positional encoding adds information about token positions to embeddings, allowing transformers to understand sequence order despite processing all tokens in parallel.",
          status: "new",
        },
        {
          id: "fc5",
          front: "What is the feed-forward network in transformers?",
          back: "The feed-forward network is a two-layer fully connected network applied to each token independently, consisting of a hidden layer with ReLU activation.",
          status: "new",
        },
        {
          id: "fc6",
          front: "What is layer normalization?",
          back: "Layer normalization normalizes activations across features for each sample independently, helping stabilize training and improve model performance.",
          status: "new",
        },
        {
          id: "fc7",
          front: "What is the difference between encoder and decoder?",
          back: "Encoders process the full input sequence with bidirectional attention, while decoders process sequences autoregressively with causal masking to prevent attending to future tokens.",
          status: "new",
        },
        {
          id: "fc8",
          front: "What is causal masking?",
          back: "Causal masking prevents tokens from attending to future tokens during generation, ensuring the model generates sequences one token at a time.",
          status: "new",
        },
      ]

      setDeck({
        cards: mockCards,
        currentIndex: 0,
        isFlipped: false,
        shuffled: false,
        stats: {
          learned: 0,
          learning: 0,
          new: mockCards.length,
        },
      })

      toast({
        title: "Success",
        description: `Created ${mockCards.length} flashcards`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate flashcards",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShuffle = () => {
    if (!deck) return
    const shuffled = [...deck.cards].sort(() => Math.random() - 0.5)
    setDeck({
      ...deck,
      cards: shuffled,
      currentIndex: 0,
      isFlipped: false,
      shuffled: !deck.shuffled,
    })
  }

  const handleFlip = () => {
    if (!deck) return
    setDeck({
      ...deck,
      isFlipped: !deck.isFlipped,
    })
  }

  const handleMarkStatus = (status: "learned" | "learning" | "new") => {
    if (!deck) return

    const currentCard = deck.cards[deck.currentIndex]
    const oldStatus = currentCard.status
    const newCards = [...deck.cards]
    newCards[deck.currentIndex].status = status

    const newStats = { ...deck.stats }
    if (oldStatus !== "new") newStats[oldStatus]--
    newStats[status]++

    const nextIndex = deck.currentIndex < deck.cards.length - 1 ? deck.currentIndex + 1 : 0

    setDeck({
      ...deck,
      cards: newCards,
      currentIndex: nextIndex,
      isFlipped: false,
      stats: newStats,
    })
  }

  const handleNext = () => {
    if (!deck) return
    const nextIndex = deck.currentIndex < deck.cards.length - 1 ? deck.currentIndex + 1 : 0
    setDeck({
      ...deck,
      currentIndex: nextIndex,
      isFlipped: false,
    })
  }

  const handlePrevious = () => {
    if (!deck) return
    const prevIndex = deck.currentIndex > 0 ? deck.currentIndex - 1 : deck.cards.length - 1
    setDeck({
      ...deck,
      currentIndex: prevIndex,
      isFlipped: false,
    })
  }

  const handleReset = () => {
    setDeck(null)
    setInput("")
    setTopic("")
  }

  if (!deck) {
    return (
      <FeatureLayout
        title="Flashcard Creator"
        description="Convert complex topics into interactive flashcards for active recall practice"
      >
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Flashcards</CardTitle>
              <CardDescription>Generate flashcards from your study material</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Topic</label>
                <Input
                  placeholder="e.g., Transformer Architecture, Photosynthesis, World War II"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea
                  placeholder="Paste your study material, notes, or article here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-64 resize-none"
                />
              </div>
              <Button onClick={handleGenerateFlashcards} disabled={loading} className="w-full">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Creating Flashcards..." : "Create Flashcards"}
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Flashcard Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Interactive flip animation for active recall</li>
                <li>• Mark cards as learned, learning, or new</li>
                <li>• Shuffle cards for varied practice</li>
                <li>• Track progress with statistics</li>
                <li>• Spaced repetition support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </FeatureLayout>
    )
  }

  const currentCard = deck.cards[deck.currentIndex]
  const progress = ((deck.currentIndex + 1) / deck.cards.length) * 100

  return (
    <FeatureLayout
      title="Flashcard Creator"
      description="Convert complex topics into interactive flashcards for active recall practice"
    >
      <div className="max-w-2xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{deck.stats.learned}</p>
                <p className="text-sm text-muted-foreground">Learned</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">{deck.stats.learning}</p>
                <p className="text-sm text-muted-foreground">Learning</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{deck.stats.new}</p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Card {deck.currentIndex + 1} of {deck.cards.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="mb-8 cursor-pointer perspective"
          onClick={handleFlip}
          style={{
            perspective: "1000px",
          }}
        >
          <div
            className={`relative w-full h-64 transition-transform duration-500 ${deck.isFlipped ? "scale-x-[-1]" : ""}`}
            style={{
              transformStyle: "preserve-3d",
              transform: deck.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <Card
              className={`absolute w-full h-full flex items-center justify-center cursor-pointer ${
                !deck.isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <CardContent className="text-center p-8">
                <p className="text-sm text-muted-foreground mb-4">Question</p>
                <p className="text-2xl font-semibold">{currentCard.front}</p>
                <p className="text-xs text-muted-foreground mt-8">Click to reveal answer</p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card
              className={`absolute w-full h-full flex items-center justify-center cursor-pointer bg-primary/5 ${
                deck.isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <CardContent className="text-center p-8">
                <p className="text-sm text-muted-foreground mb-4">Answer</p>
                <p className="text-lg leading-relaxed">{currentCard.back}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Button
            variant="outline"
            onClick={() => handleMarkStatus("new")}
            className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            <X className="w-4 h-4 mr-2" />
            New
          </Button>
          <Button
            variant="outline"
            onClick={() => handleMarkStatus("learning")}
            className="border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950"
          >
            Learning
          </Button>
          <Button
            variant="outline"
            onClick={() => handleMarkStatus("learned")}
            className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
          >
            <Check className="w-4 h-4 mr-2" />
            Learned
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 justify-between mb-8">
          <Button variant="outline" onClick={handlePrevious}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button variant="outline" onClick={handleShuffle}>
            <Shuffle className="w-4 h-4 mr-2" />
            {deck.shuffled ? "Unshuffled" : "Shuffle"}
          </Button>

          <Button variant="outline" onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Create New Deck
        </Button>
      </div>
    </FeatureLayout>
  )
}
