import { AngularAdalPage } from './app.po';

describe('angular-adal App', () => {
  let page: AngularAdalPage;

  beforeEach(() => {
    page = new AngularAdalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
