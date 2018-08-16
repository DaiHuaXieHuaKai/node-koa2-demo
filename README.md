# node-koa2-demo
根据慕课网学习koa2的案例

### Day1
初始化git项目，并初始化package.json

新建入口文件server/index.js，并修改package.json增加快捷执行命令npm start。

安装koa，并完成初始配置
```

//npm install koa@latest -S

const Koa = require('koa')

const app = new Koa()

app.use(async (ctx,next)=>{
    ctx.body = "welcome"
})

app.listen(4333)
```

### Day2
使用pug动态模板引擎

新建文件pug.js
```
//npm install pug -S
const Koa = require('koa')
const pug = require('pug')

const app = new Koa()

app.use(async (ctx,next)=>{
    ctx.body = pug.render(require(./pug),{
        you:'Teacher',
        me: 'Student'
    })
})

app.listen(4333)

/* pug.js */
module.exports = `
doctype html
html
 meta(charset="utf-8")
 meta(name="viewport",content="width=device-width,inital-scal=1")
 title 这是一个pug模板
 body
  div.container
   h1 Hello #{you}
   p this is #{me} first pug template.
`
```

### Day3 
使用koa-views对模板引擎进行统一管理

新建文件夹views，并新增文件index.pug

根据业务需求更改Views结构，拆分公共部分

```
//npm install koa-views -S

const Koa = require('koa')
const pug = require('pug')
const views = require('koa-views')
const { resolve } = require('path')

const app = new Koa()

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug' //后缀名为pug的模板
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Zhao',
        me: 'Ying'
    })
})

app.listen(4333)
```

代码存放于node-koa-pug分支

### Day4
使用puppeter进行腾讯视频网页数据爬取，并使用递归实现多页数据爬取。

使用child_process,采用子进程方式运行。

完整代码置于node-koa-puppeter分支
```
const puppeteer = require('puppeteer')
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})


const crawl = async (offset) => {
    console.log(`======================开始爬取第${offset}页======================`)
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
    page.on('console', msg => console.log(`爬取======${msg.text()}======完成`));
    const result = await page.evaluate(() => {
        const lists = document.querySelectorAll('.figures_list .list_item')
        const array = []
        if (lists.length > 0) {
            for (let i = 0; i < lists.length; i++) {
                let poster = lists[i].getElementsByTagName('img')[0].getAttribute("src");
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
                    poster: poster,
                    info: info,
                    title: title,
                    score: score,
                    hasplay: hasplay,
                    starrings: starrings
                })
                console.log(title)
            }
            return array;
        }

    })
    console.log(`======================完成爬取第${offset}页======================`)
    await browser.close();
    return result;
}


let results = [];
let i = 0;
const getData = (index) => {
    if(index<3){
        return crawl(index).then(data => {
            if (!data) {
                return [];
            }
            return getData(index + 1).then(data1 => {
                if(data1){
                    return [].concat(data, data1)
                }
            })
        })
    }else{
        return new Promise(resolve=>resolve([]));
    }
}

getData(i).then(res => {
        process.send({res})
        process.exit(0)
}).catch(e=>{
    console.log(e)
})
```

### Day5

使用七牛云，并实现将文件上传至七牛云进行云存储

实现代码放于node-koa-qiniu分支
```
const qiniu = require('qiniu')
const {
    ACCESS_KEY,
    SECRET_KEY
} = require('../config')

const bucket = "infinite"//空间名

const localFile = "https://puui.qpic.cn/vcover_vt_pic/0/2ianvrarzdoj4qr1533625003/220"//要上传的文件

const fileSaveName = "test-save-"+Math.random()+".png"

let mac = new qiniu.auth.digest.Mac(ACCESS_KEY,SECRET_KEY)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac,cfg)

//构建上传函数
const uploadFile = async (localFile,fileSaveName)=>{
    return new Promise((resolve,reject)=>{
        client.fetch(localFile,bucket,fileSaveName,(err,ret,info)=>{
            if(err) {reject(err)}
            else{
                if(info.statusCode===200){
                    resolve({ret})
                }else{
                    reject(info)
                }
            }
            
        })
    })
}

;(async ()=>{
    uploadFile(localFile,fileSaveName).then(data=>{
        console.log(data)
    }).catch(err=>console.log(err))
})()
```

### Day6
使用MongoDB对爬取的数据进行存储。并优化爬取内容。

完整代码于node-koa-mongoose分支

```
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    float: String,
    href: String,
    poster: String,
    info: String,
    title: String,
    score: String,
    hasplay: String,
    starrings: Array,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
},{collection:"movie_qq"})

movieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

mongoose.model("MovieModel", movieSchema)


//使用glob实现文件全部加载
exports.initSchema = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).map(schema=>require(schema))
}
```

### Day7
使用koa-router并借助koa-compose实现拆分路由文件，建立对应service完成业务逻辑编辑

到此一个基本的项目结构就搭建完毕

完整代码于node-koa-router分支


```
//路由拆分核心代码
const compose = require('koa-compose')
const glob = require('glob')
const {
    resolve
} = require('path')

registerRouter = () => {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter(value => (value.indexOf('index.js') === -1))
        .map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter

//简单service
const mongoose = require('mongoose')

class Movie {

   static async getAllMovie(){
        const MovieModel = mongoose.model('MovieModel')
        const movie = await MovieModel.find({}).sort({'meta.updatedAt':-1})
        return movie
    }
}

module.exports = Movie
```