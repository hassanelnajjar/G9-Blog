BEGIN;

INSERT INTO users (user_name,user_email,user_password) VALUES ('alaa','alaa@gmail.com','123456');

INSERT INTO posts (post_text,users_id) VALUES ('Hi',1);

INSERT INTO comments (comment_text_content,users_id,post_id) VALUES ('Hello',1,1);

COMMIT;