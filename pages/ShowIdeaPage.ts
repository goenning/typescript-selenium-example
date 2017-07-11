import { WebElementPromise, Browser, Page, findBy } from '../lib';

export class ShowIdeaPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('.idea-header .header')
  public Title: WebElementPromise;

  @findBy('div.description')
  public Description: WebElementPromise;

  @findBy('.support-counter .value')
  public SupportCounter: WebElementPromise;

  public loadCondition() {
    return this.browser.elementIsVisible(() => this.Title);
  }
}
