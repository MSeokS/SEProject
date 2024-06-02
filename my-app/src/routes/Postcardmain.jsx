import React from 'react';
import styled from 'styled-components';

function PostCard({ title, location, description, roles, recruitingInfo }) {
  return (
    <PostCardContainer>
      <Header>
        <Title>{title}</Title>
        <Location>{location}</Location>
      </Header>
      <Description>{description}</Description>
      <Roles>
        {roles.map((role, index) => (
          <RoleButton key={index}>{role}</RoleButton>
        ))}
        {roles.length < 3 && (
          <RoleButton style={{ visibility: 'hidden' }}>Placeholder</RoleButton>
        )}
        {roles.length < 2 && (
          <RoleButton style={{ visibility: 'hidden' }}>Placeholder</RoleButton>
        )}
      </Roles>
      <RecruitStatus>
        <RecruitingInfo>{recruitingInfo}</RecruitingInfo>
      </RecruitStatus>
    </PostCardContainer>
  );
}

export default PostCard;

const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 343px;
  height: 175px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 8px;
  color: #333;
`;

const Location = styled.span`
  color: #666;
  font-size: 14px;
  margin: 10px;
`;

const Description = styled.p`
  color: #666;
  font-size: 15px;
  margin: -5px 10px;
  width: 290px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2em;
  max-height: 2.4em;
  margin-bottom: 8px;
`;

const Roles = styled.div`
  display: flex;
  justify-content: space-around;
  width: 323px;
  margin-bottom: -5px;
`;

const RoleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  height: 32px;
  width: 95px;
  background: #f2f4f5;
  border-radius: 32px;
  border: none;
  font-size: 12px;
  color: #333;
`;

const RecruitStatus = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RecruitingInfo = styled.span`
  color: #4caf50;
  font-weight: bold;
  font-size: 14px;
  margin: 8px;
  margin-right: 10px;
`;
