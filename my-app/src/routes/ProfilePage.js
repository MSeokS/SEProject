import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostsList from "./PostsList";
import DATA from "../data.js";
import ProfileCard from "./ProfileCard.jsx";
import EvaluationBar from "./EvaluationBar.jsx";
import styled from "styled-components";
import TabBar from "./TabBar.jsx";
import {
  BiEdit,
  BiFile,
  BiHome,
  BiPencil,
  BiHeart,
  BiSolidHeart,
  BiUser,
} from "react-icons/bi";

// 평점 구현 필요

function ProfilePage() {
  const navigate = useNavigate();

  const EditButtonClick = () => {
    navigate("/accountInformation");
  };

  const goToPortfolio = () => {
    navigate("/portfolio");
  };

  const goToMyPost = () => {
    navigate("/posts");
  };

  return (
    <Profile_page>
      <Header>
        <Header_name>SKKU Recruit</Header_name>
      </Header>
      <Title>My Profile</Title>
      <ProfileCard />
      <Title>My Information</Title>
      <Info_section>
        <div className="portfolio">
          <h3 onClick={goToPortfolio} style={{ cursor: "pointer" }}>
            <StyledPortIcon />
            Portfolio
          </h3>
          <PortDescription
            onClick={goToPortfolio}
            style={{ cursor: "pointer" }}>
            Creating and Refining My Portfolio to Showcase to Others
          </PortDescription>
        </div>
        <div className="posts">
          <h3 onClick={goToMyPost} style={{ cursor: "pointer" }}>
            <StyledPostIcon />
            My Post
          </h3>
          <PostDescription onClick={goToMyPost} style={{ cursor: "pointer" }}>
            Exploring and Managing My Posted Content
          </PostDescription>
        </div>
      </Info_section>
      <TabBar />
    </Profile_page>
  );
}

export default ProfilePage;

const Profile_page = styled.div`
  position: relative;
  width: 393px;
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
  gap: 25px;
  background-color: #0e442a;
  color: white;
  width: 100vw;
  height: 50px;
  padding: 10px 10px;
`;

const Header_name = styled.h1`
  color: white;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-left: 20px;
`;

const Info_section = styled.div`
  padding: 0px 20px;
  margin-bottom: 30px;
`;

const StyledPortIcon = styled(BiFile)`
  font-size: 20px;
  color: black;
  margin-right: 7px;
`;

const StyledPostIcon = styled(BiEdit)`
  font-size: 20px;
  color: black;
  margin-right: 7px;
`;

const PortDescription = styled.p`
  margin-left: 25px;
`;

const PostDescription = styled.p`
  margin-left: 25px;
`;
