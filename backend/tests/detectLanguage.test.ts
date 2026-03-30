import { describe, test, expect } from "vitest";
import { detectLanguage } from '../src/detectors/languageDetector';

describe("LanguageDetector", () => {

    test("detects JavaScript", () => {
        const code = "const sum = (a, b) => a + b; console.log(sum(2,3));";
        expect(detectLanguage(code)).toBe("javascript");
    });

    test("detects TypeScript", () => {
        const code = "const name: string = 'Federico';";
        expect(detectLanguage(code)).toBe("typescript");
    });

    test("detects Python", () => {
        const code = "def hello(): print('hi')";
        expect(detectLanguage(code)).toBe("python");
    });

    test("detects Java", () => {
        const code = "public class Test { System.out.println('hi'); }";
        expect(detectLanguage(code)).toBe("java");
    });

    test("detects C#", () => {
        const code = "using System; Console.WriteLine('hi');";
        expect(detectLanguage(code)).toBe("csharp");
    });

    test("returns unknown for unsupported language", () => {
        const code = "<h1>Hello world</h1>";
        expect(detectLanguage(code)).toBe("unknown");
    });

    test("is case insensitive", () => {
        const code = "CONSOLE.LOG('HELLO')";
        expect(detectLanguage(code)).toBe("javascript");
    });

});