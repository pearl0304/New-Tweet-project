import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
`;

export const Column = styled.div`
&:last-child{
  place-self: end;
}`;

export const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

export const UserName = styled.span`
font-weight: 600;
font-size: 15px;
`;

export const Payload = styled.p`
  margin: 10px 0px;
  font-size: 14px;
`;

export const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export const EditButton = styled.button`
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

