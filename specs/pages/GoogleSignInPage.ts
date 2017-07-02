import { WebElementPromise, Browser, Page, findBy } from '../../lib';
import { HomePage } from './';

export class GoogleSignInPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('#identifierId')
  private email: WebElementPromise;

  @findBy('#identifierNext')
  private next: WebElementPromise;

  @findBy('input[type="password"]')
  private password: WebElementPromise;

  @findBy('#passwordNext')
  private confirm: WebElementPromise;

  public async logInAs(email: string, password: string) {
    await this.email.sendKeys(email);
    await this.next.click();
    await this.browser.waitUntilIsVisible(() => this.password);
    await this.password.sendKeys(password);
    await this.confirm.click();
    await this.browser.waitForPage(HomePage);
  }

  public async waitForLoad(): Promise<void> {
    await this.browser.waitUntilIsVisible(() => this.email);
  }
}
