CREATE TABLE users (
    username VARCHAR(50),
    
    id VARCHAR(10) PRIMARY KEY,
    password VARCHAR(50),

    phone INT,
    department VARCHAR(100),

    perform INT DEFAULT 0,
    commute INT DEFAULT 0,
    prepare INT DEFAULT 0,
    commitment INT DEFAULT 0,
    total INT DEFAULT 0,

    position INT DEFAULT 0,
    stack INT DEFAULT 0,
    profile TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(10) REFERENCES users(id),
    projectname VARCHAR(50),

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
