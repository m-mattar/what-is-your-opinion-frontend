// @ts-ignore
import { When } from 'cucumber';

When(
  'I click the {string} button',
  function(buttonText: string): void {
    // @ts-ignore
    const button: HTMLButtonElement = this.getButtonByText(buttonText);
    // @ts-ignore
    this.click(button);
  },
);