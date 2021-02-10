/*
*桌台相关的路由 
*/
const express = require('express');
const pool = require('../../pool');
const r = express.Router();
//导出路由器模块
module.exports=r;

/*
*获取所有的桌台信息
*API：GET  /admin/table
*/
r.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_table',(err,result)=>{
        if(err)throw err;
        res.send({result});
    })
})
/*
*获取预约状态桌台的详情
*API：GET  /admin/table/reservation/:tid
*/
r.get('/reservation/:cid',(req,res)=>{
    pool.query('SELECT * FROM xfn_reservation WHERE =tableId?',
    [req.params.rid],(err,result)=>{
        if(err)throw err;
        pool.query('SELECT * FROM xfn_reservation WHERE tid=?',
        )
    })
})
/*
*获取占用状态桌台的详情
*API：GET  /admin/table/inuse/:tid
*/
r.get('/inuse/:tid',(req,res)=>{
    pool.query('SELECT * FROM xfn_table WHERE tid=?',
    [req.params.tid],(err,result)=>{
        if(err)throw err;
        res.send(result);
    })
})
/*
*修改桌台的状态
*API：PATCH  /admin/table
*/
r.patch('/',(req,res)=>{
    pool.query('UPDATE xfn_table SET status=?',[])
})
/*
*添加桌台
*API：POST  /admin/table
*/
r.post('/',(req,res)=>{
    var data = req.body;
    pool.query('INSERT INTO xfn_table SET ?',[data],
    (err,result)=>{
        if(err)throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:200, msg:'1 table added'});
        }
    })
})
/*
*删除桌台
*API：DELETE  /admin/table/:tid
*/
r.delete('/:tid',(req,res)=>{
    pool.query('DELETE FROM xfn_table WHERE tid=?',
    [req.params.tid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:200, msg:'table deleted success'});
        }else{
            res.send({code:400, msg:'table not exists'});
        }
    })
})

