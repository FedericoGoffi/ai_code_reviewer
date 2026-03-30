# AI Code Reviewer

Full-stack web application that analyzes source code and detects potential bugs, security issues, and bad practices across multiple programming languages.

> Built as a portfolio piece to demonstrate full-stack development, API design, and static code analysis logic.

---

## Tech Stack

### Frontend

| Tool | Version |
|------|---------|
| [React](https://react.dev/) | ^19 |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9 |
| [Vite](https://vite.dev/) | ^8 |
| [TailwindCSS](https://tailwindcss.com/) | ^4 |
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | latest |
| [Lucide React](https://lucide.dev/) | ^1.7 |
| [Bun](https://bun.sh/) | runtime |

### Backend

| Tool | Version |
|------|---------|
| [Hono](https://hono.dev/) | ^4 |
| [TypeScript](https://www.typescriptlang.org/) | ^5 |
| [hono-rate-limiter](https://github.com/rhinobase/hono-rate-limiter) | ^0.5 |
| [Vitest](https://vitest.dev/) | ^4 |
| [Bun](https://bun.sh/) | runtime |

---

## Project Structure

```
ai_code_reviewer/
├── backend/
│   ├── src/
│   │   └── server.ts        # Hono server entry point
│   └── package.json
├── frontend/
│   ├── src/                 # React components & pages
│   └── package.json
└── .github/
    └── workflows/           # CI/CD pipelines
```

---

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### 1. Clone the repository

```bash
git clone https://github.com/FedericoGoffi/ai_code_reviewer
cd ai_code_reviewer
```

### 2. Backend setup

```bash
cd backend
bun install
bun run dev
```

Server runs at: `http://localhost:3000`

### 3. Frontend setup

```bash
cd frontend
bun install
bun run dev
```

App runs at: `http://localhost:5173`

---

## Running Tests

From the `backend` directory:

```bash
# Run tests once
bun run test

# Run tests in watch mode
bun run test:watch

# Generate coverage report
bun run coverage
```

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/review` | Submit code for analysis |

> Rate limiting is enabled on all endpoints to prevent abuse.

---

## License

MIT
