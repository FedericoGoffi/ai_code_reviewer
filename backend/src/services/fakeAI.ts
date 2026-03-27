type ReviewResult = {
    summary: string;
    score: number;
    categories: {
        readability: number;
        performance: number;
        security: number;
        bestPractices: number;
    };
    issues: string[];
};

function analyzeReadability(code: string, issues: string[]) {
    let score = 100;

    if (code.includes("var ")) {
        issues.push("Use 'let' or 'const' instead of 'var'.");
        score -= 15;
    }

    if (code.includes("console.log")) {
        issues.push("Remove console.log statements from production code.");
        score -= 10;
    }

    if (code.length < 50) {
        issues.push("Code snippet is too short for a deep review.");
        score -= 5;
    }

    return Math.max(score, 0);
}

function analyzeSecurity(code: string, issues: string[]) {
    let score = 100;

    if (code.includes("eval(")) {
        issues.push("Avoid using eval() due to security risks.");
        score -= 40;
    }

    if (code.includes("innerHTML")) {
        issues.push("Using innerHTML can expose your app to XSS attacks.");
        score -= 25;
    }

    if (code.includes("password")) {
        issues.push("Sensitive data detected. Avoid hardcoding secrets.");
        score -= 20;
    }

    return Math.max(score, 0);
}

function analyzePerformance(code: string, issues: string[]) {
    let score = 100;

    if (code.includes("for (") && code.includes("await")) {
        issues.push("Avoid using await inside loops. Use Promise.all().");
        score -= 25;
    }

    if (code.includes("setTimeout(")) {
        issues.push("Excessive use of setTimeout may affect performance.");
        score -= 10;
    }

    return Math.max(score, 0);
}

function analyzeBestPractices(code: string, issues: string[]) {
    let score = 100;

    if (code.includes("== ")) {
        issues.push("Use strict equality (===) instead of ==.");
        score -= 10;
    }

    if (!code.includes("try") && code.includes("async")) {
        issues.push("Async functions should include try/catch error handling.");
        score -= 20;
    }

    if (!code.includes("export")) {
        issues.push("Consider modularizing your code using exports.");
        score -= 5;
    }

    return Math.max(score, 0);
}

function generateSummary(score: number) {
    if (score > 90) return "Excellent code quality with minor improvements suggested.";
    if (score > 75) return "Good code overall, but there are several areas to improve.";
    if (score > 60) return "Average quality. Refactoring recommended.";
    return "Poor code quality. Significant refactoring required.";
}

export function reviewCode(code: string): string {
    const issues: string[] = [];

    const readability = analyzeReadability(code, issues);
    const security = analyzeSecurity(code, issues);
    const performance = analyzePerformance(code, issues);
    const bestPractices = analyzeBestPractices(code, issues);

    const finalScore = Math.round(
        (readability + security + performance + bestPractices) / 4
    );

    const summary = generateSummary(finalScore);

    return `
AI Code Review Report

Score: ${finalScore}/100

Category scores:
• Readability: ${readability}/100
• Security: ${security}/100
• Performance: ${performance}/100
• Best Practices: ${bestPractices}/100

Summary:
${summary}

Issues found:
${issues.length ? issues.map(i => `• ${i}`).join("\n") : "No major issues detected. Great job!"}
`;
}