const puppeteer = require("puppeteer-extra");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "",
    },
    visualFeedback: true,
  })
);
puppeteer
  .launch({
    headless: true,
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://www.google.com/recaptcha/api2/demo");
    await page.solvedRecaptchas();
    await Promise.all([
      page.waitForNavigation(),
      page.click(`#recaptcha-demo-submit`),
    ]);
    await page.screenshot({
      path: "response.png",
      fullPage: true,
    });
    await browser.close();
  });
