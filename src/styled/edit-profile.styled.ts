import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

export const Title = styled.div`
  border-bottom: 1px solid #eee;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  font-weight: bold;
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 20px;
  gap: 20px;
`;


export const Item = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Span = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  width: 150px;
  height: 100%;;
`;