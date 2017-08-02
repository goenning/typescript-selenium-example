import { GoogleSignInPage } from './GoogleSignInPage';
import { FacebookSignInPage } from './FacebookSignInPage';
import { HomePage } from './HomePage';
import { ShowIdeaPage } from './ShowIdeaPage';
import { Browser } from '../lib';

export {
  GoogleSignInPage,
  FacebookSignInPage,
  HomePage,
  ShowIdeaPage,
};

export class AllPages {
    public facebook: FacebookSignInPage;
    public google: GoogleSignInPage;
    public home: HomePage;
    public showIdea: ShowIdeaPage;

    constructor(public browser: Browser) {
      this.facebook = new FacebookSignInPage(browser);
      this.google = new GoogleSignInPage(browser);
      this.home = new HomePage(browser);
      this.showIdea = new ShowIdeaPage(browser);
    }

    public async dispose(): Promise<void> {
      await this.browser.close();
    }
}
