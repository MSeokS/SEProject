CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(50) UNIQUE,
    password VARCHAR(50),
    name VARCHAR(50),
    student_id INT,
    major VARCHAR(100),
    stack INT,
    phone INT,
    profile TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(50) REFERENCES users(userid),
    request INT,
    applicant INT[50],
    teams INT[50],
    job_info TEXT,
    stack INT
);
