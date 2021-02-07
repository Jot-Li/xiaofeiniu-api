//引入mysql模块
const mysql = require('mysql');
//创建数据库连接池对象
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'xiaofeiniu',
    connectionLimit:20
});

//导出连接池对象，供其他模块使用
module.exports=pool;