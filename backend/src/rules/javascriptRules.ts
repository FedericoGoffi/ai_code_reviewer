import type { Issue } from "../core/types";

export function reviewJavaScript(code: string, issues: Issue[]) {

    if (/\bvar\b/.test(code)) {
        issues.push({
            message: "Avoid using 'var'. Use let/const.",
            severity: "warning",
            category: "best-practices"
        });
    }

    if (/console\.log/.test(code)) {
        issues.push({
            message: "Remove console.log from production code.",
            severity: "info",
            category: "readability"
        });
    }

    if (/innerHTML\s*=/.test(code)) {
        issues.push({
            message: "Possible XSS vulnerability using innerHTML.",
            severity: "error",
            category: "security"
        });
    }

    if (/eval\(/.test(code)) {
        issues.push({
            message: "Avoid using eval(). Security risk.",
            severity: "error",
            category: "security"
        });
    }

    if (/fetch\(/.test(code) && !/try\s*{[\s\S]*fetch\(/.test(code)) {
        issues.push({
            message: "Fetch without error handling.",
            severity: "warning",
            category: "security"
        });
    }

    if (/async\s+function/.test(code) && !/try\s*{/.test(code)) {
        issues.push({
            message: "Async function without try/catch.",
            severity: "warning",
            category: "best-practices"
        });
    }

    if (code.split("\n").length > 80) {
        issues.push({
            message: "File too long. Consider splitting into smaller modules.",
            severity: "info",
            category: "readability"
        });
    }

    if (/apiKey|password|secret/i.test(code)) {
        issues.push({
            message: "Possible hardcoded secret detected.",
            severity: "error",
            category: "security"
        });
    }
}