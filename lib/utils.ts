import 'reflect-metadata';
import { Button, TextInput, WebComponent, SimpleWebComponent } from './';

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function findBy(selector: string) {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get: function() {
          const promise = (this as any).browser.findElement(selector);
          // promise.selector = selector;

          /*if (type === Button) {
            return new Button(promise, selector);
          } else if (type === Button) {
            return new Button(promise, selector);
          } else  if (type === Button) {
            return new Button(promise, selector);
          } else if (type === Button) {
            return new Button(promise, selector);
          }*/
          return new type(promise, selector);
        },
    });
  };
}
