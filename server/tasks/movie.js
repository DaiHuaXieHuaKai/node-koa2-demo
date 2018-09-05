const pc = require('child_process')
const {
    resolve
} = require('path')
const mongoose = require('mongoose')
const MovieModel = mongoose.model('MovieModel')

;
(async () => {
    const script = resolve(__dirname, '../crawl/index.js')
    const child = pc.fork(script, [])
    let invoked = false
    child.on('error', (err) => {
        if (invoked) return
        invoked = true
        throw new Error(`网页爬取进程异常：${err}`)
    })
    child.on('exit', (code) => {
        if (invoked) return
        invoked = true
        let err = code === 0 ? null : new Error('exit code' + code)
    })
    child.on('message', data => {
        let result = data.res
        let offset = data.offset
        console.log(`--------------第${offset}页------------------`)
        if (result) {
            result.map(async (item, index) => {
                let movie = await MovieModel.findOne({
                    float: item.float
                })
                if (!movie) {
                    movie = new MovieModel(item)
                    movie.save(err => {
                        if (!err) {
                            console.log(`~~~~~~~~~~~${movie.title}保存完成~~~~~~~~~~~`)
                        }else{
                            console.log(err)
                        }
                    })
                }else{
                    console.log(`===============数据已存在==============`)
                }
            })
        }
    })
})()