const { executeStep } = require("../../../utilities/actions");
require("dotenv").config();

exports.HomePage = class HomePage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.logoImage = page.locator("//img[@class='header-logo-image']");
    this.btnAllStores = page.locator(
      "//a[contains(text(),'All stores with cashback')]"
    );
    this.titleAllStores = page.locator("//h1");
    this.optionOnePlus = page.locator("//img[@alt='OnePlus']");
    this.viewOnePlus = page.locator(
      "//img[@title='Cashback in OnePlus in India']"
    );
    this.btnGoToStore = page.locator("//a[contains(text(),'Go to the store')]");
    this.logoOnePlus = page.locator("//li[@class='icon brand']//a");
    this.iconProfile = page.locator("(//div[@class='hidden lg:block'])[2]");
    this.labelLogout = page.locator("(//span[contains(text(),'Logout')])[1]");
  }

  async selectAllStoresButton() {
    await executeStep(
      this.test,
      this.btnAllStores,
      "click",
      "Slecting All Stores button"
    );
  }

  async selectOnePlusStore() {
    await executeStep(
      this.test,
      this.optionOnePlus,
      "click",
      "Selecting One Plus store"
    );
  }

  async clickGotoStoreButton() {
    await executeStep(
      this.test,
      this.btnGoToStore,
      "click",
      "Clicking 'Go to the store' button"
    );
  }

  async logOut() {
    await executeStep(
      this.test,
      this.iconProfile,
      "click",
      "Clicking profile icon"
    );
    await executeStep(
      this.test,
      this.labelLogout,
      "click",
      "Logging out from the current user account"
    );
  }
};
