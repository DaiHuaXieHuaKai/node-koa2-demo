const Koa = require('koa')
const pug = require('pug')
const { pugView } = require('./views')

const app = new Koa()

app.use(async (ctx,next)=>{
    ctx.body = pug.render(pugView,{
        you:'Zhao',
        me: 'Ying'
    })
})

app.listen(4333)