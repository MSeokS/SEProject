import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import PositionRadioButtons from './PositionRadioButtons';
import useProjectStore from '../store/useProjectStore';
import arrowUpIcon from './asset/image/arrow-up-icon.svg';
import arrowDownIcon from './asset/image/arrow-down-icon.svg';
import emptyHeartIcon from './asset/image/empty-hearts-icon.svg';
import redHeartIcon from './asset/image/red-hearts-icon.png';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1002;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  background-color: white;
  border-radius: 15px 15px 0 0;
  box-shadow: ${(props) =>
    props.arrowDirection === 'down'
      ? '0 -3px 10px rgba(0, 0, 0, 0.28)'
      : 'none'};
`;

const ArrowIcon = styled.img`
  width: 50px;
  height: 24px;
  transition: transform 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  // border-top: 1px solid #dadada;
  background-color: white;
`;

const HeartButton = styled.button`
  background-color: transparent;
  border: 1px #23c16b solid;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  margin-right: 8px;
  background-image: url(${(props) =>
    props.clicked ? redHeartIcon : emptyHeartIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%;
`;

const ApplyButton = styled.button`
  width: 273px;
  height: 52px;
  background-color: #23c16b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-left: -10px;
`;

const ClosedLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 273px;
  height: 52px;
  background-color: #ccc;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: not-allowed;
  margin-left: -10px;
  box-sizing: border-box;
`;

const PositionSelector = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  text-align: left;
  padding-left: 15px;
  padding-bottom: 20px;
  background-color: white;
`;

const Label = styled.h2`
  margin-top: 0px;
  padding-top: 10px;
  margin-bottom: 8px;
  margin-left: 10px;
`;

const Description = styled.p`
  margin-top: 5px;
  color: #898989;
  margin-bottom: 15px;
  margin-left: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

export default function PositionSelectBar() {
  const [showPositionSelector, setShowPositionSelector] = useState(false);
  const [arrowDirection, setArrowDirection] = useState('down');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [heartClicked, setHeartClicked] = useState(false);
  const { projectData, setProjectData } = useProjectStore();

  if (!projectData) {
    setProjectData(null);
    return;
  }

  const togglePositionSelector = () => {
    setShowPositionSelector(!showPositionSelector);
    setArrowDirection((prevDirection) =>
      prevDirection === 'down' ? 'up' : 'down'
    );
  };

  const handleApplyClick = () => {
    if (!selectedPosition) {
      alert('Please select a position to apply.');
      if (arrowDirection === 'down') {
        togglePositionSelector();
      }
      return;
    }

    const payload = {
      postid: projectData.id,
      position: selectedPosition,
    };

    axios
      .post('/api/apply', payload)
      .then((response) => {
        if (response.status === 200) {
          alert('Application submitted successfully!');

          axios
            .post('/api/scrab_post', {})
            .then((response) => {
              if (response.status === 200) {
                console.log('Scrab request submitted successfully!');
                setHeartClicked(true);
              }
            })
            .catch((error) => {
              console.error('Error submitting scrab request:', error);
              alert('Failed to submit scrab request.');
            });
        }
      })
      .catch((error) => {
        console.error('Error submitting application:', error);
        alert('Failed to submit application.');
      });
  };

  const handleHeartClick = () => {
    setHeartClicked(!heartClicked);
  };

  return (
    <>
      {showPositionSelector && <Overlay />}
      <Container>
        {!projectData.isend && (
          <div className="positionBar">
            <ArrowIconContainer
              arrowDirection={arrowDirection}
              onClick={togglePositionSelector}
            >
              <ArrowIcon
                src={arrowDirection === 'down' ? arrowUpIcon : arrowDownIcon}
                alt="Arrow Icon"
              />
            </ArrowIconContainer>
            <PositionSelector show={showPositionSelector}>
              <Label>Position</Label>
              <Description>
                Select the position you want to apply for
              </Description>
              <PositionRadioButtons
                selectedPosition={selectedPosition}
                setSelectedPosition={setSelectedPosition}
              />
            </PositionSelector>
          </div>
        )}
        <ButtonContainer>
          <HeartButton clicked={heartClicked} onClick={handleHeartClick} />
          {projectData.isend ? (
            <ClosedLabel>Closed</ClosedLabel>
          ) : (
            <ApplyButton onClick={handleApplyClick}>Apply</ApplyButton>
          )}
        </ButtonContainer>
      </Container>
    </>
  );
}
