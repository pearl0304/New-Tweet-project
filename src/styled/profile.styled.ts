import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
`;

export const AvatarBox  = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
`;


export const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
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
  margin-left: -20px;
  
  svg {
    margin: 2px;
    width: 20px;
    fill: white;
    cursor: pointer;
  }
`;

export const AvatarImg = styled.img`
  width: 100%
`;

export const AvatarInput = styled.input`
  display: none
`;

export const Name = styled.span`
  font-size: 18px;
`;

export const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px
`;