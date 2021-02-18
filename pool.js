//引入mysql模块
const mysql = require('mysql');
//创建数据库连接池对象
const pool = mysql.createPool({
    // host:'127.0.0.1',
    // port:3306,
    // user:'root',
    // password:'',
    // database:'xiaofeiniu',
    // connectionLimit:20

    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
    connectionLimit: 3
});


//导出连接池对象，供其他模块使用
module.exports=pool;