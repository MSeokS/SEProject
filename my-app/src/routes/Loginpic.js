import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Loginpic.css';



const Loginpic = () => {
    return (  
      
        <div className='box1'>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet"></link>
        
            <img src = "/Loginpic.png" alt = "Loginpic" id="lgpic1"/>
            <div className="loginpic">
                <Link to="/Login" style = {{color: '#000000', textDecoration:'none' }}>Login</Link>
            </div>
            <div className ="ondesktop">
                please use mobile device.
            </div>
        </div>
       
    );
}

export default Loginpic;