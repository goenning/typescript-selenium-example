require('chromedriver');

import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise, promise } from 'selenium-webdriver';
import { NewablePage, Page } from './page';

export { WebElementPromise };

export class Browser {
  private driver: ThenableWebDriver;
  public constructor(private browserName: string) {
    this.driver = new Builder().forBrowser(browserName).build();
  }

  public async navigate(url: string): Promise<void> {
    await this.driver.navigate().to(url);
  }

  public findElement(selector: string): WebElementPromise {
    return this.driver.findElement(By.css(selector));
  }

  public async waitUntilIsVisible(locator: () => WebElementPromise): Promise<void> {
    await this.driver.wait(async () => {
      try {
        return await locator().isDisplayed();
      } catch (ex) {
        return null;
      }
    });
  }

  public async waitForPage<T extends Page>(page: NewablePage<T>): Promise<void> {
    const thePage = new page(this);
    await thePage.waitForLoad();
  }

  public async close(): Promise<void> {
    await this.driver.quit();
  }
}
