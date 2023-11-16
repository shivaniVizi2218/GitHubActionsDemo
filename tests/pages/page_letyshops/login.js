const { executeStep } = require("../../../utilities/actions");
const { expect } = require("@playwright/test");
const data = require("../../../data/letyshopsData.json");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

exports.LoginPage = class LoginPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.logoImage = page.locator("//img[@class='header-logo-image']");
    this.dropdownChooseCountry = page.locator(
      "//div[@id='tmp-coutry-chouse']//div/*"
    );
    this.subTitleCountrySelection = page.locator(
      "//div[contains(@class,'sublilte')]"
    );
    this.country = page.locator("(//li//span[text()='India'])[1]");
    this.labelLogin = page.locator("//button[contains(text(),'Login')]");
    this.inputEmail = page.locator("(//input[@name='_username'])[2]");
    this.inputPassword = page.locator("(//input[@name='_password'])[2]");
    this.btnLogin = page.locator(
      "//button[@type='submit']//span[contains(text(),'Login')]"
    );
    this.textLoginError = page.locator(
      "//div[contains(text(),'Unable to login.')]"
    );
    this.iconCloseLogin = page.locator("//div[contains(@class,'close')]");
    this.labelJoin = page.locator("//button[contains(text(),'Join')]");
    this.btnSubmitJoin = page.locator(
      "(//button//span[contains(text(),'Join')])[2]"
    );
    this.columnCountryCurrency = page.locator(
      "(//div[contains(text(),'India')])[1]"
    );
    this.btnConfirm = page.locator("//button[contains(text(),'Confirm')]");
  }

  async launchApplication() {
    await executeStep(
      this.test,
      this.page,
      "navigate",
      `Navigating to ${process.env.APP_URL}`,
      [process.env.APP_URL]
    );
  }

  async selectingCountry() {
    await executeStep(
      this.test,
      this.dropdownChooseCountry,
      "click",
      "Clicking dropdown for selecting Country"
    );
    await expect(
      this.subTitleCountrySelection,
      "Verifying whether country selection page displayed or not"
    ).toContainText(data.welcomeScreen.countrySubTitle);
  }

  async clickingLoginLabel() {
    await executeStep(
      this.test,
      this.labelLogin,
      "click",
      "Clicking Login label"
    );
  }

  async enteringUserCredentials(userEmail, password) {
    // await this.clickingLoginLabel();
    await executeStep(
      this.test,
      this.inputEmail,
      "click",
      "Clicking email input field"
    );
    await executeStep(
      this.test,
      this.inputEmail,
      "fill",
      `Entering user email`,
      [userEmail]
    );
    await executeStep(
      this.test,
      this.inputPassword,
      "click",
      "Clicking password input field"
    );
    await executeStep(
      this.test,
      this.inputPassword,
      "fill",
      "Entering password",
      [password]
    );
  }

  async exitingLoginPortal() {
    await executeStep(
      this.test,
      this.iconCloseLogin,
      "click",
      "Closing Login box"
    );
    //  await this.clickingLoginLabel();
  }

  async userRegistration() {
    await executeStep(
      this.test,
      this.labelJoin,
      "click",
      "Clicking Join for user-registration"
    );
    await this.enteringUserCredentials(
      faker.internet.email(),
      faker.internet.password()
    );
    await executeStep(
      this.test,
      this.btnSubmitJoin,
      "click",
      "Submitting user registration details"
    );
  }

  async loginApplication(userEmail, password) {
    await this.clickingLoginLabel();
    await this.enteringUserCredentials(userEmail, password);
    await executeStep(
      this.test,
      this.btnLogin,
      "click",
      "Clicking Login button"
    );
  }

  async confirmCountryPortal() {
    await executeStep(
      this.test,
      this.btnConfirm,
      "click",
      "Confirming Country and Currency"
    );
  }
};
