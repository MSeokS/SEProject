import React from 'react';
import './TechStackPopup.css'; // CSS 파일을 가져옵니다
import { on } from 'events';



const TechStackPopup = ({ setForm, setShowPopup, selectedPosition, onSelect }) => {

  const techStacks = [
    { label: 'Design', value:"Designer" },
    { label: 'Front', value: "Front-end" },
    { label: 'Back', value: "Back-end" },
  ];
  
  
  const handleClick = (stack) => {
    onSelect(stack.value);
  };

  const handleSubmit = () => {
    setForm(prevForm => ({ ...prevForm, position: selectedPosition }));
    setShowPopup(false);
    onSelect([]);
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
            className={`stack-button ${selectedPosition === stack.value ? 'selected' : ''}`}
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
        <button className="reset-button" onClick={() => onSelect('')}>Reset</button>
        <button className="filtering-button" onClick =  {handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default TechStackPopup;
