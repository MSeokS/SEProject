import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabBar from './TabBar';
import PostCard from './Postcardmain';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import TechStackPopup from './components/TechStackPopup';
import TechStackPopup1 from './components/TechStackPopup1';
import TechStackPopup2 from './components/TechStackPopup2';
import useProjectStore from '../store/useProjectStore';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: #0e442a;
  color: white;
  width: 100vw;
  height: 80px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const Title1 = styled.h1`
  font-size: 20px;
  margin-left: 20px;
`;

const Mainpage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  // width: 393px;
  // height: 852px;
  background: #ffffff;
`;

const PostCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const PostList = styled.div`
  position: relative;
  width: 393px;
  height: 852px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background: rgba(196, 196, 196, 0.2);
  padding: 0;
  margin-bottom: 15px;
  align-self: center;
  border-radius: 10px;
  width: 343px;
  height: 40px;
  box-sizing: border-box;
`;

const SearchIcon = styled(CiSearch)`
  margin-left: 10px;
`;

const Searchbox = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  name: 'projectname';
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 5%;
`;

const SearchButton = styled.button`
  background: rgba(196, 196, 196, 0.2);
  width: 22%;
  height: 5%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin-left: 3px;
  margin-right: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: left;
  align-items: center;
  justify-content: space-between;
`;

const FindButton = styled.button`
  background: rgba(196, 196, 196, 0.2);
  width: 16%;
  height: 5%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin-left: 3px;
  margin-right: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 68px;
`;

const MessageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 343px;
  height: 85%;
  background: rgba(196, 196, 196, 0.2);
  border-radius: 20px;
  margin: 20px;
  margin-top: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  box-sizing: border-box;
`;

const Main = () => {
  const navigate = useNavigate();

  const { setSelectedProjectId } = useProjectStore();

  const handleCardClick = (id) => {
    console.log('id:', id);
    setSelectedProjectId(id);
    navigate('/project-description');
  };

  const [form, setForm] = useState({
    projectname: '',
    status: true,
    position: 0,
    stack: [],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const [selectedStacks, setSelectedStacks] = useState([]);
  const [selectedstatus, setSelectedStatus] = useState(false);
  const [selectedposition, setSelectedPosition] = useState('');

  const [isFindClicked, setIsFindClicked] = useState(false);

  const handleSelectStack = (stacks) => {
    setSelectedStacks(stacks);
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const handleSelectPosition = (position) => {
    setSelectedPosition(position);
  };

  const handleChange_popup = (e) => {
    setSelectedStacks(e.target.value.split(',').map((s) => s.trim()));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFindClick = async () => {
    setIsFindClicked(true);
    const sum = form.stack.reduce((a, b) => a + b, 0);
    const updatedForm = { ...form, stack: sum };

    try {
      setPosts([]);
      const response = await axios.post('/api/search', updatedForm, {
        withCredentials: true,
      });
      // response.data를 posts 상태에 저장합니다.
      setPosts(response.data);
      setForm([]);
    } catch (error) {
      console.error('Failed to fetch data:', error);

      if (error.response.status === 401) {
        alert('Please log in');
        navigate('/login');
      }
    }
  };

  const [posts, setPosts] = useState([]);

  return (
    <Mainpage>
      <Header>
        <Title>SKKU Recruit</Title>
      </Header>
      <Title1>All Projects</Title1>
      <SearchWrapper>
        <SearchIcon />
        <Searchbox
          name="projectname"
          placeholder="Search"
          onChange={handleChange}
        />
      </SearchWrapper>

      <SearchButtonWrapper>
        <SearchButton
          onClick={() => {
            setShowPopup1(true);
            setShowPopup(false);
            setShowPopup2(false);
          }}
        >
          Status
          <IoIosArrowDown />
        </SearchButton>
        {showPopup1 && (
          <TechStackPopup1
            setForm={setForm}
            selectedStatus={selectedstatus}
            onSelect={handleSelectStatus}
            setShowPopup={setShowPopup1}
          />
        )}
        <SearchButton
          onClick={() => {
            setShowPopup1(false);
            setShowPopup(false);
            setShowPopup2(true);
          }}
        >
          Position
          <IoIosArrowDown />
        </SearchButton>
        {showPopup2 && (
          <TechStackPopup2
            setForm={setForm}
            selectedPosition={selectedposition}
            onSelect={handleSelectPosition}
            setShowPopup={setShowPopup2}
          />
        )}
        <SearchButton
          onClick={() => {
            setShowPopup1(false);
            setShowPopup(true);
            setShowPopup2(false);
          }}
        >
          Tech Stack
          <IoIosArrowDown />
        </SearchButton>
        {showPopup && (
          <TechStackPopup
            setForm={setForm}
            selectedStacks={selectedStacks}
            onSelect={handleSelectStack}
            setShowPopup={setShowPopup}
          />
        )}
        <FindButton onClick={handleFindClick}>Find</FindButton>
      </SearchButtonWrapper>

      {console.log('form:', form)}
      <ContentWrapper>
        {!isFindClicked && (
          <MessageDiv>
            Search for the project <br />
            you want to find.
          </MessageDiv>
        )}
        {posts.map((post, index) => (
          <PostCardWrapper key={index} onClick={() => handleCardClick(post.id)}>
            <PostCard
              title={post.projectname}
              location={post.location}
              description={post.post_text}
              roles={[
                `Front-end: ${post.front_req}`,
                `Back-end: ${post.back_req}`,
                `Designer: ${post.design_req}`,
              ]}
              recruitingInfo={post.isend ? 'Closed' : 'Recruiting'}
            />
          </PostCardWrapper>
        ))}
      </ContentWrapper>

      <TabBar></TabBar>
    </Mainpage>
  );
};

export default Main;
