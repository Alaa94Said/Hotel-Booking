import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { ApiClient } from '../utils/apiClient';

dotenv.config();

export const test = base.extend<{
  apiClient: ApiClient
}>({
  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request, process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com');
    await use(client);
  }
});

export const expect = test.expect;

//_________________________

test.beforeEach(async ({ page }) => {
  // common setup: set viewport, clear storage, login if needed
  await page.context().clearCookies();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `tests-results/failure-${testInfo.title.replace(/\s+/g,'_')}.png` });
    await page.context().tracing.stop({ path: `tests-results/trace-${testInfo.title}.zip` }).catch(()=>{});
  }
});
