/*
*全局设置相关的路由 
*/
const express = require('express');
const r = express.Router();
const pool = require('../../pool');
//导出路由器模块
module.exports=r;

/*
*获取全局设置
*API：GET  /admin/settings 
*/
r.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_settings',(err,result)=>{
        if(err)throw err;
        res.send(result);
    })
})

/*
*修改全局设置
*API：PUT  /admin/settings 
*/
