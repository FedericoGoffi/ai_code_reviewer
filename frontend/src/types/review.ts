export type IssueSeverity = "low" | "medium" | "high"

export type IssueCategory =
    | "security"
    | "performance"
    | "readability"
    | "best-practices"

export interface Issue {
    message: string
    severity: IssueSeverity
    category: IssueCategory
}

export interface ReviewResult {
    language: string
    score: number
    summary: string
    categories: {
        readability: number
        security: number
        performance: number
        "best-practices": number
    }
    issues: Issue[]
}

export interface ReviewResponse {
    result: ReviewResult
}