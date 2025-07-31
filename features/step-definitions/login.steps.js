const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const Inventory = require("../pageobjects/inventory.page");

Given(/^User is located on the main page of saucedemo website$/, async () => {
  await LoginPage.open();
});

When(/^User enters (.*) and (.*)$/, async (username, password) => {
  await LoginPage.login(username, password);
});

When(/^User clicks "Login" button$/, async () => {
  await LoginPage.loginButton.click();
});

Then(/^User should see inventory container$/, async ()=> {
  await expect(await Inventory.isInventoryDisplayed()).toBe(true);
});

Then(/^User should see "([^"]*)" error message$/, async (message) => {
  await expect(LoginPage.errorMessage).toHaveText(message);
});
