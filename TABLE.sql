CREATE TABLE users (
    username VARCHAR(50),
    
    id VARCHAR(10) PRIMARY KEY,
    password VARCHAR(50),

    phone VARCHAR(30),
    department VARCHAR(100),

    perform INT,
    commute INT,
    prepare INT,
    commitment INT,
    total INT,

    position INT,
    stack INT,
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
    location VARCHAR(50),

    startdate DATE,
    enddate DATE,
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
    postid INT REFERENCES posts(id),
);

CREATE TABLE teams (
    postid INT REFERENCES posts(id),
    userid VARCHAR(10) REFERENCES users(id)
);

CREATE TABLE applicant(
    postid INT REFERENCES posts(id),
    userid VARCHAR(10) REFERENCES users(id),
    position INT
);

CREATE TABLE evalute(
    userid VARCHAR(10) REFERENCES users(id),
    teamid VARCHAR(10) REFERENCES users(id)
);
