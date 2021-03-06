const puppeteer = require('puppeteer')
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})



const crawl = async (offset) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto('https://v.qq.com/x/list/movie?sort=19&offset=' + offset * 30, {
        waitUntil: 'networkidle2'
    })
    await page.waitForSelector('.wrapper')
    await sleep(3000)
    const result = await page.evaluate(() => {
        const lists = document.querySelectorAll('.figures_list .list_item')
        const array = []
        if (lists.length > 0) {
            for (let i = 0; i < lists.length; i++) {
                let float = lists[i].querySelector('a.figure').getAttribute("data-float");
                let href = lists[i].querySelector('a.figure').getAttribute("href");
                let poster = "https:" + lists[i].getElementsByTagName('img')[0].getAttribute("src");
                let info = lists[i].querySelector(".figure_info") ? lists[i].querySelector(".figure_info").innerText : "";
                let title = lists[i].querySelector('.figure_title a') ? lists[i].querySelector('.figure_title a').innerText : "";
                let score_l = lists[i].querySelector('.figure_score .score_l') ? lists[i].querySelector('.figure_score .score_l').innerText : "0";
                let score_s = lists[i].querySelector('.figure_score .score_s') ? lists[i].querySelector('.figure_score .score_s').innerText : ".0";
                let score = score_l + score_s;
                let hasplay = lists[i].querySelector('.figure_count .num') ? lists[i].querySelector('.figure_count .num').innerText : "";
                let starring = lists[i].querySelectorAll('.figure_desc a');
                let starrings = [];
                if (starring.length > 0) {
                    for (let i = 0; i < starring.length; i++) {
                        starrings.push(starring[i].innerText);
                    }
                }
                array.push({
                    float: float,
                    href: href,
                    poster: poster,
                    info: info,
                    title: title,
                    score: score,
                    hasplay: hasplay,
                    starrings: starrings
                })
            }
            return array;
        }

    })
    process.send({
        res:result,
        offset:offset
    })
    await browser.close();
    return result;
}


let results = [];
let i = 0;
const getData = (index) => {
    if (index < 5) {
        return crawl(index).then(data => {
            if (!data) {
                return [];
            }
            return getData(index + 1).then(data1 => {
                if (data1) {
                    return [].concat(data, data1)
                }
            })
        })
    } else {
        return Promise.resolve([]);
    }
}

getData(i).then(res => {
    console.log('爬取完成')
    process.exit(0)
}).catch(e => {
    throw new Error(`爬取网页数据出错:${e}`)
})