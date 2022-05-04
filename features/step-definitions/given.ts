// @ts-ignore
import { Given } from 'cucumber';

Given('I am on the {string} route', function(route: string): void {
  // @ts-ignore
  this.setRoute(route);
});