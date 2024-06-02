import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const EvaluationBar = ({ profileInfo }) => {
  return (
    <div>
      <ProgressBar
        value={profileInfo.evaluate_average}
        min={0}
        max={100}></ProgressBar>
    </div>
  );
};

EvaluationBar.propTypes = {
  profileInfo: PropTypes.object.isRequired, // profileInfo의 타입을 객체로 지정
};

export default EvaluationBar;

const ProgressBar = styled.progress`
  width: 100%;
  height: 13px;
  border-radius: 10px;
  appearance: none;
  &::-webkit-progress-bar {
    background-color: #cacaca;
    border-radius: 10px;
  }
  &::-webkit-progress-value {
    background-color: #ff8e25;
    opacity: 0.7;
    border-radius: 10px;
  }
  &::-moz-progress-bar {
    background-color: #ff8e25;
    opacity: 0.7;

    border-radius: 10px;
  }
`;
