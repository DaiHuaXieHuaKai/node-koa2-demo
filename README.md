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

### Day2
使用pug动态模板引擎

新建文件pug.js
```
//npm install pug -S
const Koa = require('koa')
const pug = require('pug')

const app = new Koa()

app.use(async (ctx,next)=>{
    ctx.body = pug.render(require(./pug),{
        you:'Teacher',
        me: 'Student'
    })
})

app.listen(4333)

/* pug.js */
module.exports = `
doctype html
html
 meta(charset="utf-8")
 meta(name="viewport",content="width=device-width,inital-scal=1")
 title 这是一个pug模板
 body
  div.container
   h1 Hello #{you}
   p this is #{me} first pug template.
`
```

### Day3 
使用koa-views对模板引擎进行统一管理

新建文件夹views，并新增文件index.pug

根据业务需求更改Views结构，拆分公共部分

```
//npm install koa-views -S

const Koa = require('koa')
const pug = require('pug')
const views = require('koa-views')
const { resolve } = require('path')

const app = new Koa()

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug' //后缀名为pug的模板
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Zhao',
        me: 'Ying'
    })
})

app.listen(4333)
```

代码存放于node-koa-pug分支