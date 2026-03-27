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
  const [result, setResult] = useState("")

  const handleAnalyze = () => {
    setResult("Analyzing code...")
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

            <Button onClick={handleAnalyze}>
              Analyze
            </Button>

          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result}</p>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}

export default App