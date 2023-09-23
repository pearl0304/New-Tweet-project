import {Form, Item, Span, Title, Wrapper} from "../styled/edit-profile.styled.ts";
import {AvatarBox, AvatarImg, AvatarInput, AvatarUpload} from "../styled/profile.styled.ts";
import React, {useEffect, useState} from "react";
import {firebaseAuth, firebaseDB, firebaseStorage} from "../firebase.ts";
import {Input} from "../styled/auth.styled.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {owner} from "../common/common.ts";
import {collection, doc, query, updateDoc, where} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from "firebase/auth";


export default function EditProfile() {
  /** USER VERIFICATION**/
  const user = firebaseAuth.currentUser;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ownerUid = queryParams.get('uid');
  if (user?.uid != ownerUid) return;

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    link: "",
    id: ""
  });
  const [avatar, setAvatar] = useState<string | null>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("")


  useEffect(() => {
    owner(ownerUid).then((data) => {
      setFormData({
        displayName: data.displayName || "",
        bio: data.bio || "",
        link: data.link || "",
        id: data.id
      });
      setAvatar(data.photoURL)
    })
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const userRef = doc(firebaseDB, 'users', formData.id);
    await updateDoc(userRef, formData).then(() => {
      alert('Profile is updated 😎')
      setLoading(false);
      window.location.href = window.location.href;
    }).catch((e) => {
      setError(e)
    })

  }


  const onAvatarChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const {files} = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(firebaseStorage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      await updateProfile(user, {
        photoURL: avatarUrl
      });

      /** UPDATE USER COLLECTION**/
      const userRef = doc(firebaseDB, 'users', formData.id);
      await updateDoc(userRef, {photoURL: avatarUrl}).then(() => {
        alert('Avatar is updated 😎')
        setLoading(false);
        setAvatar(avatarUrl);
        window.location.href = window.location.href;
      }).catch((e) => {
        setError(e)
      })

    }
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
      <Form onSubmit={onSubmit}>
        <Item>
          <Span>DisplayName</Span>
          <Input type="text" onChange={onChange} value={formData.displayName} id="displayName" name="displayName"
                 maxLength={15}/>
        </Item>
        <Item>
          <Span>Bio</Span>
          <Input type="text" onChange={onChange} value={formData.bio} id="bio" name="bio"></Input>
        </Item>
        <Item>
          <Span>Link</Span>
          <Input type="text" onChange={onChange} value={formData.link} id="link" name="link"></Input>
        </Item>
        <Input type="submit" value="Edit"></Input>
      </Form>
    </Wrapper>
  );
}