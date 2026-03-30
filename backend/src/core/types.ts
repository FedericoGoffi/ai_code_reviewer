export type IssueSeverity = "info" | "warning" | "error";

export type IssueCategory =
    | "readability"
    | "security"
    | "performance"
    | "best-practices";

export interface Issue {
    message: string;
    severity: IssueSeverity;
    category: IssueCategory;
}

export interface ReviewResult {
    language: string;
    score: number;
    summary: string;
    categories: Record<IssueCategory, number>;
    issues: Issue[];
}