const Koa = require('koa')

const app = new Koa()

app.use(async (ctx,next)=>{
    ctx.body = "welcome"
})

app.listen(4333)