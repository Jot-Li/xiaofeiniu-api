/*
*管理员相关的路由 
*/
const express = require('express');
const pool = require('../../pool');
const r = express.Router();
//导出路由器模块
module.exports=r;

/*
*GET请求可以有主体吗?
*API：GET  /admin/login
*请求数据：{aname: 'xxx', apwd:'xxx'}
*返回数据:
*  {code: 200, msg: 'login success'}
*  {code: 400, msg: 'aname or apwd err'}
*/
r.get('/login/:aname&:apwd',(req,res)=>{
    pool.query('SELECT * FROM xfn_admin WHERE aname=? AND apwd=?',
    [req.params.aname,req.params.apwd],(err,result)=>{
        if(err)throw err;
        console.log(result.data);
        // if(){}
    })
})

/*
*API：PATCH  /admin
*请求数据：{aname: 'xxx', oldPwd:'xxx', newPwd:'xxx'}
*根据管理员名和密码修改管理员密码
*返回数据:
*  {code: 200, msg: 'modified success'}
*  {code: 400, msg: 'aname or apwd err'}
*  {code: 401, msg: 'apwd not modified'}
*/
r.patch('/',(req,res)=>{
    var data = req.body;
    pool.query('UPDATE xfn_admin SET ? WHERE aname=?',
    [data,data.aname],(err,result)=>{
        if(err)throw err;

    })
})