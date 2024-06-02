import React, { useEffect, useState } from "react";
import TabBar from "./TabBar";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import arrowLeftIcon from "./asset/image/arrow-left-icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AccountInformation() {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(`api/account`, { withCredentials: true });
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/save", userInfo, { withCredentials: true });
      alert("Information Saved!");
    } catch (error) {
      console.error("Failed to save user info", error);
      alert("Failed to save information.");
    }
  };

  const navigate = useNavigate();

  const goBackToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="account-information">
      <Header>
        <StyledArrow onClick={goBackToProfile}  />
        <Header_name>SKKU Recruit</Header_name>
      </Header>
      <Title>Account Information</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            Username
            </Label>
            <InputAccountInfo
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
            />
        
        </FormGroup>
        <FormGroup>
          <Label>
            ID (Student ID)
            </Label>
            <InputAccountInfo
              type="text"
              name="studentId"
              value={userInfo.id}
              onChange={handleChange}
            />
          
        </FormGroup>
        <FormGroup>
          <Label>
            Password
            </Label>
            <InputAccountInfo
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
        
        </FormGroup>
        <FormGroup>
          <Label>
            Phone number
            </Label>
            <InputAccountInfo
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
            />
        
        </FormGroup>
        <FormGroup>
          <Label>
            Department
            </Label>
            <InputAccountInfo
              type="text"
              name="department"
              value={userInfo.department}
              onChange={handleChange}
            />
          
        </FormGroup>
        <AccountChangeButton type="submit" onClick={handleSubmit}>
          Save
        </AccountChangeButton>
      </form>
      <TabBar />
    </div>
  );
}

export default AccountInformation;
const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;  // 필요한 경우 추가
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
  height: 80px;
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

const Title = styled.h1`
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-left: 20px;
`;


const InputAccountInfo = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  width: 150px;

  text-align: left;
  margin-left: 20px;
  margin-right: 10px;
  padding 10px;

`;

const AccountChangeButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;

  position: absolute;
  width: 343px;
  height: 52px;
  left: 24px;
  bottom: 97px;

  background: #198155;
  /* Blue Shadow */
  box-shadow: 0px 4px 16px rgba(58, 107, 228, 0.24);
  border-radius: 8px;
`;

const StyledArrow = styled(FaArrowLeft)`
  font-size: 20px;
  color: white;
  margin-left: 20px;
`;

const BackButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  color: white;
  background-image: url(${arrowLeftIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;
