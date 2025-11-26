import { test } from '@playwright/test';
import { BookingPage } from '../../pages/booking.page';

test.describe('Booking flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('book a room successfully', async ({ page }) => {
    const booking = new BookingPage(page);

    // Step 1: select room (example roomId 3)
    await booking.selectRoom(3);

    // Step 2: fill booking form
    const payload = {
      firstname: 'Lilly',
      lastname: 'Tester',
      email: 'lilly@test.com',
      phone: '+20123456789'
    };
    await booking.fillBookingForm(payload);

    // Step 3: submit booking
    await booking.submitBooking();

    // Step 4: assert confirmation & return home
    await booking.confirmBooking();

    // optional: screenshot
    await page.screenshot({ path: 'test-results/booking-success.png', fullPage: true });
  });
});
