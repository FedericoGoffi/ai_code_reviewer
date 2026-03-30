import type { ReviewResponse } from '../types/review.ts';

const API_URL = "http://localhost:3000"

export async function reviewCode(
    code: string,
    language?: string
): Promise<ReviewResponse> {

    const res = await fetch(`${API_URL}/review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language }),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Server error")
    }

    return res.json()
}