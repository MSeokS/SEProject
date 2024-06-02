import React from 'react';
import { useNavigate } from 'react-router-dom';
import Postcardmain from './Postcardmain';
import TabBar from './TabBar';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import data from '../data';

function Scrab() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/scrab_post', {
          method: 'POST', // 요청 메서드를 POST로 설정
          headers: {
            'Content-Type': 'application/json',
            // 필요한 경우 다른 헤더를 추가
          },
          // 필요한 경우 요청 본문에 데이터를 추가
          // body: JSON.stringify(data),
        });
        const data = await response.json();
        
        if (data.message) {
          alert('지원한 게시물이 없습니다.');
          navigate('/main');
          return;
        }

        setPosts(data);
        console.log('posts', data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    fetchPosts();
  }, []);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/applicationList');
    // 포스트 Id 넘겨주기
  };

  return (
    <PostList>
      <Header>
        <Header_name>SKKU Recruit</Header_name>
      </Header>
      <Title>Scrab</Title>
      {posts.map((post, index) => (
        <PostCardWrapper key={index}>
          <Postcardmain
            title={post.projectname}
            location={post.location}
            description={post.post_text}
            roles={[
              `Front-end: ${post.front_req}`,
              `Back-end: ${post.back_req}`,
              `Designer: ${post.design_req}`,
            ]}
            recruitingInfo={post.isend ? 'Recruiting ended' : 'Recruiting'}
          />
        </PostCardWrapper>
      ))}
      <TabBar />
    </PostList>
  );
}

export default Scrab;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  gap: 25px;
  background-color: #0e442a;
  color: white;
  width: 393px;
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
  text-align: center;
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
