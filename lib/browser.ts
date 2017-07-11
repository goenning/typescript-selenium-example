import 'chromedriver';
import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise } from 'selenium-webdriver';
import { NewablePage, Page } from './page';

export type WaitCondition = () => Promise<boolean>;

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

  public async waitUntilAny(conditions: WaitCondition | WaitCondition[]): Promise<void> {
    const all = (!(conditions instanceof Array)) ? [ conditions ] : conditions;

    await this.driver.wait(async () => {
        for (const condition of all) {
          try {
            return await condition();
          } catch (ex) {
            continue;
          }
        }
        return null;
    });
  }

  public async waitUntilIsVisible(locator: () => WebElementPromise) {
    await this.waitUntilAny(this.elementIsVisible(locator));
  }

  public async waitForPage<T extends Page>(page: NewablePage<T>) {
    await this.waitUntilAny(this.pageHasLoaded(page));
  }

  public elementIsVisible(locator: () => WebElementPromise) {
    return async () => await locator().isDisplayed();
  }

  public pageHasLoaded<T extends Page>(page: NewablePage<T>) {
    const thePage = new page(this);
    return thePage.loadCondition();
  }

  public async close(): Promise<void> {
    await this.driver.quit();
  }
}
