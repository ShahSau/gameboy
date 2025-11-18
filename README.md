# Welcome to Gameboy

## Features

- 🎮 Browse and discover games
- 🔍 Advanced search with filters (category, platform, tags)
- 📊 Insights dashboard with analytics
- ⭐ Favorites management
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🌙 Dark mode support

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Routing:** React Router
- **State Management:** React Query
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Testing:** Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start dev server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

### Testing

#### Unit Tests (Vitest)

```bash
# Run all tests
npm run test
# or
bun test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

#### E2E Tests (Cypress)

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Run specific test file
npm run cypress:run -- --spec "cypress/e2e/search.cy.ts"
```

### Build

```bash
# Build for production
npm run build
# or
bun run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── skeletons/      # Loading skeletons
│   └── __tests__/      # Component tests
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── GameDetails.tsx
│   ├── Insights.tsx
│   └── Favorites.tsx
├── lib/                # Utility functions
│   └── __tests__/      # Utility tests
├── hooks/              # Custom React hooks
└── test/               # Test setup and utilities
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run cypress:open` - Open Cypress Test Runner
- `npm run cypress:run` - Run Cypress E2E tests headlessly

## Testing

This project uses two testing approaches:

### Unit Testing (Vitest + React Testing Library)

For testing individual components and utility functions in isolation.

### Test Files Created

- `src/components/__tests__/GameCard.test.tsx` - GameCard component tests
- `src/components/__tests__/SearchBar.test.tsx` - SearchBar component tests
- `src/components/__tests__/Header.test.tsx` - Header component tests
- `src/lib/__tests__/utils.test.ts` - Utility function tests

### E2E Testing (Cypress)

For testing complete user flows and interactions across the entire application.

**Test Files:**
- `cypress/e2e/navigation.cy.ts` - Navigation and routing tests
- `cypress/e2e/home.cy.ts` - Home page functionality tests
- `cypress/e2e/search.cy.ts` - Search and filtering tests
- `cypress/e2e/game-details.cy.ts` - Game details page tests
- `cypress/e2e/insights.cy.ts` - Insights dashboard tests

### Running Tests

**Unit Tests:**

```bash
# Run all tests once
npm test

# Watch mode (re-runs tests on file changes)
npm run test:watch

# UI mode (interactive test runner)
npm run test:ui

# Coverage report
npm run test:coverage
```

**E2E Tests:**

```bash
# Open Cypress Test Runner (interactive mode)
npm run cypress:open

# Run all E2E tests headlessly
npm run cypress:run

# Run specific test file
npm run cypress:run -- --spec "cypress/e2e/search.cy.ts"

# Run tests in specific browser
npm run cypress:run -- --browser chrome
```

### Writing Unit Tests

Tests are located next to the files they test in `__tests__` directories:

```typescript
// Example test
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import GameCard from '../GameCard';

describe('GameCard', () => {
  it('renders game title', () => {
    render(<GameCard title="Test Game" {...otherProps} />);
    expect(screen.getByText('Test Game')).toBeInTheDocument();
  });
});
```

### Writing E2E Tests

E2E tests are written using Cypress and test complete user flows:

```typescript
// Example E2E test
describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('should filter games by category', () => {
    cy.contains('Category').parent().find('button').click();
    cy.contains('Action').click();
    cy.contains('Active Filters:').should('be.visible');
    cy.contains('Category: Action').should('be.visible');
  });
});
```

### Best Practices

- **Unit tests** for component logic, props, and rendering
- **E2E tests** for user interactions and complete workflows
- Run unit tests frequently during development
- Run E2E tests before major releases or deployments
- Keep tests focused and independent
- Use data-testid attributes for reliable element selection in tests

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

## License

MIT
