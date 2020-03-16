
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
  await page.goto('https://bus.makemytrip.com/bus/search/Bangalore/Udumalaipettai/14-03-2020');//, { waitUntil: 'networkidle2' });
  

  await page.waitForSelector('.BusViewContainer');

  // const element_price = await page.$$("div.gUYDEX>div.bDsesi>div.BusViewContainer>div.sc-iwsKbI>div.qdAhs>div>span.bKUXLW");
  // const element_bustype = await page.$$('div.gUYDEX>div.bDsesi>div.BusViewContainer>div.sc-iwsKbI>div.kBaSPa>p>span.cQRYis');
  // const element_bus = await page.$$('div.gUYDEX>div.bDsesi>div.BusViewContainer>div.sc-iwsKbI>div.kBaSPa>p>span.glJpds');

  const element_price = await page.$$('.bKUXLW');
  const element_bustype = await page.$$('.cQRYis');
  const element_bus = await page.$$('.glJpds');

  console.log(element_price)
  console.log(element_bustype)
  console.log(element_bus)

  for (var i = 0; i < element_price.length; i++){
    const price = await page.evaluate(element => element.textContent, element_price[i]);
    const bus_name = await page.evaluate(element => element.textContent, element_bus[i]);
    const bus_type = await page.evaluate(element => element.textContent, element_bustype[i]);
    
    console.log("Bus: ", bus_name, ", Bus type: ", bus_type)
    console.log("Price: ", price)
    console.log(i + 1)
  }

  await page.screenshot({path: 'example.png'});
  await page.pdf({ path: 'mmt.pdf' })


  // console.log("Bus: ", bus_name, ", Bus type: ", bus_type)
  // console.log("Price: ", price)

  await browser.close();
})();






























// const puppeteer = require('puppeteer')

// const SECRET_EMAIL = 'example@gmail.com'
// const SECRET_PASSWORD = 'secretpass123'

// const main = async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   })
//   const page = await browser.newPage()
//   await page.goto('https://facebook.com', { waitUntil: 'networkidle2' })
//   await page.waitForSelector('#login_form')
//   await page.type('input#email', SECRET_EMAIL)
//   await page.type('input#pass', SECRET_PASSWORD)
//   await page.click('#loginbutton')
//   // await browser.close()
// }

// main()











// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({headless: true});
//   const page = await browser.newPage();

//   // Navigates to the project README file
//   // 'https://github.com/GoogleChrome/puppeteer/blob/master/README.md');//
//   // await page.goto('https://bus.makemytrip.com/bus/search/Bangalore/Udumalaipettai/05-03-2020');
//   await page.goto('https://www.redbus.in/search?fromCityName=Madiwala%2C%20Bangalore&fromCityId=66008&toCityName=Koyambedu%2C%20Chennai&toCityId=66065&onward=25-Feb-2020&opId=0&busType=Any');

//   // Generates a PDF from the page content
//   await page.pdf({ path: 'overview.pdf' });

//   await browser.close();
// })();

// /html/body/div/div/div/div/div[3]/div[3]/div/div[2]/div[1]/div/div/div[2]/p/span[1]
// /html/body/div/div/div/div/div[3]/div[3]/div/div[2]/div[1]/div/div/div[2]/p/span[1]

// //*[@id="root"]/div/div/div[3]/div[3]/div/div[2]/div[1]/div/div/div[2]/p/span[1]





// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch(
//       {
//           // headless: true
//           headless: false
//       }
//   );
//   const page = await browser.newPage();
//   await page.setViewport({
//     width: 1920,
//     height: 1080,
//     deviceScaleFactor: 1,
//   })
//   // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0');
//   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.0 Safari/537.36');
//   await page.goto('https://guide.blazemeter.com/hc/en-us');//, { waitUntil: 'networkidle2' });
  

//   await page.waitForSelector('ul#categories');
//   await page.screenshot({path: 'example.png'});
//   const sections = await page.$$('ul#categories>li:nth-of-type(n)');
//   console.log(sections)

//   for (section in sections){
//     result = section
//     console.log(result)
//   }

//   await browser.close();
// })();
