import { browser } from 'protractor';

import { RideListPage } from './ride-list.po';

describe('RideList', () => {
  let page: RideListPage;

  beforeEach(() => {
    page = new RideListPage();
  })

  it('should create an instance', () => {
    expect(page).toBeTruthy();
  });

  it('should show newly added rides when "delete all rides" is clicked and new rides are added and the page is refreshed', () => {
    // Arrange
    page.navigateTo();
    page.getAddNewRideElement().click();
    page.getRideTypeOptionElement(0, 'Air Powered Vertical Coaster').click();
    page.getAddNewRideElement().click();
    page.getRideTypeOptionElement(1, 'Bobsleigh Coaster').click();

    // Act
    page.getDeleteAllRidesElement().click();
    page.getDeleteAllRidesConfirmElement().click();
    page.getAddNewRideElement().click();
    page.getRideTypeOptionElement(0, 'Chairlift').click();
    page.getAddNewRideElement().click();
    page.getRideTypeOptionElement(1, 'Dinghy Slide').click();
    browser.refresh();

    // Assert
    page.getRideExpanderElement(0).click();
    expect(page.getSelectedRideTypeElement(0).getText().then(x => x.trim())).toBe('Chairlift');
    page.getRideExpanderElement(1).click();
    expect(page.getSelectedRideTypeElement(1).getText().then(x => x.trim())).toBe('Dinghy Slide');
  })
});
