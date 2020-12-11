BEGIN;
insert into users(id,user_name) values
(1,'Sondos'),
(2,'Khamis'),
(3,'Alaa'),
(5,'PROF:Alaa'),
(6,'Alaa Saadeddin'),
(9,'Alaa Sahloub'),
(10,'khamis'),
(11,'khamis_hesham'),
(12,'user@use.com'),
(13,'Safi'),
(14,'omar199523'),
(15,'Hassan');



INSERT INTO posts(post_text,posted_at_time,users_id) values ('Hi','2020-12-09T14:43:34.945Z',2);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('Bye','2020-12-09T14:43:34.945Z',3);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('Ya Welcome :)','2020-12-09T14:50:28.768Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('مرحبا بكم في فيسبوك ^_^','2020-12-09T14:51:37.610Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('وأخييييييرااااا خلصناااا','2020-12-09T14:52:36.291Z',1);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('لقد هرمنا من أجل هذه اللحظة >_<','2020-12-09T14:54:18.282Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('يلااا بااااااي من هووووووووون','2020-12-09T14:54:50.468Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('هـــــــــــــــــــــــــــــــــــــــــــــــــــــــاي يولاد 
','2020-12-09T14:56:29.913Z',9);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('_-_ تقعدوش تغطوا على الطوش اللي علي بده يعرفها ','2020-12-09T14:57:50.017Z',10);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('روق ي حسن ','2020-12-09T14:59:39.147Z',9);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('اببال','2020-12-09T15:42:20.745Z',11);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('الفيسبوك تبعنا قلب لدردشة ههههههههههه','2020-12-09T18:23:50.188Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('يسعد مساؤكم ي جماعة مقدما .. ويسعد مساك يا علي خصوصا .. تسحيجة من الفيسبوك تبعنا ههههه

','2020-12-10T09:45:45.260Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('هلا بالخميس :) ','2020-12-10T10:15:20.327Z',1);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('أشعر بالفخر :) مع آلاء سحلوب وحسن النجار و 2 آخرين ^_^','2020-12-10T10:15:46.652Z',6);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('خف علينا :)','2020-12-10T10:18:26.137Z',13);
INSERT INTO posts(post_text,posted_at_time,users_id) values ('Hello ','2020-12-10T16:21:51.665Z',14);


INSERT INTO comments (comment_text_content,users_id,post_id) VALUES ('Hello',1,1),('Goodluck',2,2),('See you',1,2);




COMMIT;


