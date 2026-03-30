import { Hono } from "hono";
import { cors } from "hono/cors";
import { rateLimiter } from "hono-rate-limiter";
import { reviewCode } from "./core/reviewEngine";

const app = new Hono();

app.use("*", cors());

app.use(
    "*",
    rateLimiter({
        windowMs: 60 * 1000,
        limit: 60,
        keyGenerator: (c) => {
            return c.req.header("x-forwarded-for") ?? "anonymous";
        },
    })
);

app.get("/", (c) => {
    return c.text("AI Code Reviewer API running");
});

app.post("/review", async (c) => {
    try {
        const body = await c.req.json();

        const code = body.code;
        const language = body.language;

        if (!code) {
            return c.json({ error: "Code is required" }, 400);
        }

        if (code.length > 10000) {
            return c.json({ error: "Code too large" }, 400);
        }

        const result = reviewCode(code, language);

        return c.json({ result });
    } catch {
        return c.json({ error: "Invalid JSON body" }, 400);
    }
});

export default app;
export type AppType = typeof app;