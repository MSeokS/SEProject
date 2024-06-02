import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import TeamMemberList from './TeamMemberList.jsx';
import arrowLeftIcon from './asset/image/arrow-left-icon.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 24px;
  margin-right: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 45px;
  background-color: #0e442a;
  color: white;
  width: 100vw;
  height: 50px;
`;

const BackButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  margin: 10px;
  margin-left: 20px;
  padding: 10px 20px;
  border: none;
  color: white;
  background-image: url(${arrowLeftIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

export default function TeamEvaluation() {
  const navigate = useNavigate();

  function handleBackButton() {
    navigate('/project-description');
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackButton} />
        <Title>Team Evaluation</Title>
      </Header>
      <h2>Please select the team member to evaluate.</h2>
      <div className="team-member-list">
        <TeamMemberList />
      </div>
    </Container>
  );
}
