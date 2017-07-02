import { ISuiteCallbackContext } from 'mocha';

export const testCase = (name: string, callback: (this: ISuiteCallbackContext) => void) => {
  return describe(`TestCase: ${name}`, callback);
};

export const when = (condition: string, callback: (this: ISuiteCallbackContext) => void) => {
  return describe(`when ${condition}`, callback);
};

export const action = before;
