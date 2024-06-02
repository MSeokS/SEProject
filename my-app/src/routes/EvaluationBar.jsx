import React from "react";
import styled from "styled-components";

export default function EvaluationBar() {
  return (
    <div>
      <ProgressBar value={80} min={0} max={100}></ProgressBar>
    </div>
  );
}

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
