import { browser, element, by, Key } from 'protractor';

export class RideListPage {
  navigateTo() {
    return browser.get('/');
  }

  getAddNewRideElement() {
    return element(by.css('button[data-test-id="add-new-ride"]'));
  }

  getRideTypeOptionElement(rideIndex: number, text: string) {
    return element(by.css(`app-ride[ng-reflect-index="${rideIndex}"] select[data-test-id="ride-type"]`))
      .element(by.cssContainingText('option', text));
  }

  getSelectedRideTypeElement(rideIndex: number) {
    return element(by.css(`app-ride[ng-reflect-index="${rideIndex}"] select[data-test-id="ride-type"] option:checked`));
  }

  getDeleteAllRidesElement() {
    return element(by.css('button[data-test-id="delete-all-rides"]'));
  }

  getDeleteAllRidesConfirmElement() {
    return element(by.css('button[data-test-id="delete-all-rides-confirm"]'));
  }

  getRideExpanderElement(rideIndex: number) {
    return element(by.css(`div[data-test-id="ride-${rideIndex}"] button[data-test-id="expand-ride"]`));
  }
}
