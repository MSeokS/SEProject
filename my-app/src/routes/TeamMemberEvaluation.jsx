import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import useTeamStore from '../store/useTeamStore.jsx';
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

const EvaluationItemContainer = styled.div`
  margin-top: 20px;
`;

const RatingCategory = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const CategoryLabel = styled.span`
  background-color: #198155;
  color: white;
  padding: 6.5px 10px;
  border-radius: 15px;
  margin-right: 10px;
  min-width: 150px;
  text-align: center;
  margin-bottom: 10px;
`;

const Stars = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 25px;
  color: ${(props) => (props.filled ? '#FFD700' : '#DDDDDD')};
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  width: 332px;
  height: 52px;
  background-color: #198155;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
`;

export default function TeamMemberEvaluation() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const {
    selectedMember,
    deselectMember,
    teamMembers,
    selectMember,
    fetchTeamMembers,
  } = useTeamStore();
  const [ratings, setRatings] = useState({
    performance: 0,
    communication: 0,
    preparation: 0,
    commitment: 0,
  });
  // const [review, setReview] = useState('');

  useEffect(() => {
    if (!selectedMember || selectedMember.id !== memberId) {
      const member = teamMembers.find((m) => m.id === memberId);
      if (member) {
        selectMember(member);
      } else {
        console.error('Error: Member not found');
        navigate('/evaluation');
      }
    }
  }, [memberId, selectedMember, teamMembers, selectMember, navigate]);

  if (!selectedMember) {
    return <div>Error: Please select a team member to evaluate.</div>;
  }

  const handleRatingChange = (category, value) => {
    setRatings((prevRatings) => ({ ...prevRatings, [category]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      userid: selectedMember.id,
      perform: ratings.performance,
      commute: ratings.communication,
      prepare: ratings.preparation,
      commitment: ratings.commitment,
    };

    axios
      .post('/api/evaluate', payload)
      .then((response) => {
        if (response.status === 200) {
          alert('Evaluation submitted successfully!');
          deselectMember();

          if (response.data.length > 0) {
            navigate('/evaluation');
          } else {
            navigate('/project-description');
          }
        }
      })
      .catch((error) => {
        console.error('Error submitting evaluation:', error);
        alert('Evaluation submitted successfully!');
        navigate('/evaluation');
      });
  };

  const handleBackButton = () => {
    navigate('/evaluation');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackButton} />
        <Title>Team Evaluation</Title>
      </Header>
      <h2>
        How was the project <br /> with {selectedMember.username}?
      </h2>
      <EvaluationItemContainer>
        {['performance', 'communication', 'preparation', 'commitment'].map(
          (category) => (
            <RatingCategory key={category}>
              <CategoryLabel>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </CategoryLabel>
              <Stars>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    filled={value <= ratings[category]}
                    onClick={() => handleRatingChange(category, value)}
                  >
                    ★
                  </Star>
                ))}
              </Stars>
            </RatingCategory>
          )
        )}
        {/* <ReviewContainer>
          <ReviewLabel>Feel free to leave a review.</ReviewLabel>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></Textarea>
        </ReviewContainer> */}
      </EvaluationItemContainer>
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Container>
  );
}
