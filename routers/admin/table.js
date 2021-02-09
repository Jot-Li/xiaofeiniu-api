/*
*桌台相关的路由 
*/
const express = require('express');
const r = express.Router();
const pool = require('../../pool');
//导出路由器模块
module.exports=r;

/*
*获取所有的桌台信息
*API：GET  /admin/table
*/

/*
*获取预约状态桌台的详情
*API：GET  /admin/table/reservation/:tid
*/

/*
*获取占用状态桌台的详情
*API：GET  /admin/table/inuse/:tid
*/

/*
*修改桌台的状态
*API：PATCH  /admin/table
*/

/*
*添加桌台
*API：POST  /admin/table
*/

/*
*删除桌台
*API：DELETE  /admin/table/:tid
*/

