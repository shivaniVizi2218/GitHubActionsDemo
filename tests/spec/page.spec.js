const { test, expect } = require("@playwright/test");
const sections = require("../pages/page_letyshops/pageIndex");
const data = require("../../data/letyshopsData.json");
require("dotenv").config();

test.beforeEach(async ({ page }) => {
  const letyshopsLogin = new sections.LoginPage(page, test);
  await letyshopsLogin.launchApplication();
});

// test.afterEach(async ({ page }) => {
//   const letyshopsHome = new sections.HomePage(page, test);
//   await letyshopsHome.logOut();
// });
// test("Login to Letyshops website with Invalid user email", async ({ page }) => {
//   const letyshopsLogin = new sections.LoginPage(page, test);
//   await letyshopsLogin.loginApplication(
//     process.env.INVALID_USERMAIL,
//     process.env.VALID_PASSWORD
//   );
//   await expect(letyshopsLogin.textLoginError, "Unable to login ").toHaveText(
//     data.login.errorMessage
//   );
//   await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
//   await letyshopsLogin.exitingLoginPortal();
// });
// test("Login to Letyshops website with Invalid password", async ({ page }) => {
//   const letyshopsLogin = new sections.LoginPage(page, test);
//   await letyshopsLogin.loginApplication(
//     process.env.VALID_USEREMAIL,
//     process.env.INVALID_PASSWORD
//   );
//   await expect(letyshopsLogin.textLoginError, "Unable to login ").toHaveText(
//     data.login.errorMessage
//   );
//   await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
//   await letyshopsLogin.exitingLoginPortal();
// });
// test("Login to Letyshops website with Invalid credentials", async ({
//   page,
// }) => {
//   const letyshopsLogin = new sections.LoginPage(page, test);
//   await letyshopsLogin.loginApplication(
//     process.env.INVALID_USERMAIL,
//     process.env.INVALID_PASSWORD
//   );
//   await expect(letyshopsLogin.textLoginError, "Login failed ").toHaveText(
//     data.login.errorMessage
//   );
//   await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
//   await letyshopsLogin.exitingLoginPortal();
// });

test("Login to Letyshops website with valid credentials", async ({ page }) => {
  const letyshopsLogin = new sections.LoginPage(page, test);
  await expect(
    letyshopsLogin.logoImage,
    "Verifying letyshops logo image"
  ).toBeVisible();
  await letyshopsLogin.selectingCountry();
  await letyshopsLogin.loginApplication(
    process.env.VALID_USEREMAIL,
    process.env.VALID_PASSWORD
  );
});

// test("new user registration", async ({ page }) => {
//   const letyshopsLogin = new sections.LoginPage(page, test);
//   await letyshopsLogin.userRegistration();
//   await letyshopsLogin.confirmCountryPortal();
//   await expect(page, "User got registered successfully").toHaveURL(
//     data.registration.url
//   );
// });

test("Navigating to Letyshops Home Page", async ({ page }) => {
  const letyshopsLogin = new sections.LoginPage(page, test);
  await letyshopsLogin.loginApplication(
    process.env.VALID_USEREMAIL,
    process.env.VALID_PASSWORD
  );
  const letyshopsHome = new sections.HomePage(page, test);
  await letyshopsHome.selectAllStoresButton();
  await expect(
    letyshopsHome.titleAllStores,
    "Verifying whether it navigated to All stores with cashback page "
  ).toHaveText("All shops with cashback in India");
  await letyshopsHome.selectOnePlusStore();
  await expect(
    letyshopsHome.viewOnePlus,
    "Verifying whether One Plus store got selected or not"
  ).toBeVisible();
  await letyshopsHome.clickGotoStoreButton();

  const promise = page.waitForEvent("popup");
  const pageOnePlus = await promise;
  const letyshopsOnePlusStore = new sections.HomePage(pageOnePlus, test);
  await pageOnePlus.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
  await expect(
    letyshopsOnePlusStore.logoOnePlus,
    "Verifying whether it navigated to One Plus store"
  ).toBeVisible();
  await pageOnePlus.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
  await pageOnePlus.close();
});

test("Validating Profile bar", async ({ page }) => {
  const letyshopsLogin = new sections.LoginPage(page, test);
  await letyshopsLogin.loginApplication(
    process.env.VALID_USEREMAIL,
    process.env.VALID_PASSWORD
  );
  const letyshopsHome = new sections.HomePage(page, test);
  await letyshopsHome.logOut();
});
