import React from 'react';
import './TechStackPopup.css'; // CSS 파일을 가져옵니다
import { on } from 'events';



const TechStackPopup = ({ setForm, setShowPopup, selectedStatus, onSelect }) => {

  const techStacks = [
    { label: 'Closed', value: true },
    { label: 'Recruiting', value: false },
  ];
  
  
  const handleClick = (stack) => {
    onSelect(stack.value);
  };

  const handleSubmit = () => {
    setForm(prevForm => ({ ...prevForm, status: selectedStatus }));
    setShowPopup(false);
    onSelect(false);
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <span className="popup-title">Tech Stack</span>
      </div>
      <div className="popup-body">
        {techStacks.map((stack) => (
          <button
            
            key={stack.value}
            className={`stack-button ${selectedStatus===stack.value ? 'selected' : ''}`}
            onClick={() => handleClick(stack)}
          >
            <input 
            type="text" 
            value={stack.label} 
            placeholder={stack.label} 
            readOnly 
            style={{ border: 'none', background: 'transparent',padding: '0', margin: '0' ,width: '100%', height: '100%'}} 
          />
            
          </button>
        ))}
      </div>
      <div className="popup-footer">
        <button className="reset-button" onClick={() => onSelect(false)}>Reset</button>
        <button className="filtering-button" onClick =  {handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default TechStackPopup;
