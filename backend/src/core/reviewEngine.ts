import { detectLanguage } from "../detectors/languageDetector";
import { reviewJavaScript } from "../rules/javascriptRules";
import { reviewPython } from "../rules/pythonRules";
import { reviewJava } from "../rules/javaRules";
import { calculateScore, calculateCategories } from "./scoringEngine";
import type { Issue, ReviewResult } from "./types";

export function reviewCode(code: string, providedLanguage?: string): ReviewResult {
    const issues: Issue[] = [];
    const language = providedLanguage || detectLanguage(code);

    switch (language) {
        case "javascript":
        case "typescript":
            reviewJavaScript(code, issues);
            break;
        case "python":
            reviewPython(code, issues);
            break;
        case "java":
            reviewJava(code, issues);
            break;
    }

    const score = calculateScore(issues);
    const categories = calculateCategories(issues);

    return {
        language,
        score,
        summary:
            issues.length === 0
                ? "Great job! No major issues found."
                : "Code looks good but improvements are recommended.",
        categories,
        issues,
    };
}