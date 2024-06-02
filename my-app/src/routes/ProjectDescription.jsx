import styled from 'styled-components';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import DATA from '../data.js';
import ProjectSummary from './ProjectSummary.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import useProjectStore from '../store/useProjectStore.jsx';
import PositionSelectBar from './PositionSelectBar.jsx';
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
  gap: 25px;
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

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1004;
  width: 50vw;
  height: 23vh;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1003;
`;

const Question = styled.p`
  font-weight: bold;
`;

const YesButton = styled.button`
  background-color: #23c16b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  margin: 10px;
  width: 40vw;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #23c16b;
  cursor: pointer;
  margin: 10px;
  padding: 10px 20px;
  border: none;
`;

const ProjectSummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eeeeee;
  height: 330px;
  width: 100vw;
`;

export default function ProjectDescription() {
  const {
    selectedProjectId,
    fetchProjectData,
    isModalOpen,
    closeModal,
    projectData,
  } = useProjectStore();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dummy Data 사용 버전
  // useEffect(() => {
  //   const projectData = DATA.find((project) => project.id === projectId);

  //   if (!projectData) {
  //     setError('Error: Project is missing.');
  //     setProjectData(null);
  //     return;
  //   }

  //   setProjectData(projectData);
  //   setSelectedProjectId(projectId);

  //   if (
  //     projectData.status === 'closed' &&
  //     projectData.isUserParticipant &&
  //     projectData.isEvaluationPending
  //   ) {
  //     openModal();
  //   }
  // }, [projectId, setProjectData, setSelectedProjectId, openModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProjectData(selectedProjectId);
      } catch (err) {
        setError('Error: Project is missing.');
      }
    };

    fetchData();
  }, [selectedProjectId, fetchProjectData]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      {isModalOpen && (
        <>
          <Overlay onClick={closeModal} />
          <Modal>
            <Question>Would you like to evaluate the team members?</Question>
            <YesButton
              onClick={() => {
                closeModal();
                navigate('/evaluation');
              }}
            >
              Yes
            </YesButton>
            <CloseButton onClick={closeModal}>Maybe later</CloseButton>
          </Modal>
        </>
      )}
      <Header>
        <BackButton onClick={() => navigate('/Main')} />
        <Title>Project Description</Title>
      </Header>
      <ProjectSummaryWrapper>
        <ProjectSummary />
      </ProjectSummaryWrapper>
      <ProjectDetails />
      {projectData && <PositionSelectBar />}
    </Container>
  );
}
