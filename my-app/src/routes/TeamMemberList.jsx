import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useTeamStore from '../store/useTeamStore.jsx';
import useProjectStore from '../store/useProjectStore.jsx';
import skkuSymbol from './asset/image/skku_symbol.jpg';

const TeamMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  margin-bottom: 15px;
  padding: 10px;
  width: 345px;
  height: 72px;
  text-align: left;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Member = styled.div`
  width: 48px;
  height: 48px;
  background: url(${skkuSymbol}) no-repeat center center;
  background-size: cover;
  border-radius: 50%;
  margin-right: 15px;
`;

const TeamMemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.p`
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
`;

const MemberPosition = styled.p`
  color: #737e91;
  margin: 0;
`;

export default function TeamMemberList() {
  const { teamMembers, fetchTeamMembers, selectMember } = useTeamStore();
  const { selectedProjectId } = useProjectStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProjectId) {
      fetchTeamMembers(selectedProjectId);
    }
  }, [selectedProjectId, fetchTeamMembers]);

  useEffect(() => {
    if (teamMembers.length === 0) {
      alert('The evaluation has ended.');
    }
  }, [teamMembers]);

  const handleMemberClick = (member) => {
    selectMember(member);
    navigate(`/evaluation/${member.id}`);
  };

  return (
    <TeamMemberContainer>
      {teamMembers.map((member) => (
        <Button key={member.id} onClick={() => handleMemberClick(member)}>
          <Member />
          <TeamMemberInfo>
            <MemberName>{member.username}</MemberName>
            <MemberPosition>{member.position}</MemberPosition>
          </TeamMemberInfo>
        </Button>
      ))}
    </TeamMemberContainer>
  );
}
