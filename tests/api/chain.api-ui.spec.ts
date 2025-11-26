import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { BookingPayload } from '../../types/booking';
import { BookingPage } from '../../pages/booking.page';
import dotenv from 'dotenv';
dotenv.config();

const API_BASE = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';

test('create booking via API and verify in UI', async ({ page, request }) => {
  const api = new ApiClient(request, API_BASE);

  // --- Step 1: Create booking via API ---
  const payload: BookingPayload = {
    firstname: 'Chain',
    lastname: 'User',
    totalprice: 10,
    depositpaid: false,
    bookingdates: { checkin: '2025-12-01', checkout: '2025-12-02' }
  };

  const res = await api.createBooking(payload);
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  const id = body.bookingid || body.id;

  // --- Step 2: Go to landing page ---
  const bookingPage = new BookingPage(page);
  await page.goto(process.env.BASE_URL || '/');

  // --- Step 3: Select a room (pick roomId 3 for example) ---
  await bookingPage.selectRoom(3);

  // --- Step 4: Fill booking form using API data ---
  await bookingPage.fillBookingForm({
    firstname: payload.firstname,
    lastname: payload.lastname,
    email: 'chain.user@test.com', // can be dummy email
    phone: '+20100000000'
  });

  // --- Step 5: Submit booking and confirm ---
  await bookingPage.submitBooking();
  await bookingPage.confirmBooking();

  // --- Step 6: Optional: assert booking visible on homepage (text) ---
  await expect(page.locator(`text=${payload.firstname}`)).toBeVisible();

  // --- Step 7: Screenshot for reporting ---
  await page.screenshot({ path: 'test-results/chain-booking-e2e.png', fullPage: true });
});
