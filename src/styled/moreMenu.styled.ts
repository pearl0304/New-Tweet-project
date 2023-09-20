import styled from "styled-components";

export const PopupWrapper = styled.div`
  background: white;
  width: 130px;
  border-radius: 5px;
  position: absolute;
  box-shadow: 1px 1px 1px 1px #eee;
  right: 10px;
  top: 10px;
  z-index: 1;
`;

export const MoreUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MoreLi = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 12px;
  cursor: pointer;
`;

export const Column = styled.div`;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
  
  &.delete {
    color: red;
  }
`;

export const Icon = styled.div`
  margin-right: 10px;
  width: 25px;
  height: 25px;

  svg {
    width: 25px;
  }
`;

export const Menu = styled.span``;