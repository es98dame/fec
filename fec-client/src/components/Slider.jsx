import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  &:checked + ${Switch}{
    background-color: green;

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;

const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 32px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;


const Slider = () => {
  return (
    <Label class="switch">
      <Input type="checkbox"/>
      <Switch class="slider round"/>
    </Label>
  );
};

export default Slider;