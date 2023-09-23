import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background: white;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 5px;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

`;


export const Profile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border : 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
  }
`;


export const MoreBox = styled.div`
  background: #eee;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Column = styled.div`
  &:last-child {
    place-self: end;
  }
;
`;

export const PhotoBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%px;
`;

export const Photo = styled.img`
  width: 95%;
  height: 95%;
  border-radius: 15px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  img {
    width: 100%;
    height: 100%;
  }

`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const Payload = styled.p`
  margin: 10px 0px;
  font-size: 13px;
  line-height: 25px;
`;
