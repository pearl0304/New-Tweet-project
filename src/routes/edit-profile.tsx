import {Form, Item, Span, Title, Wrapper} from "../styled/edit-profile.styled.ts";
import {AvatarBox, AvatarImg, AvatarInput, AvatarUpload} from "../styled/profile.styled.ts";
import React, {useState} from "react";
import {firebaseAuth} from "../firebase.ts";
import {Input} from "../styled/auth.styled.ts";
import {useLocation, useNavigate} from "react-router-dom";


export default function EditProfile() {
  const user = firebaseAuth.currentUser;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ownerUid = queryParams.get('uid');
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(user?.photoURL);

  if (user?.uid != ownerUid) return;


  const onAvatarChange = () => {
  }

  return (
    <Wrapper>
      <Title>Edit profile</Title>
      <AvatarBox className="center">
        <AvatarUpload htmlFor="avatar">
          {avatar ? (<AvatarImg src={avatar}/>) : (<svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"/>
          </svg>)}
        </AvatarUpload>
        <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*"></AvatarInput>
      </AvatarBox>
      <Form>
        <Item>
          <Span>DisplayName</Span>
          <Input type="text" id="displayName" name="displayName" maxLength={15}/>
        </Item>
        <Item>
          <Span>Bio</Span>
          <Input type="text" id="bio" name="bio"></Input>
        </Item>
        <Item>
          <Span>Link</Span>
          <Input type="text" id="link" name="link"></Input>
        </Item>
        <Input type="submit" value="Edit"></Input>
      </Form>
    </Wrapper>
  );
}