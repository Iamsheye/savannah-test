# Aryon Test

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- Vitest + Testing Library
- Zod
- React Hook Form
- Prettier & ESlint

## Prerequisites

- Node.js
- Bun (recommended) or any other package manager (npm/yarn/pnpm)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Iamsheye/savannah-test.git
cd savannah-test
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory with the following variables:

```bash
VITE_API_URL=http://localhost:3001
```

4. Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`

## Testing

The project uses Vitest and Testing Library for testing. Run the test suite with:

```bash
bun run test
```

For coverage report:

```bash
bun run test:cov
```

Coverage reports will be generated in the `coverage` directory.
