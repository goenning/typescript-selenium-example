import { GoogleSignInPage } from './GoogleSignInPage';
import { HomePage } from './HomePage';
import { ShowIdeaPage } from './ShowIdeaPage';
import { Browser } from '../lib';

export {
  GoogleSignInPage,
  HomePage,
  ShowIdeaPage,
};

export class AllPages {
    public google: GoogleSignInPage;
    public home: HomePage;
    public showIdea: ShowIdeaPage;

    constructor(public browser: Browser) {
      this.google = new GoogleSignInPage(browser);
      this.home = new HomePage(browser);
      this.showIdea = new ShowIdeaPage(browser);
    }

    public async dispose(): Promise<void> {
      await this.browser.close();
    }
}
