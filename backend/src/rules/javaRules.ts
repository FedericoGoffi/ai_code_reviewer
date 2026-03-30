import type { Issue } from "../core/types";

export function reviewJava(code: string, issues: Issue[]) {
    if (code.includes("System.out.println")) {
        issues.push({
            message: "Avoid System.out.println in production code.",
            severity: "info",
            category: "readability",
        });
    }

    if (code.includes("== null")) {
        issues.push({
            message: "Consider using Objects.isNull().",
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