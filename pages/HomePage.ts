import { WebComponent, Browser, Page, findBy, Button, TextInput } from '../lib';
import { ShowIdeaPage, GoogleSignInPage } from './';
import config from '../config';

export class HomePage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/`);
  }

  @findBy('#new-idea-input')
  public IdeaTitle: TextInput;

  @findBy('.ui.form textarea')
  public IdeaDescription: TextInput;

  @findBy('.ui.button.primary')
  public SubmitIdea: Button;

  @findBy('.signin')
  public UserMenu: WebComponent;

  @findBy('.fdr-profile-popup .button.google')
  public GoogleSignIn: Button;

  @findBy('.ui.form .ui.negative.message')
  public ErrorBox: WebComponent;

  public loadCondition() {
    return this.browser.elementIsVisible(() => this.IdeaTitle);
  }

  public async submitNewIdea(title: string, description: string): Promise<void> {
    await this.IdeaTitle.type(title);
    await this.IdeaDescription.type(description);
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
