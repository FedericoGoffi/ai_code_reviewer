import type { Issue } from "../core/types";

export function reviewPython(code: string, issues: Issue[]) {

    if (/os\.system\(/.test(code)) {
        issues.push({
            message: "Possible command injection via os.system.",
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

    if (/print\(/.test(code)) {
        issues.push({
            message: "Avoid print statements in production.",
            severity: "info",
            category: "readability"
        });
    }

    if (/except:\s*\n/.test(code)) {
        issues.push({
            message: "Bare except detected.",
            severity: "warning",
            category: "best-practices"
        });
    }

    if (/from .* import \*/.test(code)) {
        issues.push({
            message: "Avoid wildcard imports.",
            severity: "warning",
            category: "best-practices"
        });
    }
}