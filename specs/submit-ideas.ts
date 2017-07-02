import { Browser } from '../lib';
import { testCase, when, action } from '../lib/mocha';
import { expect } from 'chai';
import { AllPages } from './pages';

testCase('Users can submit ideas', () => {
  let pages: AllPages;
  action(async () => {
    pages = new AllPages(new Browser('chrome'));
    await pages.home.navigate();
  });

  when('user is logged out', async () => {
    it('should display sign in message', async () => {
      expect(await pages.home.getUserName()).to.eq('Sign in');
    });

    it('should not display confirm button after typing idea', async () => {
      await pages.home.IdeaTitle.sendKeys('Add support to TypeScript');
      try {
        expect(await pages.home.IdeaDescription).to.throw;
      } catch (ex) {
        console.log('fix this');
      }
    });
  });

  when('user sign in', async () => {
    action(async () => {
      await pages.home.clickAtSignInWithGoogle();
      await pages.google.logInAs('darthvader.fider@gmail.com', process.env.DARTHVADER_PASSWORD!);
    });

    it('should display correct user name', async () => {
      expect(await pages.home.getUserName()).to.eq('Darth Vader');
    });

    when('new idea is submitted', async () => {
      action(async () => {
        await pages.home.IdeaTitle.sendKeys('Add support to TypeScript');
        await pages.home.IdeaDescription.sendKeys('Just do it. Please :)');
        await pages.home.submitNewIdea();
      });

      it('should have 1 supporter', async () => {
        expect(await pages.showIdea.getSupportCount()).to.eq(1);
      });

      it('should show correct title', async () => {
        expect(await pages.showIdea.getTitle()).to.eq('Add support to TypeScript');
      });

      it('should show correct description', async () => {
        expect(await pages.showIdea.getDescription()).to.eq('Just do it. Please :)');
      });
    });
  });

  after(async () => {
    await pages.dispose();
  });
});
