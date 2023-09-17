import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
  height: 100%;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  svg {
    width: 20px;
    fill: black;
  }

  &.log-out {
    border-color: tomato;

    svg {
      fill: tomato;
    }
  }
`;