import { WebElementPromise, Browser, Page, findBy } from '../../lib';

export class ShowIdeaPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('.idea-header .header')
  private title: WebElementPromise;

  @findBy('div > span')
  private description: WebElementPromise;

  @findBy('.support-counter .value')
  private supportCounter: WebElementPromise;

  public async waitForLoad(): Promise<void> {
    await this.browser.waitUntilIsVisible(() => this.title);
  }

  public async getTitle(): Promise<string> {
    return await this.title.getText();
  }

  public async getDescription(): Promise<string> {
    return await this.description.getText();
  }

  public async getSupportCount(): Promise<number> {
    return parseInt(await this.supportCounter.getText(), 10);
  }
}
