const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch(
      {
          // headless: true
          headless: false
      }
  );
  
  urls = []

  urlJson = {'pageNo': []}

  for (var pageNo = 1; pageNo <= 274; pageNo++){
    var page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    })
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0');
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.0 Safari/537.36');
  
    await page.goto('http://airesources.org/?p='+ pageNo +'#results');
    
    try{
      await Promise.race([
        page.waitForSelector('.modal-header'),
        page.click('.close')
      ]);
    }
    catch{
      console.log("Catch Block")
    }

    var elementURL = await page.$$('.link');
    
    urlsPage = []
    for (var i = 0; i < elementURL.length; i++){
      let url = await page.evaluate(element => element.textContent, elementURL[i]);
      urls.push(url);
      urlsPage.push(url);
    }
    urlJson['pageNo'].push(urlsPage);
    console.log("Scraped page no. ", pageNo)
    await page.close()
  }
  console.log("Scraped All");
  let data = JSON.stringify(urlJson);
  fs.writeFileSync('urls.json', data);
  await browser.close();
})();
