const Router = require('koa-router')
const router = new Router()
router.prefix('/movie')

const Movie = require('../services/movie.js')



router.get('/all',async (ctx,next)=>{
    const data = await Movie.getAllMovie()
    ctx.body = {err:0,msg:"查询成功",data}
})

module.exports = router