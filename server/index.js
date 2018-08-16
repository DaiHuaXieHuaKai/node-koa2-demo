const Koa = require('koa')
const pug = require('pug')
const views = require('koa-views')
const { resolve } = require('path')
const { connect,initSchema } = require('./database')
const registerRouter  = require('./routes')

const app = new Koa()


;(async ()=>{
    await connect()
    await initSchema()
    //require('./tasks/movie.js')
})()

app.use(registerRouter())

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