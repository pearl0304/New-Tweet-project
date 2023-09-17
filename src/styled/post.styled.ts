import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TextArea = styled.textarea`
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  font-size: 14px;
  resize: none;
  width: 100%;
  font-family: 'S-CoreDream-3Light';

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border: 1px solid #1d9bf0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
export const AttachFileInput = styled.input`
  display: none
`;

export const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  padding: 10px 0px;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;