const os = require('os')

class Os {

   static async getOsInfo(){
       return {
           hostname:os.hostname(),//主机名
           type:os.type(),//操作系统类型
           platform:os.platform(),//操作平台
           release:os.release(),//操作系统版本
           totalmem:os.totalmem()//系统总内存
       }
    }
}

module.exports = Os