import styled from "styled-components";
import data from "../data.js";
import { useNavigate } from "react-router-dom";
import EvaluationBar from "./EvaluationBar.jsx";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

// const ProfilePic = styled.div`
//   position: absolute;
//   width: 60px;
//   height: 60px;
//   left: 148px;
//   top: 25px;
//   background-image: url("https://i.imgur.com/8Km9tLL.png");
//   background-size: cover;
//   background-position: center;
//   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
//   z-index: 20;
// `;

const StyledProfilePic = styled(VscAccount)`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 148px;
  top: 40px;
  background-position: center;
`;

const Card = styled.div`
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  position: relative;
  width: 300px;
  height: 200px;
  margin: 10px auto 2px;
  background: #eeeeee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
`;

const Info = styled.p`
  color: #666;
  font-size: 14px;
  margin: 3px 0 5px;
`;

const InfoName = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 3px 0 5px;
`;
const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: -105px;
  background-color: transparent;
  color: #0e442a;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const ProfileInfoContainer = styled.div`
  margin-top: 91px;
`;

const EvalTitle = styled.p`
  font-size: 14px;
  margin: 10px 0 5px;
  text-align: left;
`;

export default function ProfileCard() {
  const navigate = useNavigate();
  const [ProfileInfo, setProfileInfo] = useState("");

  const EditButtonClick = () => {
    navigate("/accountInformation");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/profile");
        console.log(response.data);
        setProfileInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <EditButton onClick={EditButtonClick}>Edit My Profile &gt;</EditButton>
      <StyledProfilePic />
      <ProfileInfoContainer>
        {ProfileInfo && <InfoName>{ProfileInfo.username}</InfoName>}
        {ProfileInfo && (
          <Info>{`${ProfileInfo.id} | ${ProfileInfo.department}`}</Info>
        )}
      </ProfileInfoContainer>
      <div className="profile-edit"></div>
      <div>
        <EvalTitle>Evaluation</EvalTitle>
      </div>
      <EvaluationBar />
    </Card>
  );
}
