CREATE TABLE users (
    username VARCHAR(50),
    
    id VARCHAR(10) PRIMARY KEY,
    password VARCHAR(50),

    phone VARCHAR(15),
    department VARCHAR(100),

    perform INT DEFAULT 0,
    commute INT DEFAULT 0,
    prepare INT DEFAULT 0,
    commitment INT DEFAULT 0,
    total INT DEFAULT 0,

    position VARCHAR(50) DEFAULT Null,
    stack INT DEFAULT 0,
    profile TEXT DEFAULT NULL
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
    isEnd Boolean
);

CREATE TABLE apply_post (
    userid VARCHAR(10) REFERENCES users(id) ON DELETE CASCADE,
    postid INT REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE teams (
    postid INT REFERENCES posts(id) ON DELETE CASCADE,
    userid VARCHAR(10) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE applicant (
    postid INT REFERENCES posts(id) ON DELETE CASCADE,
    userid VARCHAR(10) REFERENCES users(id) ON DELETE CASCADE,
    position VARCHAR(50)
);

CREATE TABLE evaluate (
    userid VARCHAR(10) REFERENCES users(id) ON DELETE CASCADE,
    teamid VARCHAR(10) REFERENCES users(id) ON DELETE CASCADE
);

