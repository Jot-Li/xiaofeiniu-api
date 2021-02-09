/*
  小肥牛扫码点餐项目API子系统
*/
const PORT = 8090;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRouter = require('./routers/admin/category')
const adminRouter = require('./routers/admin/admin');
const dishRouter = require('./routers/admin/dish');
const settingsRouter = require('./routers/admin/settings');

//创建HTTP应用服务器
var app = express();
app.listen(PORT,()=>{
    console.log(`API服务器启动成功，Server Listening `+PORT+`...`);
})

//使用中间件
app.use(cors());
// app.use(bodyParser.urlencoded({}));//把application/x-www-form-urlencoded
//格式的请求主体数据解析出来放入req.body属性

app.use(bodyParser.json());//把application/json
//格式的请求主体数据解析出来放入req.body属性

//挂载路由器
app.use('/admin/category',categoryRouter);
app.use('/admin',adminRouter);
app.use('/admin/dish',dishRouter);
app.use('/admin/settings',settingsRouter);