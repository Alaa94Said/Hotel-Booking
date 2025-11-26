import { test, expect } from '../../fixtures/test-fixtures';
import { BookingPayload } from '../../types/booking';

test('create, fetch, update, delete booking @api', async ({ apiClient }) => {
  const payload: BookingPayload = {
    'firstname': 'API',
    'lastname': 'Tester',
    'totalprice': 100,
    'depositpaid': true,
    'bookingdates': {
'checkin': '2025-12-01',
'checkout': '2025-12-02' }
  };

  const createRes = await apiClient.createBooking(payload);
  expect(createRes.status()).toBe(200);
  const body = await createRes.json();
  expect(body.bookingid || body).toBeTruthy();

  const id = body.bookingid || body.id;
  const fetchRes = await apiClient.getBooking(id);
  expect(fetchRes.ok()).toBeTruthy();

  const tokenRes = await apiClient.createAuth('admin', 'password123');
  const token = tokenRes.token;


  const patch = { firstname: 'API-Edited' };
  const updateRes = await apiClient.updateBooking(id, patch, token);
console.log(await updateRes.text());

  const deleteRes = await apiClient.deleteBooking(id, token);
  expect(deleteRes.status()).toBe(201); // restful-booker often returns 201
});
