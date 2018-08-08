const pc = require('child_process')
const {
    resolve
} = require('path')

;
(async () => {
    const script = resolve(__dirname, '../crawl/index.js')
    const child = pc.fork(script, [])
    let invoked = false
    child.on('error', (err) => {
        if (invoked) return
        invoked = true
        console.log(err)
    })
    child.on('exit', (code) => {
        if (invoked) return
        invoked = false
        let err = code === 0 ? null : new Error('exit code' + code)
    })
    child.on('message',data=>{
        let result = data.res
        console.log(result)
    })
})()