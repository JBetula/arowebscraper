const { connectDB } = require('./db.js')
const {scrape} = require('./scraper/scraper.js')
const {metarEntry} = require('./models/metarModel.js')




const main = async () => {
    try {
        const list = await scrape();
        list.metar.forEach(e => {
            console.log("a",e.airport,e.wx)
        })
        // console.log(list)
    } catch (error) {
        console.error('Error:', error);
    }
};

connectDB()
main()