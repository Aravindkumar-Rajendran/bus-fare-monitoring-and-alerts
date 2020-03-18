

const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const puppeteer = require('puppeteer');

// can also use below for indexing with limitation

// var elasticsearch = require('@elastic/elasticsearch');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace',
//   apiVersion: '7.5', // use the same version of your Elasticsearch instance
// });

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
await page.goto('https://bus.makemytrip.com/bus/search/Bangalore/Udumalaipettai/15-03-2020');

await page.waitForSelector('.BusViewContainer');
await page.screenshot({path: 'example.png'});
await page.pdf({ path: 'mmt.pdf' });

var resultsCount = await page.$$('.hToddA');
resultsCount = await page.evaluate(element => element.textContent, resultsCount[0])

const indexName = 'test'
const timeStamp = Date.now()
const scrapingDate = '15-03-2020' // date when you are scraping
const bookingDate = '15-03-2020' // date when you are booking a bus
const elementPrice = await page.$$('.bKUXLW');
const elementBustype = await page.$$('.cQRYis');
const elementBusName = await page.$$('.glJpds');
const elementArrival = await page.$$('.izTLmu');
const elementDeparture = await page.$$('.laKnSQ');
const elementTravelTime = await page.$$('.btSGRi');
const elementSeatsLeft = await page.$$('.BhRgU');
const elementRating = await page.$$('.eXbDWv');
let bulkInput = [];

console.log('No. of buses found: ', resultsCount)


/*
Object structure for one bus
{
bus_name:
bus_type:
bus_arrival:
bus_departure:
bus_travel_time:
seats_left:
rating:
price:
booking_date:
scraping_date:
time_stamp:
}
*/


if(elementPrice.length === elementBustype.length){
	for (var i = 0; i < elementPrice.length; i++){

		let bus_name = await page.evaluate(element => element.textContent, elementBusName[i]);
		let bus_type = await page.evaluate(element => element.textContent, elementBustype[i]);
		let bus_arrival = (await page.evaluate(element => element.textContent, elementArrival[i])).slice(0, -1);
		let bus_departure = (await page.evaluate(element => element.textContent, elementDeparture[i])).slice(0, -1);
		let bus_travel_time = await page.evaluate(element => element.textContent, elementTravelTime[i]);
		let seats_left = await page.evaluate(element => element.textContent, elementSeatsLeft[i]);
		let rating = await page.evaluate(element => element.textContent, elementRating[i]);
		let price = await page.evaluate(element => element.textContent, elementPrice[i]);

		let scrapedData =  {
			'bus_name': bus_name,
			'bus_type': bus_type,
			'bus_arrival': bus_arrival,
			'bus_departure': bus_departure,
			'bus_travel_time': bus_travel_time,
			'seats_left': seats_left,
			'rating': rating,
			'price': price,
			'booking_date': bookingDate,
			'scraping_date': scrapingDate,
			'time_stamp': timeStamp
			}
		
		bulkInput.push({ index: { _index: indexName } })
		bulkInput.push(scrapedData)

		console.log(scrapedData)
		console.log("Added", i + 1);
	}
	console.log("Out of the for loop");
	await run(bulkInput);
}
else {
	console.log('[ERROR] lengths are not same')
}

await browser.close();
console.log('Mission accomplished - Closing the browser')
})();


async function run (bulkInput) {
const { body: bulkResponse } = await client.bulk({
	refresh: true,
	body: bulkInput
})
console.log("Out of the ingest loop")

try {
	if (bulkResponse.errors) {
	console.log("Error in response", bulkResponse)
	process.exit(1)
	}
}
catch(err){
	console.log("Error is : ", err)
}

console.log("Out of the function")
}
