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
  });

  when('user sign in', async () => {
    action(async () => {
      await pages.home.signInWithGoogle();
      await pages.google.logInAs('darthvader.fider@gmail.com', process.env.DARTHVADER_PASSWORD!);
    });

    it('should display correct user name', async () => {
      expect(await pages.home.getUserName()).to.eq('Darth Vader');
    });

    when('new idea is submitted', async () => {
      action(async () => {
        await pages.home.typeNewIdea('Add support to TypeScript', 'Just do it. Please :)');
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
