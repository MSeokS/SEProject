import React from 'react';
import './TechStackPopup.css'; // CSS 파일을 가져옵니다
import { on } from 'events';



const TechStackPopup = ({ setForm, setShowPopup, selectedStacks, onSelect }) => {

  const techStacks = [
    { label: 'JavaScript', value: 1 << 1 },
    { label: 'TypeScript', value: 1 << 2 },
    { label: 'React', value: 1 << 3 },
    { label: 'Vue', value: 1 << 4 },
    { label: 'Svelte', value: 1 << 5 },
    { label: 'Node.js', value: 1 << 6 },
    { label: 'Java', value: 1 << 7 },
    { label: 'Spring', value: 1 << 8 },
    { label: 'Go', value: 1 << 9 },
    { label: 'Next.js', value: 1 << 10 },
    { label: 'Nest.js', value: 1 << 11 },
    { label: 'Kotlin', value: 1 << 12 },
    { label: 'Express', value: 1 << 13 },
    { label: 'MySQL', value: 1 << 14 },
    { label: 'PHP', value: 1 << 15 },
    { label: 'Python', value: 1 << 16 },
    { label: 'Django', value: 1 << 17 },
    { label: 'MongoDB', value: 1 << 18 },
    { label: 'GraphQL', value: 1 << 19 },
    { label: 'Flutter', value: 1 << 20 },
    { label: 'Swift', value: 1 << 21 },
    { label: 'Unity', value: 1 << 22 },
    { label: 'AWS', value: 1 << 23 },
    { label: 'ReactNative', value: 1 << 24 },
  ];
  
  
  const handleClick = (stack) => {
    if (selectedStacks.includes(stack.value)) {
      onSelect(selectedStacks.filter(s => s !== stack.value));
    } else {
      onSelect([...selectedStacks, stack.value]);
    }
  };

  const handleSubmit = () => {
    setForm(prevForm => ({ ...prevForm, stack: selectedStacks }));
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
            className={`stack-button ${selectedStacks.includes(stack.value) ? 'selected' : ''}`}
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
        <button className="reset-button" onClick={() => onSelect([])}>Reset</button>
        <button className="filtering-button" onClick =  {handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default TechStackPopup;