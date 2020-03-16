
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
      {
          headless: true
          // headless: false
      }
  );
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0');
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.0 Safari/537.36');
  await page.goto('http://airesources.org/');

  await page.screenshot({path: 'ai_resource.png'});
  await page.pdf({ path: 'ai_resource.pdf' })


})();
