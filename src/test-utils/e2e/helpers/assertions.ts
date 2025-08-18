import { expect } from 'detox';
import { Selectors } from './selectors';

// reusable assertions

export const Assertions = {
  async seeSignInScreen() {
    await expect(element(Selectors.screenSignIn)).toBeVisible();
  },
  async seeHomeScreen() {
    await expect(element(Selectors.screenHome)).toBeVisible();
  },
  async seeWelcomeText() {
    await expect(element(Selectors.welcomeText)).toBeVisible();
  },
};
