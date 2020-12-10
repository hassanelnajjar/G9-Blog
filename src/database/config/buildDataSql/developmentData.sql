BEGIN;
INSERT INTO users (user_name) VALUES ('Sondos'),('Khamis'),('Alaa'),('Hasan'),('PROF:Alaa');

INSERT INTO posts (post_text,users_id) VALUES ('Hi',2),('Bye',3);

INSERT INTO comments (comment_text_content,users_id,post_id) VALUES ('Hello',1,1),('Goodluck',2,2),('See you',1,2);

COMMIT;