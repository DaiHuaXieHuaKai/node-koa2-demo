const Router = require('koa-router')

const router = new Router()

router.get('/',(ctx,next)=>{
    ctx.body = "welcome"
})


module.exports = router