// import statements
import config from '../detox.config';
import { Actions } from '../helpers/actions';
import { Assertions } from '../helpers/assertions';

// configure jest with detox
jest.setTimeout(120000);

// define test suite
describe('Authentication Flow', () => {
  // before all tests, init detox
  beforeAll(async () => {
    // init detox runtime
    await device.launchApp();
  });

  // test invalid credentials
  it('stays on SignIn when credentials are wrong', async () => {
    // ensure sign in screen visible
    await Assertions.seeSignInScreen();
    // attempt sign in
    await Actions.signIn({ email: 'any', password: 'wrong' });
    // expect still on sign in
    await Assertions.seeSignInScreen();
  });

  // test success credentials
  it('navigates to Home when credentials are correct', async () => {
    // ensure sign in screen visible
    await Assertions.seeSignInScreen();
    // attempt sign in
    await Actions.signIn({
      email: 'any',
      password: 'password123',
    });
    // expect home screen
    await Assertions.seeHomeScreen();
    // expect welcome text
    await Assertions.seeWelcomeText();
  });
});
