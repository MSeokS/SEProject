import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import TabBar from "./TabBar";
import axios from "axios";

function Portfolio() {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const goBackToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.post(`/api/portfolio`,{ withCredentials: true });
        console.log(response.data);
        setPosition(response.data.position);
        setDescription(response.data.profile);
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
      }
    };
    fetchPortfolio();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/save_portfolio",
        {
          position: position,
          profile_text: description,
        },
        { withCredentials: true },
        console.log(position, description)
      );
      alert("Portfolio saved successfully");
    } catch (error) {
      console.error("Failed to save portfolio", error);
    }
  };

  return (
    <div className="portfolio-page">
      <Header>
        <StyledArrow onClick={goBackToProfile} />
        <Header_name>SKKU Recruit</Header_name>
      </Header>
      <Title>Portfolio</Title>
      <form>
        <div className="form-group">
          <PortSelect
            value={position}
            onChange={(e) => setPosition(e.target.value)}>
            <option value="">Position</option>
            <option value="Front-end">Front-End</option>
            <option value="Back-end">Back-End</option>
            <option value="Designer">Designer</option>
          </PortSelect>
        </div>
        <div className="form-group">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}></Textarea>
        </div>
        <PortChangeButton type="submit" onClick={handleSubmit}>
          Save
        </PortChangeButton>
      </form>
      <TabBar />
    </div>
  );
}

export default Portfolio;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
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

const StyledArrow = styled(FaArrowLeft)`
  font-size: 20px;
  color: white;
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-left: 20px;
`;

const Textarea = styled.textarea`
  width: 331px;
  height: 350px;
  padding: 10px 10px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
  resize: none;
  margin-left: 20px;
`;

const PortChangeButton = styled.button`
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

const PortSelect = styled.select`
  width: 353px;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 20px;
`;
