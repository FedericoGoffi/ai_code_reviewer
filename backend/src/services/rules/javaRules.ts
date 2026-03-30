export function reviewJava(code: string, issues: string[]) {
    if (code.includes("System.out.println")) {
        issues.push("Avoid System.out.println in production.");
    }

    if (!code.includes("try")) {
        issues.push("Consider adding exception handling.");
    }
}