import { Page } from '@playwright/test';


export class LoginPage {
readonly page: Page;
readonly usernameInput = '#username';
readonly passwordInput = '#password';
readonly loginButton = 'button[type="submit"]';
readonly alertMessage = '.alert-danger';


constructor(page: Page) {
this.page = page;
}


async goto() {
await this.page.goto('/#/admin');
}


async login(username: string, password: string) {
await this.page.fill(this.usernameInput, username);
await this.page.fill(this.passwordInput, password);
await this.page.click(this.loginButton);
}


async getAlertMessage(): Promise<string> {
return this.page.textContent(this.alertMessage);
}
}