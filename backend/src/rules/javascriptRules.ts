import type { Issue } from "../core/types";

export function reviewJavaScript(code: string, issues: Issue[]) {
    if (code.includes("var ")) {
        issues.push({
            message: "Use 'let' or 'const' instead of 'var'.",
            severity: "warning",
            category: "best-practices",
        });
    }

    if (code.includes("console.log")) {
        issues.push({
            message: "Remove console.log statements from production code.",
            severity: "info",
            category: "readability",
        });
    }

    if (code.includes("==")) {
        issues.push({
            message: "Use strict equality (===) instead of ==.",
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