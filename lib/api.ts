const API_BASE_URL = "https://inference.do-ai.run/v1"
const API_KEY = process.env.NEXT_PUBLIC_MODEL_ACCESS_KEY || process.env.MODEL_ACCESS_KEY

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export async function generateFlashcards(topic: string, content: string): Promise<any> {
  const prompt = `Generate 8 flashcards for the topic "${topic}" based on the following content. Each flashcard should have a question (front) and answer (back). Return ONLY a valid JSON array, no markdown formatting, no code blocks, just the raw JSON.

Content:
${content}

Return format (raw JSON only):
[
  {"front": "Question 1?", "back": "Answer 1"},
  {"front": "Question 2?", "back": "Answer 2"},
  ...
]`

  const response = await callAPI([
    { role: "user", content: prompt }
  ])

  try {
    // Remove markdown code blocks if present
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    console.error("Failed to parse flashcard response:", response)
    throw new Error("Failed to parse flashcard response")
  }
}

export async function generateQuiz(content: string): Promise<any> {
  const prompt = `Generate 5 quiz questions based on the following content. Include both multiple-choice and short-answer questions. For multiple-choice questions, provide 4 options with one correct answer. Return ONLY valid JSON, no markdown formatting, no code blocks.

Content:
${content}

Return format (raw JSON only):
[
  {
    "id": "q1",
    "question": "Question text?",
    "type": "multiple-choice",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Explanation here"
  },
  {
    "id": "q2",
    "question": "Question text?",
    "type": "short-answer",
    "correctAnswer": "Expected answer",
    "explanation": "Explanation here"
  }
]`

  const response = await callAPI([
    { role: "user", content: prompt }
  ])

  try {
    // Remove markdown code blocks if present
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    console.error("Failed to parse quiz response:", response)
    throw new Error("Failed to parse quiz response")
  }
}

export async function generateSummary(content: string): Promise<any> {
  const prompt = `Summarize the following research paper or academic content. Provide a structured summary with the following sections:
- tldr: A one-sentence summary
- detailed: A detailed paragraph summary
- keyPoints: Array of 5 key points
- methodology: Summary of the methodology
- conclusions: Key conclusions

Content:
${content}

Return ONLY valid JSON object, no markdown formatting, no code blocks. Just raw JSON with the above properties.`

  const response = await callAPI([
    { role: "user", content: prompt }
  ])

  try {
    // Remove markdown code blocks if present
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    console.error("Failed to parse summary response:", response)
    throw new Error("Failed to parse summary response")
  }
}

export async function chatWithStudyBuddy(messages: ChatMessage[]): Promise<string> {
  const systemMessage: ChatMessage = {
    role: "system",
    content: "You are a helpful study buddy assistant. Help students understand difficult concepts, answer questions about their studies, and provide clear explanations. Be encouraging, patient, and focus on educational value."
  }

  const response = await callAPI([systemMessage, ...messages])
  return response
}

async function callAPI(messages: ChatMessage[]): Promise<string> {
  if (!API_KEY) {
    throw new Error("API key not found")
  }

  const request: ChatCompletionRequest = {
    model: "openai-gpt-4o", // Updated to use the full model ID available on the API
    messages,
    temperature: 0.7,
    max_tokens: 2000
  }

  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data: ChatCompletionResponse = await response.json()
    return data.choices[0]?.message?.content || ""
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

export async function getAvailableModels() {
  if (!API_KEY) {
    throw new Error("API key not found")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/models`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch models:", error)
    throw error
  }
}