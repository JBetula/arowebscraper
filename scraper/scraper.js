const puppeteer = require('puppeteer');

// url = 'https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=314&type=MET'
metarUrl = 'https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=300&type=MET'
tafUrl = 'https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=304&type=MET'
notamURL ='https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=159&type=AIS'

// async function scrape() {
const scrape = async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            headless: 'new',
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.goto(metarUrl)
        const content = await page.content()

        const metarData = await page.$$eval('.tor-link-text-row', elements => {
            return elements.map(element => {
                const airport = element.querySelector('.tor-link-text-row-item.item-header').textContent.trim();
                const wx = element.querySelector('.tor-link-text-row-item.item-text').textContent.trim();
                return { airport, wx };
            });
        });

        await page.goto(tafUrl)
        const contentTaf = await page.content()
        const tafData = await page.$$eval('.tor-link-text-row', elements => {
            return elements.map(element => {
                const airport = element.querySelector('.tor-link-text-row-item.item-header').textContent.trim();
                const wx = element.querySelector('.tor-link-text-row-item.item-text').textContent.trim();
                return { airport, wx };
            });
        });


        await page.goto(notamURL)
        const contentNotam = await page.content()
        const notams = await page.evaluate(() => {
            const notam = document.querySelector('pre.linkTextNormal');
            return notam.textContent;
        });
        


        // console.log(metarData.find(data => data.airport === ""))
        // console.log(tafData.find(data => data.airport === ""))

        const completedData = {
            metar: metarData,
            taf: tafData,
            notam:notams
        }
        browser.close()
        // console.log(completedData)
        return completedData

    } catch (error) {
        console.log(error)
    }

}
scrape()

// scrape().then(list => {
    // console.log(list)
// })

module.exports = { scrape };