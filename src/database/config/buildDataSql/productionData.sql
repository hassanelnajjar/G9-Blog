BEGIN;
insert into users(id,user_name) values
(1,'Sondos'),
(2,'Khamis'),
(3,'Alaa'),



INSERT INTO posts(post_text,posted_at_time,users_id) values ('Hi','2020-12-09T14:43:34.945Z',2);


INSERT INTO comments (comment_text_content,users_id,post_id) VALUES ('Hello',1,1),('Goodluck',2,2),('See you',1,2);




COMMIT;


