import { WebElementPromise, Browser, Page, findBy } from '../../lib';

export class ShowIdeaPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('.idea-header .header')
  public Title: WebElementPromise;

  @findBy('div > span')
  public Description: WebElementPromise;

  @findBy('.support-counter .value')
  public SupportCounter: WebElementPromise;

  public async waitForLoad(): Promise<void> {
    await this.browser.waitUntilIsVisible(() => this.Title);
  }

  public async getTitle(): Promise<string> {
    return await this.Title.getText();
  }

  public async getDescription(): Promise<string> {
    return await this.Description.getText();
  }

  public async getSupportCount(): Promise<number> {
    return parseInt(await this.SupportCounter.getText(), 10);
  }
}
