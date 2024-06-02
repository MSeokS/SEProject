import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ApplicationCard({
  id,
  username,
  position,
  phone,
  postid,
}) {
  const navigate = useNavigate();
  const goToApplicationPort = () => {
    navigate("/applicationPort");
  };

  const submitApplication = () => {
    alert("conrfirmed");
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        '/api/select',
        { userid: id, postid },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert('Confirmation successful');
      } else {
        alert('Confirmation failed');
      }
    } catch (error) {
      console.error('Error confirming applicant:', error);
      alert('An error occurred during confirmation');
    }
  };

  return (
    <ApplicationCardContainer>
      <Header>
        <Title>{username}</Title>
        <Roles>
          <RoleP>{position}</RoleP>
        </Roles>
        <PortButton onClick={goToApplicationPort}>Portfolio &gt;</PortButton>
      </Header>
      <Wrapper>
        <PhoneWrapper>
          <PhoneLabel>Phone Number</PhoneLabel>
          <Phone>{phone}</Phone>
        </PhoneWrapper>
        <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
      </Wrapper>
    </ApplicationCardContainer>
  );
}

const ApplicationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 343px;
  height: 117px;
  margin: 10px 0;
  padding: 10px;
  padding-bottom: 12px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PortButton = styled.button`
  background-color: transparent;
  color: #198155;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  width: 80px;
`;

const Title = styled.h3`
  margin: 8px;
  color: #333;
  font-size: 20px;
  width: 126px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #23c16b;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  width: 78px;
  height: 39px;
`;

const Roles = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  margin-left: -80px;
  margin-bottom: 0px;
  font-size: 14px;
`;

const RoleP = styled.p`
  margin: 0 10px;
  font-size: 12px;
  color: #333;
`;

const PhoneWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f2f4f5;
  border-radius: 8px;
  padding: 8px;
  width: 224px;
  box-sizing: border-box;
`;

const PhoneLabel = styled.span`
  color: #666;
  font-size: 12px;
  margin-right: 10px;
`;

const Phone = styled.span`
  color: #333;
  font-size: 14px;
  font-weight: bold;
`;
