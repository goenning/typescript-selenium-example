import { WebElementPromise, Browser, Page, findBy } from '../../lib';
import { HomePage } from './';

export class GoogleSignInPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('#identifierId')
  public Email: WebElementPromise;

  @findBy('#identifierNext')
  public Next: WebElementPromise;

  @findBy('input[type="password"]')
  public Password: WebElementPromise;

  @findBy('#passwordNext')
  public Confirm: WebElementPromise;

  public async logInAs(email: string, password: string) {
    await this.Email.sendKeys(email);
    await this.Next.click();
    await this.browser.waitUntilIsVisible(() => this.Password);
    await this.Password.sendKeys(password);
    await this.Confirm.click();
    await this.browser.waitForPage(HomePage);
  }

  public async waitForLoad(): Promise<void> {
    await this.browser.waitUntilIsVisible(() => this.Email);
  }
}
