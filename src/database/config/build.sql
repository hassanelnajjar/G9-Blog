BEGIN;

DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
user_name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO users (user_name) VALUES ('Sondos'),('Khamis'),('Alaa'),('Hasan'),('PROF:Alaa');

CREATE TABLE posts(
id SERIAL PRIMARY KEY,
post_text TEXT NOT NULL,
posted_at_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
users_id INTEGER REFERENCES users(id)
);

INSERT INTO posts (post_text,users_id) VALUES ('Hi',2),('Bye',3);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
comment_text_content text NOT NULL,
commented_at_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
users_id INTEGER REFERENCES users(id),
post_id INTEGER REFERENCES posts(id)
);

INSERT INTO comments (comment_text_content,users_id,post_id) VALUES ('Hello',1,1),('Goodluck',2,2),('See you',1,2);

COMMIT;

