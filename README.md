# Playwright TypeScript E2E Testing Framework

Modern, scalable end-to-end testing framework built with Playwright and TypeScript, featuring Page Object Model design pattern, parallel execution, and comprehensive reporting.

## Features

- **Page Object Model (POM)** - Clean, maintainable test architecture
- **TypeScript** - Type safety and better IDE support
- **Parallel Execution** - Fast test execution across multiple workers
- **Cross-Browser Testing** - Chrome, Firefox, Safari support
- **HTML Reports** - Beautiful, detailed test reports
- **CI/CD Ready** - GitHub Actions workflow included
- **Environment Configuration** - Easy environment management with dotenv

## Project Structure

```
playwright-typescript-e2e-framework/
├── tests/
│   ├── e2e/                    # End-to-end test specs
│   └── example.spec.ts
├── pages/                      # Page Object Models
│   ├── BasePage.ts
│   └── LoginPage.ts
├── fixtures/                   # Test fixtures
├── utils/                      # Helper utilities
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
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'password');
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## CI/CD Integration

GitHub Actions workflow included for automated testing on every push and pull request.

## Author

**Cheetahrevive** - QA Automation Engineer

## License

MIT
