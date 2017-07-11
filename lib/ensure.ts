import { WebElementPromise } from 'selenium-webdriver';

class Ensurer {
  private selector: string;
  constructor(private element: WebElementPromise) {
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
    const selector = (this.element as any).selector;

    try {
      displayed = await this.element.isDisplayed();
    } catch (ex) {
      displayed = false;
    }

    if (!displayed) {
      throw new Error(`Element ${this.selector} is not visible`);
    }
  }

  public async isNotVisible() {
    let displayed = false;
    const selector = (this.element as any).selector;

    try {
      displayed = await this.element.isDisplayed();
    } catch (ex) {
      displayed = false;
    }

    if (displayed) {
      throw new Error(`Element ${this.selector} is visible`);
    }
  }
}

export const ensure = (element: WebElementPromise) => {
  return new Ensurer(element);
};
