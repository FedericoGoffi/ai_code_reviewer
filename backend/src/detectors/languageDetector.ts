export function detectLanguage(code: string): string {
    const snippet = code.toLowerCase();

    if (
        snippet.includes("console.log") ||
        snippet.includes("=>") ||
        snippet.includes("var ") ||
        snippet.includes("let ") ||
        snippet.includes("const ")
    ) {
        if (snippet.includes(": string") || snippet.includes(": number")) {
            return "typescript";
        }
        return "javascript";
    }

    if (
        snippet.includes("def ") ||
        snippet.includes("print(") ||
        snippet.includes("import ")
    ) {
        return "python";
    }

    if (
        snippet.includes("public class") ||
        snippet.includes("system.out.println")
    ) {
        return "java";
    }

    if (
        snippet.includes("using system") ||
        snippet.includes("console.writeline")
    ) {
        return "csharp";
    }

    return "unknown";
}