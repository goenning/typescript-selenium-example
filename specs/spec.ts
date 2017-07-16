import { Browser, ensure } from '../lib';
import { specification, when, action, then } from '../lib/mocha-bdd';
import { AllPages } from '../pages';

specification('Users can submit ideas', () => {
  let pages: AllPages;
  action(async () => {
    pages = new AllPages(new Browser('chrome'));
    await pages.home.navigate();
  });

  when('user is logged out', async () => {
    then('it should display sign in message', async () => {
      await ensure(pages.home.UserMenu).textIs('Sign in');
    });

    when('title is typed', async () => {
      action(async () => {
        await pages.home.IdeaTitle.type('Add support to TypeScript');
      });

      then('it should not display submit button after typing idea', async () => {
        await ensure(pages.home.IdeaDescription).isNotVisible();
      });
    });
  });

  when('user sign in', async () => {
    action(async () => {
      await pages.home.signInWithGoogle();
      await pages.google.signInAsDarthVader();
    });

    then('it should display correct user name', async () => {
      await ensure(pages.home.UserMenu).textIs('Darth Vader');
    });

    when('new idea is submitted', async () => {
      action(async () => {
        await pages.home.submitNewIdea('Add support to TypeScript', 'Because the language and community is awesome! :)');
      });

      then('it should have 1 supporter', async () => {
        await ensure(pages.showIdea.SupportCounter).textIs('1');
      });

      then('it should show correct title', async () => {
        await ensure(pages.showIdea.Title).textIs('Add support to TypeScript');
      });

      then('it should show correct description', async () => {
        ensure(pages.showIdea.Description).textIs('Because the language and community is awesome! :)');
      });
    });
  });

  after(async () => {
    await pages.dispose();
  });
});
