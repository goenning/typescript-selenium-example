import { WebElementPromise } from 'selenium-webdriver';
import { WebComponent } from './';

class Ensurer {
  private selector: string;
  constructor(private element: WebComponent) {
    this.selector = (this.element as any).selector;
  }

  public async textIs(expected: string) {
    const text = await this.element.getText();

    if (expected.trim() !== text.trim()) {
      throw new Error(`Element ${this.selector} text is '${text}'. Expected value is '${expected}'`);
    }
  }

  public async isVisible() {
    let displayed = false;

    try {
      displayed = await this.element.isDisplayed();
    } catch (ex) {
      displayed = false;
    }

    if (!displayed) {
      throw new Error(`Element ${this.element.selector} is not visible`);
    }
  }

  public async isNotVisible() {
    let displayed = false;

    try {
      displayed = await this.element.isDisplayed();
    } catch (ex) {
      displayed = false;
    }

    if (displayed) {
      throw new Error(`Element ${this.element.selector} is visible`);
    }
  }
}

export const ensure = (element: WebComponent) => {
  return new Ensurer(element);
};
