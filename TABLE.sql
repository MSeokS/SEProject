CREATE TABLE users (
    username VARCHAR(50),
    
    id VARCHAR(10) PRIMARY KEY,
    password VARCHAR(50),

    major VARCHAR(100),
    phone VARCHAR(10),

    profile TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(10) REFERENCES users(id),

    front_req INT,
    back_req INT,
    design_req INT,

    post_text TEXT,
    stack INT,

    startdate TIMESTAMP,
    enddate TIMESTAMP,
    iseEnd Boolean
);

CREATE TABLE alarms (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(10) REFERENCES users(id),
    posts INT REFERENCES posts(id),
    types INT,
    user_param VARCHAR(10)
);

CREATE TABLE apply_post (
    userid VARCHAR(10) REFERENCES users(id),
    postid INT REFERENCES posts(id)
);

CREATE TABLE teams (
    postid INT REFERENCES posts(id),
    userid VARCHAR(10) REFERENCES users(id)
);

CREATE TABLE applicant(
    postid INT REFERENCES posts(id),
    userid VARCHAR(10) REFERENCES users(id)
);
