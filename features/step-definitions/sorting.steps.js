const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const Inventory = require("../pageobjects/inventory.page");

Given(/^User is logged in to the inventory page$/, async () => {
  await LoginPage.open();
  await LoginPage.login("standard_user", "secret_sauce");
  await LoginPage.loginButton.click();
});

When(/^User sorts items by "([^"]*)"$/, async (option) => {
  await Inventory.sortBy(option);
});

Then(/^Items should be sorted correctly by "([^"]*)"$/, async (option) => {
  await expect(await Inventory.isSortedCorrectly(option)).toBe(true);
});
