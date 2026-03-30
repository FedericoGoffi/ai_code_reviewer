export function reviewPython(code: string, issues: string[]) {
    if (code.includes("print(")) {
        issues.push("Avoid using print statements in production code.");
    }

    if (code.includes("== True") || code.includes("== False")) {
        issues.push("Avoid comparing to True/False explicitly.");
    }

    if (!code.includes("try:")) {
        issues.push("Consider adding exception handling.");
    }
}