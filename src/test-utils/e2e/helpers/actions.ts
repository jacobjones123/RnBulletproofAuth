// reusable user flows
import { Selectors } from './selectors';

type Credentials = { email: string; password: string };

export const Actions = {
  async signIn(creds: Credentials) {
    await element(Selectors.emailInput).replaceText(creds.email);
    await element(Selectors.passwordInput).replaceText(creds.password);
    // dismiss the keyboard before tapping
    await element(Selectors.passwordInput).tapReturnKey();

    await element(Selectors.submitButton).tap();
  },
};
