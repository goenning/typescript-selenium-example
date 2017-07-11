import { WebElementPromise, Browser, Page, findBy } from '../lib';
import { HomePage } from './';
import config from '../config';

export class GoogleSignInPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('#identifierId')
  public Email: WebElementPromise;

  @findBy('#identifierNext')
  public ConfirmEmail: WebElementPromise;

  @findBy('input[type="password"]')
  public Password: WebElementPromise;

  @findBy('#passwordNext')
  public ConfirmPassword: WebElementPromise;

  public loadCondition() {
    return this.browser.elementIsVisible(() => this.Email);
  }

  public async signInAsDarthVader() {
    return this.signInAs(config.users.darthvader.email, config.users.darthvader.password);
  }

  public async signInAs(email: string, password: string) {
    await this.Email.sendKeys(email);
    await this.ConfirmEmail.click();
    await this.browser.waitUntilIsVisible(() => this.Password);
    await this.Password.sendKeys(password);
    await this.ConfirmPassword.click();
    await this.browser.waitForPage(HomePage);
  }
}
