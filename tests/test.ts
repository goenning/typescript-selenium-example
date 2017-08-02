import { Browser, ensure } from '../lib';
import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise, until } from 'selenium-webdriver';
import { AllPages } from '../pages';

describe('Submit ideas', () => {
  let pages: AllPages;

  before(async () => {
    pages = new AllPages(new Browser('chrome'));
  });

  it('Test Case #1: Unauthenticated cannot submit ideas', async () => {
    // Action
    await pages.home.navigate();
    await pages.home.IdeaTitle.type('Add support to TypeScript');

    // Assert
    await Promise.all([
      ensure(pages.home.UserMenu).textIs('Sign in'),
      ensure(pages.home.SubmitIdea).isNotVisible(),
      ensure(pages.home.IdeaDescription).isNotVisible(),
    ]);
  });

  it('Test Case #2: Authenticated can submit ideas', async () => {
    // Action
    await pages.home.navigate();
    await pages.home.signInWithGoogle();
    await pages.google.signInAsDarthVader();

    // Assert
    await ensure(pages.home.UserMenu).textIs('Darth Vader');

    // Action
    await pages.home.submitNewIdea('Host a TypeScript workshop!', 'Workshop would be useful to have hands-on practice with the language.');

    // Assert
    await Promise.all([
      ensure(pages.showIdea.Title).textIs('Host a TypeScript workshop!'),
      ensure(pages.showIdea.Description).textIs('Workshop would be useful to have hands-on practice with the language.'),
      ensure(pages.showIdea.SupportCounter).textIs('1'),
    ]);
  });

  after(async () => {
    await pages.dispose();
  });
});
