import type { Issue, IssueCategory, IssueSeverity } from "./types";

const severityWeight: Record<IssueSeverity, number> = {
    info: 1,
    warning: 3,
    error: 7,
};

export function calculateScore(issues: Issue[]): number {
    if (issues.length === 0) return 100;

    let penalty = 0;

    for (const issue of issues) {
        penalty += severityWeight[issue.severity];
    }

    return Math.max(0, 100 - penalty);
}

export function calculateCategories(
    issues: Issue[]
): Record<IssueCategory, number> {
    const categories: Record<IssueCategory, number> = {
        readability: 0,
        security: 0,
        performance: 0,
        "best-practices": 0,
    };

    for (const issue of issues) {
        categories[issue.category]++;
    }

    return categories;
}