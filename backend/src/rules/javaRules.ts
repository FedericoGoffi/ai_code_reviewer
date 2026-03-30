import type { Issue } from "../core/types";

export function reviewJava(code: string, issues: Issue[]) {

    if (/SELECT .*"\s*\+/.test(code) || /Statement/.test(code)) {
        issues.push({
            message: "Possible SQL Injection. Use PreparedStatement.",
            severity: "error",
            category: "security"
        });
    }

    if (/password\s*=/.test(code)) {
        issues.push({
            message: "Hardcoded password detected.",
            severity: "error",
            category: "security"
        });
    }

    if (/System\.out\.println/.test(code)) {
        issues.push({
            message: "Avoid System.out.println in production.",
            severity: "info",
            category: "readability"
        });
    }

    if (/Connection/.test(code) && !/close\(\)/.test(code)) {
        issues.push({
            message: "Database connection not closed.",
            severity: "warning",
            category: "performance"
        });
    }

    if (/catch\s*\(\s*Exception.*\)\s*{\s*}/.test(code)) {
        issues.push({
            message: "Empty catch block.",
            severity: "warning",
            category: "best-practices"
        });
    }
}