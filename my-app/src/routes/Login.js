// src/routes/Login.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/signin', { id, password },{ withCredentials: true }); // 서버에 로그인 요청

      if (response.data.token) {
        // JWT를 로컬 스토리지에 저장
        localStorage.setItem('token', response.data.token);
        navigate('/main');
      }
      else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
      console.log('response:', response.data);
    }catch (error) {
      console.log('failed to login:', error);
    }
    // 로그인 로직 추가
    console.log('ID:', id);
    console.log('password:', password);
  };

  return (
    <div className='container_login'>
      <form onSubmit={handleLogin} className = "loginbox">
        
        <div className ="inputID">
          <input id = "idbox" autocomplete="off" className ="inputbox" type="text" placeholder = " ID" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div className ="inputID">
          <input id ="passwordbox" autocomplete="off" className =" inputbox" type="password" placeholder = " Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className ="button_login">
          <button>
            <Link style = {{color: '#000000', textDecoration:'none' }} to="/signup">Sign In</Link>
          </button> 

          <button type="submit"  style={{color: '#000000'}}>
            login
          {/* <Link style = {{color: '#000000', textDecoration:'none' }} to="/main">Login</Link>  */}
          {/* 로그인 유효성 판단후 mainpage 라우팅 해야함 */}
          </button>
        </div>
      </form>
      
      <img src = "/Loginbtmpic.png" alt = "Loginbtmpic" id = "lgpic2" />
    </div>
  );
};

export default Login;
