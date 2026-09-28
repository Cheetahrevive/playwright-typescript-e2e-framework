# Playwright TypeScript E2E Testing Framework

Modern, scalable end-to-end testing framework built with Playwright and TypeScript, featuring Page Object Model design pattern, parallel execution, and comprehensive reporting.

## Features

- **Page Object Model (POM)** - Clean, maintainable test architecture
- **TypeScript** - Type safety and better IDE support
- **Parallel Execution** - Fast test execution across multiple workers
- **Cross-Browser Testing** - Chrome, Firefox, Safari support
- **HTML Reports** - Beautiful, detailed test reports
- **CI/CD Ready** - `npm test` scripts drop into any CI pipeline
- **Environment Configuration** - Easy environment management with dotenv

## Project Structure

```
playwright-typescript-e2e-framework/
├── tests/
│   └── login.spec.ts           # Test specs
├── pages/                      # Page Object Models
│   ├── BasePage.ts
│   └── LoginPage.ts
├── playwright.config.ts        # Playwright configuration
├── package.json
└── README.md
```

## Installation

```bash
# Clone the repository
git clone https://github.com/Cheetahrevive/playwright-typescript-e2e-framework.git

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

> **Note:** the specs target an app under test via `BASE_URL` (defaults to
> `http://localhost:3000`). Point `BASE_URL` at your app, e.g.
> `BASE_URL=https://myapp.example.com npm test`, before running.

```bash
# Run all tests
npm test

# Run tests in specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run tests in parallel
npm run test:parallel

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# Open test UI
npm run ui
```

## View Reports

```bash
npm run report
```

## Configuration

Update `playwright.config.ts` for custom settings:
- Base URL
- Timeouts
- Retry logic
- Screenshot/video capture
- Browser configurations

## Writing Tests

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('user@example.com', 'password');
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## CI/CD Integration

No GitHub Actions workflow is bundled with this repo; `npm test` drops into any CI pipeline (e.g. a workflow running `npm ci`, `npx playwright install --with-deps`, `npm test` with `BASE_URL` set to your app under test).

## Author

**Cheetahrevive** - QA Automation Engineer

## License

MIT
