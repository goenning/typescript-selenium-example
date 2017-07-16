import { WebElementPromise } from 'selenium-webdriver';

export interface WebComponent {
  selector: string;
  isDisplayed(): Promise<boolean>;
  getText(): Promise<string>;
  click(): Promise<void>;
}

export class SimpleWebComponent implements WebComponent {
  constructor(protected element: WebElementPromise, public selector: string) { }

  public async click() {
    return await this.element.click();
  }

  public async isDisplayed() {
    return await this.element.isDisplayed();
  }

  public async getText() {
    return await this.element.getText();
  }
}

export class Button extends SimpleWebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }
}

export class TextInput extends SimpleWebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public type(text: string) {
    return this.element.sendKeys(text);
  }
}
