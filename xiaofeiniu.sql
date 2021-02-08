SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;

/* 管理员 */
CREATE TABLE xfn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(32) UNIQUE,
    apwd VARCHAR(64)
);
INSERT INTO xfn_admin VALUES
(NULL,'admin',PASSWORD('123456')),
(NULL,'boss',PASSWORD('999999'));

/* 全局设置 */
CREATE TABLE xfn_settings(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    appName VARCHAR(32),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    APPuRL VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(128)
);
INSERT INTO xfn_settings VALUES
(NULL,'小肥牛','http://127.0.0.1:8090',
'http://127.0.0.1:8091',
'http://127.0.0.1:8092',
'京ICP备12003709号-3',
'Copyright © 北京达内金桥科技有限公司版权所有');

/* 桌台表 */
CREATE TABLE xfn_table(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tName VARCHAR(32),
    type VARCHAR(32),
    status INT
);
INSERT INTO xfn_table VALUES
(NULL,'福满堂','6-8人桌',1),
(NULL,'金镶玉','4人桌',2),
(NULL,'寿齐天','10人桌',3),
(NULL,'全家福','2人桌',0),
(NULL,'福满堂','6-8人桌',1),
(NULL,'金镶玉','4人桌',2),
(NULL,'寿齐天','10人桌',3),
(NULL,'全家福','2人桌',0),
(NULL,'福满堂','6-8人桌',1),
(NULL,'金镶玉','4人桌',2),
(NULL,'寿齐天','10人桌',3),
(NULL,'全家福','2人桌',0);

/* 桌台预定信息 */
CREATE TABLE xfn_reservation(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    contactName VARCHAR(32),
    phone VARCHAR(16),
    contactTime BIGINT,
    dinnerTime BIGINT,
    tableId INT,
    FOREIGN KEY(tableId) REFERENCES xfn_table(tid)
);
INSERT INTO xfn_reservation VALUES
(NULL,'丁丁','13571634516',1612591824960,1612611000000,1),
(NULL,'当当','13856427462',1613241824960,1617541000000,2),
(NULL,'豆豆','15986435612',1612556324960,1685311000000,3),
(NULL,'丫丫','18631624578',1612789824960,1614811000000,4),
(NULL,'嘿嘿','17732451945',1612591824960,1612611000000,5),
(NULL,'哈哈','19945157842',1613241824960,1617541000000,6),
(NULL,'亮亮','15612843144',1612556324960,1685311000000,7),
(NULL,'然然','15831624578',1612789824960,1614811000000,8),
(NULL,'东东','18751341202',1612591824960,1612611000000,9),
(NULL,'华华','13571634516',1613241824960,1617541000000,10),
(NULL,'猪猪','18423157421',1612556324960,1685311000000,11),
(NULL,'羊羊','13571634516',1612789824960,1614811000000,12);

/* 菜品类别 */
CREATE TABLE xfn_category(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32)
);
INSERT INTO xfn_category VALUES
(NULL,'捞派类'),
(NULL,'肉类'),
(NULL,'丸滑类'),
(NULL,'海鲜河鲜类'),
(NULL,'蔬菜豆制类'),
(NULL,'菌菇类');

