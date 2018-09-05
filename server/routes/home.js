const Router = require('koa-router')


const Os = require('../services/os.js')
const router = new Router()

router.get('/',async (ctx,next)=>{
     
    ctx.body = ctx
})


module.exports = router