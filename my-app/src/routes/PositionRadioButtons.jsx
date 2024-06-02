import styled from 'styled-components';
import useProjectStore from '../store/useProjectStore';

const RadioButtonLabel = styled.label`
  display: block;
  margin: 10px;
  margin-left: 0px;
`;

const RadioButton = styled.input`
  margin: 10px;
`;

const PositionRadioButtons = ({ selectedPosition, setSelectedPosition }) => {
  const { projectData } = useProjectStore();

  const handlePositionChange = (event) => {
    // let positionValue;

    // switch (event.target.value) {
    //   case 'Front-end':
    //     positionValue = 0;
    //     break;
    //   case 'Back-end':
    //     positionValue = 1;
    //     break;
    //   case 'Designer':
    //     positionValue = 2;
    //     break;
    //   default:
    //     console.error('Position Selection Error');
    //     return;
    // }

    // setSelectedPosition(positionValue);

    setSelectedPosition(event.target.value);
  };

  return (
    <>
      {projectData && projectData.front_req > 0 && (
        <RadioButtonLabel>
          <RadioButton
            type="radio"
            name="position"
            value="Front-end"
            checked={selectedPosition === "Front-end"}
            onChange={handlePositionChange}
          />
          Front-end
        </RadioButtonLabel>
      )}
      {projectData && projectData.back_req > 0 && (
        <RadioButtonLabel>
          <RadioButton
            type="radio"
            name="position"
            value="Back-end"
            checked={selectedPosition === "Back-end"}
            onChange={handlePositionChange}
          />
          Back-end
        </RadioButtonLabel>
      )}
      {projectData && projectData.design_req > 0 && (
        <RadioButtonLabel>
          <RadioButton
            type="radio"
            name="position"
            value="Designer"
            checked={selectedPosition === "Designer"}
            onChange={handlePositionChange}
          />
          Designer
        </RadioButtonLabel>
      )}
    </>
  );
};

export default PositionRadioButtons;
