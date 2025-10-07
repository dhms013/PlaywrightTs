# Playwright Basics

Welcome to my little backup spot on the internet. This repository is all about samples of how to write Playwright. This isn't the perfect way to write test scripts with Playwright, but let's just say it's one of the many forms out there. I'll try to update this repository whenever I feel like it.

### Note
- This test setup includes taking screenshots on failure and automatically opens the report when all your tests are finished.
- Every human has the freedom to write their code how they want, but just make sure it's still understandable for your team 😉
- Before starting, make sure you've already installed the basic tools like Node.js, etc.
- This repository tests the [SauceDemo Swag Labs](https://www.saucedemo.com/) application.
- I save the credentials inside a '.env' file. So, you'll need to make one if you want to try my code.
- I use 'yarn' (idk I just want to try using yarn 🤣)
- When I started this project, the 'yarn create playwright' command didn't generate a `tsconfig.json` file, so you have to add it manually.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Known Setup Issues & Solutions](#known-setup-issues--solutions)
3.  [Project Architecture](#project-architecture)
4.  [Key Concepts Demonstrated](#key-concepts-demonstrated)
5.  [Getting Started](#getting-started)
    - [Option A: Clone and Run](#option-a-clone-and-run)
    - [Option B: Write from Scratch](#option-b-write-from-scratch)

---

## Prerequisites

Before you begin, ensure you have the following tools installed:
- [Node.js (LTS version)](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (`npm install -g yarn`)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Playwright Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) (Highly Recommended)

---

## Known Setup Issues & Solutions

The `yarn create playwright` command is a great way to get started, but its behavior can be inconsistent across different environments. A common issue is that it may not generate all the necessary configuration files for a complete TypeScript setup.

### 1. `tsconfig.json` is Not Generated

**Problem:** The setup script creates `.ts` files but skips the interactive prompt and fails to generate a `tsconfig.json` file. This causes a flood of "Problems" and errors in VS Code (e.g., `Cannot find name 'process'`), because VS Code doesn't know how to interpret the TypeScript files.

**Solution:** Manually create a `tsconfig.json` file in your project root with the following content. This is the standard, recommended configuration for a Playwright project.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "commonjs",
    "moduleResolution": "node",
    "types": ["node"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 2. `playwright.config.ts` is Incomplete

**Problem:** The generated config may not be set up to handle environment variables from a `.env` file.

**Solution:** Overwrite your `playwright.config.ts` with this robust configuration:

```typescript
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

---

## Project Architecture

This project is structured for clarity, scalability, and maintainability.

```
playwrightTs/
├── .env                  # Environment variables (URLs, credentials)
├── .env.example          # Example for other developers
├── .gitignore
├── .github/workflows/    # CI/CD pipeline for GitHub Actions
├── pages/                # Page Object Models (POM)
│   ├── LoginPage.selectors.ts  # Selector definitions for the Login Page
│   ├── LoginPage.ts            # Actions and verifications for the Login Page
│   ├── InventoryPage.selectors.ts
│   └── InventoryPage.ts
├── tests/                # Test specifications
│   └── login.spec.ts
│   └── dashboardFunction.spec.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── yarn.lock
```

### Key Architectural Decisions

*   **Page Object Model (POM):** Separated page interactions into dedicated classes (`LoginPage`, `InventoryPage`) to keep tests clean and logic reusable.
*   **Separated Selectors:** Selector strings are stored in dedicated `.selectors.ts` files. This makes maintenance easy when UI elements change.
*   **Actions vs. Assertions:** Page Object methods perform **actions** (e.g., `login()`, `addToCart()`). **Assertions** (`expect(...)`) are kept in the test file to make the test's intent clear. The exception is `verifyPageLoaded()`, which is a common setup verification.
*   **Environment Variables:** All sensitive data and URLs are managed in a `.env` file, never hardcoded in the scripts.

---

## Key Concepts Demonstrated

This repository covers the following essential Playwright and TypeScript concepts:

-   **Test Isolation:** Understanding why `({ page })` is required in every test block.
-   **Fixtures & Hooks:** Using `test.beforeEach` to set up a clean state for each test.
-   **Environment Variables:** Loading and using `.env` files with `dotenv`.
-   **TypeScript:** Using types for better code quality and error prevention.
-   **Soft Assertions:** Using `expect.soft()` to allow a test to continue running after a failure.
-   **Test Annotations:** Adding metadata like severity to the default HTML report.
-   **Reporting:** Generating and viewing the default HTML report automatically.
-   **CI/CD:** A GitHub Actions workflow to run tests on every push.
-   **Code Architecture:** Best practices for organizing selectors, actions, and assertions.

---

## Getting Started

### Option A: Clone and Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Set up your environment:**
    -   Create a `.env` file in the root directory.
    -   Copy the contents from `.env.example` and fill in your credentials.
4.  **Run the tests:**
    ```bash
    # This single command runs all tests and automatically opens the HTML report
    yarn test
    # Look the custom command list in the package.json file, or follow the command list from official website
    ```

### Option B: Write from Scratch

If you want to build this project yourself, follow the steps in the official website and remember, a great AI assistant can guide you through it step-by-step! 😉 The key is to manually create the `tsconfig.json` and `playwright.config.ts` files if the setup script fails.