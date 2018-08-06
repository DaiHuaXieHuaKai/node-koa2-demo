# node-koa2-demo
根据慕课网学习koa2的案例

### Day1
初始化git项目，并初始化package.json

新建入口文件server/index.js，并修改package.json增加快捷执行命令npm start。

安装koa，并完成初始配置
```

//npm install koa@latest -S

const Koa = require('koa')

const app = new Koa()

app.use(async (ctx,next)=>{
    ctx.body = "welcome"
})

app.listen(4333)
```