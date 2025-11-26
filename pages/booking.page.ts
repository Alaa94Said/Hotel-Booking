import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class BookingPage extends BasePage {
// Room selection
roomSelector = (roomId: number) => `a[href*="/reservation/${roomId}"]`;
reserveNowButton = 'button#doReservation';

// Booking form
firstName = 'input[name="firstname"]';
lastName = 'input[name="lastname"]';
email = 'input[name="email"]';
phone = 'input[name="phone"]';
submitButton = 'button:has-text("Reserve Now")';

// Confirmation
confirmationHeader = 'h2.card-title.fs-4.fw-bold.mb-3';
returnHomeButton = 'a.btn-primary.w-100.mb-3.mt-3';

constructor(page: Page) { super(page); }

async selectRoom(roomId: number) {
  const roomLink = this.roomSelector(roomId);

  // scroll into view if needed
  await this.page.locator(roomLink).scrollIntoViewIfNeeded();

  // click Book Now button
  await this.page.click(roomLink);

  // click Reserve Now button on the next page
  await this.page.click('#doReservation');
}

  async fillBookingForm(data: { firstname: string, lastname: string, email: string, phone: string }) {
    await this.page.fill(this.firstName, data.firstname);
    await this.page.fill(this.lastName, data.lastname);
    await this.page.fill(this.email, data.email);
    await this.page.fill(this.phone, data.phone);
  }

  async submitBooking() {
    await this.page.click(this.submitButton);
  }

  async confirmBooking() {
    await expect(this.page.locator(this.confirmationHeader)).toHaveText(/Booking Confirmed/i);
    await this.page.click(this.returnHomeButton);
  }
}
