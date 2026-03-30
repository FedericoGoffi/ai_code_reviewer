import { detectLanguage } from "./languageDetector";
import { reviewJavaScript } from "./rules/javascriptRules";
import { reviewPython } from "./rules/pythonRules";
import { reviewJava } from "./rules/javaRules";

export function reviewCode(code: string, providedLanguage?: string) {
    const issues: string[] = [];

    const language = providedLanguage || detectLanguage(code);

    const languageLabel = providedLanguage
        ? "Selected language"
        : "Detected language";

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

        default:
            issues.push("Language not fully supported yet.");
    }

    const score = Math.max(100 - issues.length * 5, 60);

    return `
AI Code Review Report

${languageLabel}: ${language}

Score: ${score}/100

Issues found:
${issues.map(i => `• ${i}`).join("\n")}
`;
}