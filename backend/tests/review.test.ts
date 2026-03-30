import { describe, it, expect } from "vitest";
import app, { type AppType } from "../src/app.ts";
import { testClient } from "hono/testing";

const client = testClient<AppType>(app);

describe("API Code Reviewer", () => {

    it("GET / should return API running message", async () => {
        const res = await client.index.$get();

        expect(res.status).toBe(200);
        const text = await res.text();
        expect(text).toContain("AI Code Reviewer API running");
    });

    it("POST /review should analyze code", async () => {
        const res = await client.review.$post({
            json: {
                code: "const a = 1",
                language: "ts"
            }
        });

        expect(res.status).toBe(200);

        const body = await res.json();

        if ("error" in body) {
            throw new Error("API returned error: " + body.error);
        }

        expect(body.result).toBeDefined();
        expect(body.result.score).toBeGreaterThan(0);
        expect(body.result.language).toBeDefined();
    });

    it("POST /review should return 400 if no code", async () => {
        const res = await client.review.$post({
            json: {
                language: "ts"
            }
        });

        expect(res.status).toBe(400);

        const body = await res.json();

        expect("error" in body).toBe(true);
    });

});