BEGIN;

INSERT INTO users (user_name,user_email,user_password) VALUES ('alaa','alaa@gmail.com','$2b$10$9CJ0YSBuUIgvBMbsb7SheO4U0F9UaU3NrmlHXBYU6d4I0SzSvyyVy');

INSERT INTO posts (post_text,users_id) VALUES ('Hi',1);

INSERT INTO comments (comment_text_content,users_id,post_id) VALUES ('Hello',1,1);

COMMIT;