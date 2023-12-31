import {
  Payload,
  Photo,
  UserName,
  Wrapper,
  Box,
  MoreBox,
  PhotoBox,
  Profile,
  UserInfo, GridContainer
} from "../styled/tweet.styled.ts";
import {useEffect, useRef, useState} from "react";
import MoreMenu from "./more-menu.tsx";
import {getUser} from "../common/common.ts";
import {Link} from "react-router-dom";

export default function Tweet({tweet, uid, id, images}: {
  tweet: string,
  uid: string,
  id: string,
  images: string[]
}) {

  const [open, setOpen] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const tweetRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser(uid);
        setDisplayName(userData[0].displayName);
        setProfile(userData[0].photoURL)
      } catch (e) {
        console.error("Error fetching user data: ", e)
      }
    }

    fetchUserData();
  }, [uid])


  const toggleMore = () => {
    setOpen(true)
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tweetRef.current && !tweetRef.current?.contains(e.target as Node) && moreButtonRef.current && !moreButtonRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []);

  return (
    <Wrapper>
      <Box ref={tweetRef}>
        <UserInfo>
          <Profile>
            <Link to={{pathname: '/profile', search: `?uid=${uid}`}}><img
              src={profile ? profile : '/public/images/user.png'}/></Link>
          </Profile>
          <UserName>{displayName}</UserName>
        </UserInfo>
        <MoreBox onClick={toggleMore} ref={moreButtonRef}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd"
                  d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  clipRule="evenodd"/>
          </svg>
        </MoreBox>
        {open && (<MoreMenu uid={uid} id={id} photoURL={images}/>)}
      </Box>
      <Payload>{tweet}</Payload>
      <PhotoBox className="write">
        {images ? (
          images.length === 1 ? (
            // 이미지가 한 장인 경우
            <Photo src={images[0]}></Photo>
          ) : (
            // 이미지가 여러 장인 경우
            <GridContainer>
              {images.map((image, index) => (
                <Photo key={index} src={image}></Photo>
              ))}
            </GridContainer>
          )
        ) : null}
      </PhotoBox>
    </Wrapper>
  )
}