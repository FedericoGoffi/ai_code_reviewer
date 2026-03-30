import { describe, it, expect } from "vitest";
import { reviewCode } from "../src/core/reviewEngine";

describe("Review Engine", () => {
    it("detects JavaScript issues", () => {
        const result = reviewCode("var x = 5; console.log(x)", "javascript");

        expect(result.issues.length).toBeGreaterThan(0);
        expect(result.language).toBe("javascript");
    });

    it("auto detects Python", () => {
        const result = reviewCode("print('hello world')");

        expect(result.language).toBe("python");
    });
});