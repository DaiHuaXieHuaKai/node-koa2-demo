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