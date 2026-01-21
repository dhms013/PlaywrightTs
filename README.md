# Playwright Basics

Welcome to my little backup spot on the internet. This repository is all about samples of how to write Playwright. This isn't the perfect way to write test scripts with Playwright, but let's just say it's one of the many forms out there. I'll try to update this repository whenever I feel like it.

### Note
- This test setup includes taking screenshots on failure and automatically opens the report when all your tests are finished.
- Every human has the freedom to write their code how they want, but just make sure it's still understandable for your team 😉
- Before starting, make sure you've already installed the basic tools like Node.js, etc.
- This repository tests the [SauceDemo Swag Labs](https://www.saucedemo.com/) application.
- I save the credentials inside a '.env' file. So, you'll need to make one if you want to try my code.

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
### Option 1.
- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Playwright Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) (Highly Recommended)

### Option 2.
- You can just use any IDE (e.g. neovim, etc) for your text editor.

---

## Known Setup Issues & Solutions
I'm using Arch linux, where playwright not officially support the OS yet. So I just install with default options (using ubuntu libs.) and install playwright globally via [AUR](https://aur.archlinux.org/packages/playwright). I believe this setup is working well for windows or macOS. Just follow the [official documentation](https://playwright.dev/docs/intro#installing-playwright)
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
│   └── 1.login.spec.ts
│   └── 2.dashboardFunction.spec.ts
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
    git clone git@github.com:dhms013/PlaywrightTs.git
    cd PlaywrightTs
    ```
2.  **Install dependencies:**
    ```bash
    npx playwright install
    ```
3.  **Set up your environment:**
    -   Create a `.env` file in the root directory.
    -   Copy the contents from `.env.example` and fill in your credentials.
4.  **Run the tests:**
    ```bash
    # This single command runs all tests and automatically opens the HTML report
    npx playwright test
    # Look the custom command list in the package.json file, or follow the command list from official website
    ```

Note :
You can always make an aliases to simplify the command line in the  [package.json](./package.json) file

For the example, add this line :
```
"scripts": {
    "test": "npx playwright test ; npx playwright show-report",
    "ui": "npx playwright test --ui",
    "report": "npx playwright show-report"
  }
```

### Option B: Write from Scratch

If you want to build this project yourself, follow the steps in the official website and remember, a great AI assistant can guide you through it step-by-step! 😉. The key is read the documentations and don't 100% trust the AI, since AI is just a tools.
