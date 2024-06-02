// src/routes/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Makepost.css';
import styled from 'styled-components';
import TechStackPopup from './components/TechStackPopup';
import arrowLeftIcon from './asset/image/arrow-left-icon.svg';
import TabBar from './TabBar';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 55px;
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

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-items: center;
//   gap: 45px;
//   background-color: #0e442a;
//   color: white;
//   width: 100vw;
//   height: 50px;
//   margin-bottom: 35px;
//   justify-content: center;
// `;

// const Title = styled.h1`
//   font-size: 24px;
// `;

const Container_posting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 24px;
  margin-right: 24px;
  overflow: scroll;
  padding-bottom: 90px;
`;

const Inputbox_posting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: rgba(238, 238, 238, 1);
  border-radius: 8px;
  width: 240px;
  height: 36px;
  margin: 15px;
  padding: 7px;
  border: none;
`;

const Inputbox_posting_detail = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(238, 238, 238, 1);
  border-radius: 8px;
  width: 240px;
  height: 160px;
  margin: 15px;
  padding: 7px;
  border: none;
`;

// const BackButton = styled.button`
//   background-color: transparent;
//   cursor: pointer;
//   margin: 10px;
//   margin-left: 20px;
//   padding: 10px 20px;
//   border: none;
//   color: white;
//   background-image: url(${arrowLeftIcon});
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
// `;

// const Box_in_box = styled.input`
//     background: rgba(238, 238, 238, 1);
//     border-radius: 5px;
//     width: 240px;
//     height: 36px;
//     margin: 7px;
//     border: none;
// `;

const Makepost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectname: '',
    front_req: 0,
    back_req: 0,
    design_req: 0,
    stack: [],
    location: '',
    enddate: '',
    post_text: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져오거나, 토큰이 없는 경우 빈 문자열을 사용합니다.

  const [selectedStacks, setSelectedStacks] = useState([]);

  const handleSelectStack = (stacks) => {
    setSelectedStacks(stacks);
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

  const handlemakepost = async (event) => {
    event.preventDefault();
    const sum = form.stack.reduce((a, b) => a + b, 0);
    const updatedForm = { ...form, stack: sum };
    console.log('updatedForm:', updatedForm);
    try {
      const response = await axios.post('/api/posting', updatedForm, {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰을 추가합니다.
        },
      });
      if (response.status === 200) {
        alert('게시물이 작성되었습니다.');
        navigate('/main');
      } else {
        alert('게시물 작성에 실패했습니다.');
        navigate('/main');
      }

      console.log('response:', response.data);
    } catch (error) {
      console.log('failed to make post:', error);
      navigate('Main');
    }
    console.log('게시물 정보:', form);
  };

  return (
    <Container_posting>
      <Header>
        <BackButton onClick={() => navigate('/Main')} />
        <Title>SKKU Recruit</Title>
      </Header>
      <form onSubmit={handlemakepost} className="makepostbox">
        <Inputbox_posting>
          <label className="posting_label"> Project Name</label>

          <input
            className="Box_in_box"
            type="text"
            name="projectname"
            value={form.projectname}
            onChange={handleChange}
            required
          />
        </Inputbox_posting>
        {/* <Inputbox_posting>
                <label className ="posting_label">Position</label>
                <select className ="Box_in_box"  type="text" name="position" value={form.position} onChange={handleChange} required>
                <option value=""></option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Designer">Designer</option>
                </select>
            </Inputbox_posting> */}

        <Inputbox_posting>
          <label className="posting_label">frontend headcount</label>
          <select
            className="Box_in_box"
            type="text"
            name="front_req"
            value={form.front_req}
            onChange={handleChange}
            required
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
        </Inputbox_posting>

        <Inputbox_posting>
          <label className="posting_label">Backend Headcount</label>
          <select
            className="Box_in_box"
            type="text"
            name="back_req"
            value={form.back_req}
            onChange={handleChange}
            required
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
        </Inputbox_posting>

        <Inputbox_posting>
          <label className="posting_label">Designer Headcount</label>
          <select
            className="Box_in_box"
            type="text"
            name="design_req"
            value={form.design_req}
            onChange={handleChange}
            required
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
        </Inputbox_posting>
        <Inputbox_posting>
          <button
            style={{ background: 'rgba(0, 0, 0, 0.0)', color: 'black' }}
            onClick={() => setShowPopup(true)}
          >
            Select Stack
          </button>
          {showPopup && (
            <TechStackPopup
              setForm={setForm}
              selectedStacks={selectedStacks}
              onSelect={handleSelectStack}
              setShowPopup={setShowPopup}
            />
          )}

          {/* <input
                className="box-in-box"
                type="text"
                name="stack"
                value={selectedStacks.join(', ')}
                onChange={handleChange}
                required
                /> */}
          {console.log(selectedStacks)}
        </Inputbox_posting>

        <Inputbox_posting>
          <label className="posting_label">Location</label>
          <select
            className="Box_in_box"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Seoul">Seoul</option>
            <option value="Seoul">Suwon</option>
            <option value="Busan">Busan</option>
            <option value="Daegu">Daegu</option>
            <option value="Daejeon">Daejeon</option>
            <option value="Gwangju">Gwangju</option>
            <option value="Incheon">Incheon</option>
            <option value="Ulsan">Ulsan</option>
          </select>
        </Inputbox_posting>
        <Inputbox_posting>
          <label className="posting_label">
            {' '}
            End Date (please enter 8 number)
          </label>

          <input
            className="Box_in_box"
            type="text"
            name="enddate"
            value={form.enddate}
            onChange={handleChange}
            required
          />
        </Inputbox_posting>
        <Inputbox_posting_detail>
          <label className="posting_label">Project Detail</label>
          <textarea
            style={{
              height: '150px',
            }}
            className="Box_in_box"
            type="text"
            name="post_text"
            value={form.post_text}
            onChange={handleChange}
            required
          />
        </Inputbox_posting_detail>

        <div className="button">
          <button type="submit" id="posting_btn">
            {/* fortest */}
            {/* <Link style ={{color: '#000000', textDecoration:'none' }} to="/Main">Make Post</Link> */}
            {console.log(form)}
          </button>
        </div>
      </form>
      <TabBar></TabBar>
    </Container_posting>
  );
};

export default Makepost;
