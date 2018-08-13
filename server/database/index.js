const mongoose = require('mongoose')
mongoose.Promise = global.Promise //将mongoose的Promise替换为ES6的Promise
const {
    DB_URL
} = require('../config')

const glob = require('glob')

const {resolve} = require('path')
exports.connect = () => {
    let connect_min_times = 0;
    let connect_max_times = 5;
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(DB_URL)

        mongoose.connection.on('disconnected', () => {
            connect_min_times++;
            if (connect_min_times < connect_max_times) {
                mongoose.connect(DB_URL)
            } else {
                throw new Error("已断开连接")
            }
        })

        mongoose.connection.on('error', (err) => {
            connect_min_times++;
            if (connect_min_times < connect_max_times) {
                mongoose.connect(DB_URL)
            } else {
                reject(err)
            }

        })
        mongoose.connection.once('open', () => {
            console.log("Connect Success")
            resolve()
        })
    })
}

exports.initSchema = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).map(schema=>require(schema))
}