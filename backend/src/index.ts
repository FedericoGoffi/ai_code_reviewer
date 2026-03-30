import { Hono } from "hono";
import { reviewCode } from "./services/fakeAI";

const app = new Hono();

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

        const result = reviewCode(code, language);

        return c.json({ result });
    } catch (err) {
        return c.json({ error: "Invalid JSON body" }, 400);
    }
});

export default app;