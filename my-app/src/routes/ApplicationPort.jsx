import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationEvalBar from "./ApplicationEvalBar";

export default function ApplicationPort() {
  const navigate = useNavigate();
  const goBackToPostList = () => {
    navigate("/applicationList");
  };

  const data = `✔️ Introduction:
Hello! My name is Seungju Lee, and I am a passionate and dedicated web developer with a strong focus on creating user-centric web applications. Over the years, I have honed my skills in both front-end and back-end development, ensuring that I deliver efficient, scalable, and maintainable code. My journey in web development has been driven by a deep love for technology and a constant desire to learn and grow.

✔️ Technical Skills:
Front-End: HTML, CSS, JavaScript, React, Vue.js
Back-End: Node.js, Express, Django, Ruby on Rails
Databases: MongoDB, PostgreSQL, MySQL
Others: Git, Docker, AWS, RESTful API, GraphQL

✔️ Projects:
1. Project Name: E-commerce Website
Description: A responsive e-commerce platform where users can browse, add items to their cart, and make purchases.
Technologies: React, Redux, Node.js, Express, MongoDB
Features:
- User authentication and authorization (JWT-based)
- Product search and filtering
- Cart and order management
- Admin dashboard
`;

  return (
    <ApplicationPortContainer>
      <Header>
        <StyledArrow onClick={goBackToPostList} />
        <HeaderName>SKKU Recruit</HeaderName>
      </Header>
      <div>
        <Title>Evaluation</Title>
      </div>
      <ApplicationEvalBar />
      <Title>Application's Portfolio</Title>
      <Content>
        {data.split("\n").map((line, index) => (
          <Line key={index}>{line}</Line>
        ))}
      </Content>
      <TabBar />
    </ApplicationPortContainer>
  );
}

const ApplicationPortContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 393px;
  height: 852px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  background-color: #0e442a;
  color: white;
  width: 100%;
  height: 80px;

`;

const HeaderName = styled.h1`
  color: white;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  flex-grow: 1;
  margin-left: 65px;
`;

const StyledArrow = styled(FaArrowLeft)`
  font-size: 20px;
  color: white;
  cursor: pointer;
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-left: 20px;
`;

const Content = styled.div`
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const Line = styled.div`
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
  &::before {
    content: "${(props) =>
      props.children.trim().startsWith("✔️") ? "\n" : ""}";
    margin-right: 8px;
  }
`;

const EvalTitle = styled.p`
  font-size: 14px;
  margin: 10px 0 5px;
  text-align: left;
`;
