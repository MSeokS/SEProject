// src/routes/SignUp.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    id: '',
    password: '',
    phone: '',
    department: '',
  });
  const setFormnull = () => {
    setForm({
      username: '',
      id: '',
      password: '',
      phone: '',
      department: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignUp = async (event) => {
    
    event.preventDefault();
    // 회원가입 로직 추가
    

    try {
      const response = await axios.post('/api/signup', form , { withCredentials: true });
      if (response.status === 200) {

        alert('회원가입이 완료되었습니다.');
        navigate('/Login');
      }
      else {
        alert('회원가입에 실패했습니다.');
        setFormnull();
        
      }

      console.log('response:', response.data);


    } catch (error) {
      console.log('failed to sign up:', error);
      setFormnull();
      
    }
    console.log('회원가입 정보:', form);
  };

  return (
    <div className='container_sign'>
      <form onSubmit={handleSignUp} className ="signupbox">
        <div className = "inputID">
          <input className ="inputbox" placeholder="Name" type="text" name="username" value={form.username} onChange={handleChange} required />
        </div>

        <div className='inputID'>
          <input className ="inputbox" placeholder='ID' type="text" name="id" value={form.id} onChange={handleChange} required />
        </div>

        <div className ="inputID">
          <input className ="inputbox" placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>

        <div className ="inputID">
          <input className ="inputbox" placeholder="Phone" type="text" name="phone" value={form.phone} onChange={handleChange} required />
        </div>

        <div className ="inputID">
          <input className ="inputbox" placeholder="Department" type="text" name="department" value={form.department} onChange={handleChange} required />
        </div>

        <div className ="button_sign">
          <button type="submit" style ={{color: '#000000', textDecoration:'none' }} > Sign In </button>   
        </div>
      </form>
    </div>
  );
};

export default SignUp;
