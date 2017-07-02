import { WebElementPromise, Browser, Page, findBy } from '../../lib';
import { ShowIdeaPage, GoogleSignInPage } from './';
import config from '../config';

export class HomePage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/`);
  }

  @findBy('#new-idea-input')
  private ideaTitle: WebElementPromise;

  @findBy('.ui.form textarea')
  private ideaDescription: WebElementPromise;

  @findBy('.ui.button.primary')
  private submitIdea: WebElementPromise;

  @findBy('.signin')
  private userMenu: WebElementPromise;

  @findBy('.fdr-profile-popup .button.google')
  private googleSignIn: WebElementPromise;

  public async waitForLoad(): Promise<void> {
    await this.browser.waitUntilIsVisible(() => this.ideaTitle);
  }

  public async getUserName(): Promise<string> {
    return await this.userMenu.getText();
  }

  public async typeNewIdea(title: string, description: string): Promise<void> {
    await this.ideaTitle.sendKeys(title);
    await this.ideaDescription.sendKeys(description);
    await this.submitIdea.click();
    await this.browser.waitForPage(ShowIdeaPage);
  }

  public async signInWithGoogle(): Promise<void> {
    await this.userMenu.click();
    await this.browser.waitUntilIsVisible(() => this.googleSignIn);
    await this.googleSignIn.click();
    await this.browser.waitForPage(GoogleSignInPage);
  }
}
