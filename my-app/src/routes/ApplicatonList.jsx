import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TabBar from './TabBar';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from './ApplicationCard';

function ApplicationList() {
  const applicants = [
    {
      id: 1,
      name: 'applicant 1',
      roles: ['Back-end'],
      phone: '010-1234-1234',
    },
    {
      id: 2,
      name: 'applicant 2',
      roles: ['Front-end'],
      phone: '010-2345-2345',
    },
    {
      id: 3,
      name: 'applicant 3',
      roles: ['Designer'],
      phone: '010-3456-3456',
    },
  ];
  console.log(applicants);

  const navigate = useNavigate(); // useNavigate 훅을 사용해 navigation 기능을 구현

  const handleSubmit = (id) => {
    const applicant = applicants.find((applicant) => applicant.id === id);
    alert(`Confirm`);
  };

  const goBackToPostList = () => {
    navigate('/posts');
  };

  return (
    <Application_List>
      <Header>
        <StyledArrow onClick={goBackToPostList} />
        <Header_name>SKKU Recruit</Header_name>
      </Header>
      <Title>Check Application</Title>
      {applicants.map((applicant, index) => (
        <ApplicationCardWrapper key={index}>
          <ApplicationCard {...applicant} />
        </ApplicationCardWrapper>
      ))}
      <TabBar />
    </Application_List>
  );
}

export default ApplicationList;

const Application_List = styled.div`
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

const ApplicationCardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: auto;
  margin-top: 8px;
`;
