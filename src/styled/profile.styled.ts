import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  overflow-y: scroll;
`;
export const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 30px;
  border-bottom: 2px solid lightblue;
`;

export const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 100px;
  position: relative;
  margin-bottom: 20px;
`;

export const AvatarUpload = styled.label`
  width: 100px;
  overflow: hidden;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 50px;
    fill: white;
  }
`;

export const PlusButton = styled.div`
  background-color: #1d9bf0;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  position: absolute;
  right: 10px;
  bottom: 5px;


  svg {
    margin: 2px;
    width: 20px;
    fill: white;
    cursor: pointer;
  }
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const AvatarInput = styled.input`
  display: none
`;

export const InfoBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  
`;
export const InfoBox = styled.div`

`;
export const Name = styled.span`
  font-size: 16px;
  font-weight: bolder;
`;

export const Edit = styled.div`
  width: 90px;
  height: 30px;
  line-height: 30px;
  background: #f5f5f5;
  text-align: center;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;


export const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;