/* 菜品 */
CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32),
    imgUrl VARCHAR(128),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    categoryId INT,
    FOREIGN KEY(categoryId) REFERENCES xfn_category(cid)
);
INSERT INTO xfn_dish VALUES
(10000,'捞派毛肚','2019090416505297767.jpg',56,
'选自牛的草肚，采用流水清洗、撕片，分切等工艺，
锅开后涮10-15秒即可食用。',1),
(NULL,'精品肥牛','2019090416531168469.jpg',68,
'肥牛是精选进口、自然生长谷饲100天以上的牛。
刨成薄片的牛肉。口感更细腻、化渣。',2),
(NULL,'罗非鱼','2019072016010522276.jpg',39,
'经过特殊方式调理，使口感松嫩，无骨无刺，余味悠长。',3),
(NULL,'鳕鱼虾滑','2019072016074346937.jpg',79,
'选择富含多种维生素深海鳕鱼，搭配海底捞独特虾滑，
健康营养，涮锅3分钟，左右即可食用。',4),
(NULL,'长生菜','2019072117105237280.jpg',18,
'来自山东、云南、河北、江苏等地的新鲜长生菜、
经过挑选、清洗、口感脆嫩，涮1分钟左右即可食用。',5),
(NULL,'金针菇','2019072015583036366.jpg',29,
'经过浸泡、挑选、装盘而成。口感脆嫩，久煮不化，
营养健康，锅开后再煮3分钟左右即可食用，口感爽脆。',6),
(NULL,'捞派肥猪','2019090416505297767.jpg',56,
'选自牛的草肚，采用流水清洗、撕片，分切等工艺，
锅开后涮10-15秒即可食用。',1),
(NULL,'精品肥羊','2019090416531168469.jpg',68,
'肥牛是精选进口、自然生长谷饲100天以上的牛。
刨成薄片的牛肉。口感更细腻、化渣。',2),
(NULL,'八爪鱼','2019072016010522276.jpg',39,
'经过特殊方式调理，使口感松嫩，无骨无刺，余味悠长。',3),
(NULL,'滑嫩蟹棒','2019072016074346937.jpg',79,
'选择富含多种维生素深海鳕鱼，搭配海底捞独特虾滑，
健康营养，涮锅3分钟，左右即可食用。',4),
(NULL,'茼蒿','2019072117105237280.jpg',18,
'来自山东、云南、河北、江苏等地的新鲜长生菜、
经过挑选、清洗、口感脆嫩，涮1分钟左右即可食用。',5),
(NULL,'杏鲍菇','2019072015583036366.jpg',29,
'经过浸泡、挑选、装盘而成。口感脆嫩，久煮不化，
营养健康，锅开后再煮3分钟左右即可食用，口感爽脆。',6),
(NULL,'捞派肥驴','2019090416505297767.jpg',56,
'选自牛的草肚，采用流水清洗、撕片，分切等工艺，
锅开后涮10-15秒即可食用。',1),
(NULL,'精品肥鸡','2019090416531168469.jpg',68,
'肥牛是精选进口、自然生长谷饲100天以上的牛。
刨成薄片的牛肉。口感更细腻、化渣。',2),
(NULL,'黑虎虾','2019072016010522276.jpg',39,
'经过特殊方式调理，使口感松嫩，无骨无刺，余味悠长。',3),
(NULL,'鱼豆腐','2019072016074346937.jpg',79,
'选择富含多种维生素深海鳕鱼，搭配海底捞独特虾滑，
健康营养，涮锅3分钟，左右即可食用。',4),
(NULL,'娃娃菜','2019072117105237280.jpg',18,
'来自山东、云南、河北、江苏等地的新鲜长生菜、
经过挑选、清洗、口感脆嫩，涮1分钟左右即可食用。',5),
(NULL,'木耳','2019072015583036366.jpg',29,
'经过浸泡、挑选、装盘而成。口感脆嫩，久煮不化，
营养健康，锅开后再煮3分钟左右即可食用，口感爽脆。',6);

/* 订单 */
CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tableId INT,
    FOREIGN KEY(tableId) REFERENCES xfn_table(tid)
);
INSERT INTO xfn_order VALUES
(NULL,1612591824960,1616587824960,3,1),
(NULL,1612591824960,1616587824960,8,2),
(NULL,1612591824960,1616587824960,4,3),
(NULL,1612591824960,1616587824960,3,4),
(NULL,1612591824960,1616587824960,2,5),
(NULL,1612591824960,1616587824960,6,6),
(NULL,1612591824960,1616587824960,9,7),
(NULL,1612591824960,1616587824960,10,8);

/* 订单详情 */
CREATE TABLE xfn_order_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,
    dishId INT,                 /*菜品编号*/
    dishCount INT,              /*份数*/
    customerNmae VARCHAR(32),   /*顾客名称*/
    orderId INT,                /*订单编号*/
    FOREIGN KEY(dishId) REFERENCES xfn_dish(did),
    FOREIGN KEY(orderId) REFERENCES xfn_order(oid)
);
INSERT INTO xfn_order_detail VALUES
(NULL,10001,1,'丁丁',1),
(NULL,10003,1,'当当',2),
(NULL,10006,1,'豆豆',3),
(NULL,10009,1,'丫丫',4),
(NULL,10003,1,'呼呼',5),
(NULL,10006,1,'哈哈',6),
(NULL,10005,1,'啦啦',7),
(NULL,10010,1,'洛洛',8);
