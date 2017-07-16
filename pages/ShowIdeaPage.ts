import { WebComponent, Browser, Page, findBy } from '../lib';

export class ShowIdeaPage extends Page {
  constructor(browser: Browser) {
    super(browser);
  }

  @findBy('.idea-header .header')
  public Title: WebComponent;

  @findBy('div.description')
  public Description: WebComponent;

  @findBy('.support-counter .value')
  public SupportCounter: WebComponent;

  public loadCondition() {
    return this.browser.elementIsVisible(() => this.Title);
  }
}
