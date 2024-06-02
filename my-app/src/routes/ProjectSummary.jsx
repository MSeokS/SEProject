import styled from 'styled-components';
import useProjectStore from '../store/useProjectStore.jsx';
// import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  text-align: left;
  background-color: #ffffff;
  margin-top: 30px;
  padding: 10px;
  padding-left: 20px;
  padding-bottom: 20px;
  width: 345px;
  box-sizing: border-box;
  border-radius: 15px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-top: 40px;
`;

const AuthorDate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Date = styled.span`
  margin-left: 10px;
  color: #737e91;
`;

const SummaryDetails = styled.div`
  margin-top: 10px;
`;

const PositionContainer = styled.div`
  margin-bottom: 5px;
`;

const NumberContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
`;

const DetailsContainer = styled.div`
  padding-top: 10px;
  margin-bottom: 5px;
`;

const PositionBadge = styled.span`
  display: inline-block;
  background-color: #f2f4f5;
  border-radius: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 12px;
`;

const DetailsSpan = styled.span`
  margin-right: 10px;
  color: #737e91;
  font-weight: bolder;
`;

export default function ProjectSummary() {
  const projectData = useProjectStore((state) => state.projectData);
  console.log(projectData);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  let recruitmentNumber =
    projectData.front_req + projectData.back_req + projectData.design_req;

  const positions = [];
  if(projectData.front_req > 0) positions.push('Front-end');
  if(projectData.back_req > 0) positions.push('Back-end');
  if(projectData.design_req > 0) positions.push('Designer');

  const startDate = projectData.startdate.split('T')[0];
  const endDate = projectData.enddate.split('T')[0];

  return (
    <Container>
      <Title>{projectData.projectname}</Title>
      {/* <AuthorDate>
        <span>{projectData.author}</span>
        <Date>{projectData.date}</Date>
      </AuthorDate> */}
      <Content>
        <SummaryDetails>
          <PositionContainer>
            <DetailsSpan>Position </DetailsSpan>
            {positions.map((position, index) => (
              <PositionBadge key={index}>{position}</PositionBadge>
            ))}
          </PositionContainer>
          <NumberContainer>
            <DetailsSpan>Recruitment Number </DetailsSpan>
            {recruitmentNumber} members
          </NumberContainer>
          <DetailsContainer>
            <DetailsSpan>Project Duration </DetailsSpan>
            {startDate} ~ {endDate}
          </DetailsContainer>
          <DetailsContainer>
            <DetailsSpan>Location </DetailsSpan>
            {projectData.location}
          </DetailsContainer>
        </SummaryDetails>
      </Content>
    </Container>
  );
}
