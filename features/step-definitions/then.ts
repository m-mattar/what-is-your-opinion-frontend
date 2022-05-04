// @ts-ignore
import { Then } from 'cucumber';

Then(
  'I am on the {string} route',
  function(route: string): void {
    // @ts-ignore
    if (this.route !== route) {
      // @ts-ignore
      throw new Error(`Expected route: ${route} Received route: ${this.route}`);
    }
  },
);