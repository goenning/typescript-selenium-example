import { WebElementPromise, Browser, Page, findBy } from '../lib';
import { ShowIdeaPage, GoogleSignInPage } from './';
import config from '../config';

export class HomePage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/`);
  }

  @findBy('#new-idea-input')
  public IdeaTitle: WebElementPromise;

  @findBy('.ui.form textarea')
  public IdeaDescription: WebElementPromise;

  @findBy('.ui.button.primary')
  public SubmitIdea: WebElementPromise;

  @findBy('.signin')
  public UserMenu: WebElementPromise;

  @findBy('.fdr-profile-popup .button.google')
  public GoogleSignIn: WebElementPromise;

  @findBy('.ui.form .ui.negative.message')
  public ErrorBox: WebElementPromise;

  public loadCondition() {
    return this.browser.elementIsVisible(() => this.IdeaTitle);
  }

  public async submitNewIdea(title: string, description: string): Promise<void> {
    await this.IdeaTitle.sendKeys(title);
    await this.IdeaDescription.sendKeys(description);
    await this.SubmitIdea.click();
    await this.browser.waitForPage(ShowIdeaPage);
  }

  public async signInWithGoogle(): Promise<void> {
    await this.UserMenu.click();
    await this.browser.waitUntilIsVisible(() => this.GoogleSignIn);
    await this.GoogleSignIn.click();
    await this.browser.waitForPage(GoogleSignInPage);
  }
}
