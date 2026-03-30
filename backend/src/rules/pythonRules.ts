import type { Issue } from "../core/types";

export function reviewPython(code: string, issues: Issue[]) {
    if (code.includes("print(")) {
        issues.push({
            message: "Avoid print statements in production code.",
            severity: "info",
            category: "readability",
        });
    }

    if (code.includes("== None")) {
        issues.push({
            message: "Use 'is None' instead of '== None'.",
            severity: "warning",
            category: "best-practices",
        });
    }

    if (code.length < 50) {
        issues.push({
            message: "Code snippet is too short for a deep review.",
            severity: "error",
            category: "readability",
        });
    }
}