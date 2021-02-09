/*
*菜品相关的路由 
*/
const express = require('express');
const pool = require('../../pool');
const r = express.Router();
//导出路由器模块
module.exports=r;

/*
*API: GET  /admin/dish
*获取所有的菜品(按类别进行分类)
*返回数据：
*  [
*     {cid:1, cname:'肉类', dishList:[{},{},...]}
*     {cid:2, cname:'蔬菜类', dishList:[{},{},...]}
*     ...
*  ] 
*/
r.get('/',(req,res)=>{
    //查询所有的菜品类别
    pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid',(err,result)=>{
        if(err)throw err;
        console.log(result);
        var categoryList = result;//菜品类别数组
        var count = 0;
        for(let c of categoryList){
            //循环查询每个类别下有哪些菜品
            pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC',
            c.cid,(err,result)=>{
                c.dishList = result;
                count++;
                if(count == categoryList.length){
                    res.send(categoryList);
                }
            })
        }
    })
})

/*
*API：POST  /admin/dish/image 
*请求参数：
*接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
*响应数据：
*  {code:200, msg:'upload success', fileName:'13524343543-2342.jpg'}
*/
//引入multer中间件
const multer = require('multer');
const fs = require('fs');
var upload = multer({
    dest: 'tmp/'    //指定客户端上传文件临时存储路径
})

//定义路由，使用文件上传中间件
r.post('/image',upload.single('dishImg'), (req,res)=>{
    console.log(req.file);    //客户端上传的图片
    console.log(req.body);    //客户端随同图片提交的字符数据
    //把客户端上传的文件从临时目录转移到永久的图片路径下
    var tmpFile = req.file.path   //临时文件地址
    var suffix  = req.file.originalname.substring(
    req.file.originalname.lastIndexOf('.'));//原始文件名中的后缀部分
    var newFile = randFileName(suffix);//目标文件名
    fs.rename(tmpFile,'img/dish/'+newFile, ()=>{
        res.send({code:200, msg:'upload success',fileName: newFile})
    })
})

//生成一个随机文件名
//参数：suffix表示要生成的文件名中的后缀
//形如：  135132463-8821.jpg
function randFileName(suffix){
    var time = new Date().getTime();
    var num = Math.floor(Math.random()*(10000-1000)+1000);//4位随机数
    return time + '-' +num + suffix;
}

/*
*API：POST /admin/dish
*请求参数：{title:'xx',imgUrl:'..jpg',price:xx,
*tetail:'xx',categoryId:xx} 
*添加一个新的菜品
*输出消息：
*    {code:200, msg:'dish added success', dishId:46}
*/
r.post('/',(req,res)=>{
    var data = req.body;
    pool.query('INSERT INTO xfn_dish SET ?',[data],
    (err,result)=>{
        if(err)throw err;
        res.send({code:200, msg:'dish added success', dishId:result.insertId});
    })
})

/*
*API：DELETE /admin/dish/:did
*根据指定的菜品编号删除该菜品
*输出数据：
*  {code:200, msg:'dish deleted success'}
*  {code:400, msg:'dish not exists'} 
*/
r.delete('/:did',(req,res)=>{
    pool.query('DELETE FROM xfn_dish WHERE did=?',
    [req.params.did],(err,result)=>{
        if(err)throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:200, msg:'dish deleted success'});
        }else{
            res.send({code:400, msg:'dish not exists'});
        }
    })
})

/*
*API：PUT /admin/dish
*请求参数：{did:xx, title:'xx',imgUrl:'..jpg',
*price:xx,detail:'xx',categoryId:xx}
*根据指定的菜品编号修改菜品
*输出数据：
*  {code:200, msg:'dish updated success'}
*  {code:400, msg:'dish not exists'} 
*/
r.put('/',(req,res)=>{
    var data = req.body;
    pool.query('UPDATE xfn_dish SET ? WHERE did=?',
    [data,data.did],(err,result)=>{
        if(err)throw err;
        console.log(result);
        if(result.changedRows>0){
            res.send({code:200, msg:'dish updated success'});
        }else if(result.affectedRows==0){
            res.send({code:400, msg:'dish not exists'});
        }
    })
})