/*
*全局设置相关的路由 
*/
const express = require('express');
const pool = require('../../pool');
const r = express.Router();
//导出路由器模块
module.exports=r;

/*
*获取全局设置
*API：GET  /admin/settings 
*获取所有的全局设置信息
*返回数据：
*    {appName:'xx', adminUrl:'xx',appUrl:'',...}
*/
r.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_settings LIMIT 1',(err,result)=>{
        if(err)throw err;
        res.send(result[0]);
    })
})

/*
*修改全局设置
*API：PUT  /admin/settings 
*修改所有的全局设置信息
*返回数据：
*    {code:200,msg: 'settings updated success'}
*/
r.put('/',(req,res)=>{
    var data = req.body;
    pool.query('UPDATE xfn_settings SET ?',
    [data],(err,result)=>{
        if(err)throw err;
        console.log(result);
        if(result.changedRows==1){
            res.send({code:200, msg:'settings updated success'});
        }else if(result.affectedRows==0){
            res.send({code:400, msg:'updated fail'})
        }
    })
})
