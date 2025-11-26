// src/utils/apiClient.ts
import {APIRequestContext, expect} from '@playwright/test';

export class ApiClient {
private request: APIRequestContext;
private base: string;

constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.base = baseURL.replace(/\/$/, '');
  }

  async createAuth(username: string, password: string) {
    const res = await this.request.post(`${this.base}/auth`, {
      data: { username, password }
    });
    expect(res.ok()).toBeTruthy();
    return res.json();
  }

  async createBooking(payload: any) {
    const res = await this.request.post(`${this.base}/booking`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' }
    });
    return res;
  }

  async getBooking(id: number) {
    return this.request.get(`${this.base}/booking/${id}`);
  }

  async updateBooking(id: number, payload: any, token?: string) {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers['Cookie'] = `token=${token}`;
    return this.request.put(`${this.base}/booking/${id}`, { data: payload, headers });
  }

  async deleteBooking(id: number, token?: string) {
    const headers: any = {};
    if (token) headers['Cookie'] = `token=${token}`;
    return this.request.delete(`${this.base}/booking/${id}`, { headers });
  }

  // helper to simulate failure (for UI retry tests)
  async failingEndpoint(path: string) {
    // Not actual server-side control — used by mocking in UI tests
    return this.request.get(`${this.base}${path}`);
  }
}
