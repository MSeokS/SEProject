import React from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import TabBar from "./TabBar";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function PostsList() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/applicationList");
  };

  const goBackToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post("/api/mypost");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PostList>
      <Header>
        <StyledArrow onClick={goBackToProfile} />
        <Header_name>SKKU Recruit</Header_name>
      </Header>
      <Title>My Post</Title>
      {posts.map((post, index) => (
        <PostCardWrapper key={index} onClick={handleCardClick}>
          <PostCard {...post} />
        </PostCardWrapper>
      ))}
      <TabBar />
    </PostList>
  );
}

export default PostsList;

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
  padding: 10px 20px;
`;

const Header_name = styled.h1`
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
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-left: 20px;
`;

const PostList = styled.div`
  position: relative;
  width: 393px;
  height: 852px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const PostCardWrapper = styled.div`
  display: flex;
  justify-content: center; // 내부 아이템을 가운데 정렬
  width: 100%; // 폭을 100%로 설정하여 부모 컨테이너의 폭에 맞춤
  margin-bottom: 20px; // 각 카드 아래에 마진 추가
`;
