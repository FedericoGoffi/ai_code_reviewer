import { reviewCode } from "./services/api"
import type { ReviewResult } from "./types/review"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {

  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")

  const [result, setResult] = useState<ReviewResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!code.trim()) return

    try {
      setLoading(true)
      setError(null)
      setResult(null)

      const data = await reviewCode(code, language)
      setResult(data.result)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">

        <Card>
          <CardHeader>
            <CardTitle>AI Code Reviewer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger>
                <SelectValue placeholder="Select programming language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-50"
            />

            <Button onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Code"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Score: {result.score}/100</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p><strong>Language:</strong> {result.language}</p>
              <p>{result.summary}</p>

              <div>
                <h3 className="font-semibold mb-2">Issues:</h3>
                {result.issues.length === 0 && <p>No issues found</p>}

                {result.issues.map((issue, i) => (
                  <div key={i} className="border p-2 rounded">
                    <p className="font-medium">{issue.message}</p>
                    <p className="text-sm opacity-70">
                      {issue.category} • {issue.severity}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}

export default App