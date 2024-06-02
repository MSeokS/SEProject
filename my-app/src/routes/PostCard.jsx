import React from 'react';
import styled from 'styled-components';
// Edit, Delete, Close 버튼을 추가하고, PostCard 컴포넌트를 완성하세요.
function PostCard({
  projectname,
  location,
  post_text,
  front_req,
  back_req,
  design_req,
}) {
  return (
    <PostCardContainer>
      <Header>
        <Title>{projectname}</Title>
        <Location>{location}</Location>
      </Header>
      <Description>{post_text}</Description>
      <Roles>
        {front_req > 0 && <RoleButton>Front-end: {front_req}</RoleButton>}
        {back_req > 0 && <RoleButton>Back-end: {back_req}</RoleButton>}
        {design_req > 0 && <RoleButton>Designer: {design_req}</RoleButton>}
      </Roles>
      <Actions>
        <CloseButton>Close</CloseButton>
        <DeleteButton>Delete</DeleteButton>
      </Actions>
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
  height: 185px;
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
  border-radius: 30px;
  border: none;
  font-size: 12px;
  color: #333;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  padding: 4px 9px;
  font-size: 12px;
  background: #23c16b;
  color: white;
  border: none;
  border-radius: 30px;
  width: 67px;
  height: 32px;
  box-sizing: border-box;
  margin-right: 9px;
  font-size: 12px;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  padding: 4px 9px;
  font-size: 12px;
  background-color: #ff8e25;
  opacity: 0.8;
  color: white;
  border: none;
  border-radius: 30px;
  width: 67px;
  height: 32px;
  box-sizing: border-box;
  margin-right: 9px;
  font-size: 12px;
  margin-top: 10px;
`;
