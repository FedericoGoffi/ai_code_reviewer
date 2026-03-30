export function reviewJavaScript(code: string, issues: string[]) {
    if (code.includes("var ")) {
        issues.push("Use 'let' or 'const' instead of 'var'.");
    }

    if (code.includes("==")) {
        issues.push("Use strict equality (===) instead of ==.");
    }

    if (code.includes("console.log")) {
        issues.push("Remove console.log statements from production code.");
    }

    if (!code.includes("try") && code.includes("async")) {
        issues.push("Consider adding error handling with try/catch.");
    }
}