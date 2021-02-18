/*
*菜品类别相关的路由
*/
//引入express框架
const express = require('express');
//引入数据库连接池模块
const pool = require('../../pool');
//创建路由器对象
var r = express.Router();
//导出路由器模块
module.exports=r;


/*
API：GET  /admin/category
含义：客户端获取所有的菜品类别，按编号升序排列
返回值形如：
    [{cid: 1,cname: '...'},{...}]
*/
r.get('/',(req,res)=>{
  pool.query('SELECT * FROM xfn_category ORDER BY cid',
  (err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})

/*
API：DELETE  /admin/category/:cid
含义：根据表示菜品编号的路由参数，删除该菜品
返回值形如：
    {code: 200,msg: '1 category deleted'}
    {code: 400,msg: '0 category deleted'}
*/
r.delete('/:cid',(req,res)=>{
  //注意：删除菜品类别前必须先把属于该类别的菜品的
  //类别编号设置为NULL
  pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?',
  req.params.cid,(err,result)=>{
    if(err)throw err;
    //至此指定类别的菜品已经修改完毕
    pool.query('DELETE FROM xfn_category WHERE cid=?',req.params.cid,
    (err,result)=>{
      if(err)throw err;
      console.log(result);
      //获取DELETE语句在数据库中影响的行数
      if(result.affectedRows>0){
        res.send({code:200, msg:'1 category deleted'});
      }else{
        res.send({code:400, msg:'0 category deleted'});
      }
    })
  })
})

/*
API：POST  /admin/category
请求参数：{cname:'xxx'}
含义：添加新的菜品类别
返回值形如：
    {code: 200,msg: '1 category added, cid: x'}
*/
r.post('/',(req,res)=>{
  console.log(`获取到请求数据`);
  var data = req.body;
  pool.query('INSERT INTO xfn_category SET ?',data,
  (err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({
        code:200,
        msg:'1 category added',
        cid:result.insertId
      });
    }
  })
})

/*
API：PUT  /admin/category
请求参数：{cid: xx, cname:'xxx'}
含义：根据菜品类别编号修改该类别
返回值形如：
    {code: 200,msg: '1 category modified'}
    {code: 400,msg: '0 category modified, not exists'}
    {code: 401,msg: '0 category modified, no modification'}
*/
r.put('/',(req,res)=>{
  var data = req.body;
  //TODO：此处可以对输入的数据进行验证
  pool.query('UPDATE xfn_category SET ? WHERE cid=?',
  [data,data.cid],(err,result)=>{
    console.log(result);
    if(err)throw err;
    if(result.changedRows>0){//实际上修改了一行
      res.send({code: 200,msg: '1 category modified'});
    }else if(result.affectedRows==0){
      res.send({code: 400,msg: 'category not exists'});
    }else if(result.affectedRows==1 &&
      result.changedRows==0){//影响到一行，但修改了0行——新值与旧值完全一样
      res.send({code: 401,msg:'no category modified'})
    }
  })
})





