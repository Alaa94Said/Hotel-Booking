import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
username = '#username';
password = '#password';
submit = 'button[type="submit"]';

constructor(page: Page) { super(page); }

  async login(username: string, password: string) {
    await this.page.fill(this.username, username);
    await this.page.fill(this.password, password);
    await this.page.click(this.submit);
  }
}
