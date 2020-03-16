import scrapy

class MmtSpider(scrapy.Spider):
    name = 'mmtspider'
    start_urls = ['https://bus.makemytrip.com/bus/search/Bangalore/Udumalaipettai/24-02-2020']

    def parse(self, response):
        
        for quote in response.css('div.root'):
            print(quote.css('nth-child(3)'))
            yield {
                    "text": quote.css('nth-child(3)')
            }