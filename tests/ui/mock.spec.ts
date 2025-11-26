import { test, expect } from '@playwright/test';

test('mock rooms list on home page', async ({ page }) => {
  await page.route('**/room', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        rooms: [
          {
            roomid: 999,
            roomName: 'VIP Suite',
            type: 'Mock Suite',
            accessible: true,
            image: '/images/room3.jpg',
            description: 'Mock Description visible on UI',
            features: ['WiFi', 'TV'],
            roomPrice: 777
          }
        ]
      })
    });
  });

  await page.goto('/');
//await page.waitForTimeout(2000); // wait 2 seconds

  await expect(page.getByText('Mock Suite')).toBeVisible();
});
