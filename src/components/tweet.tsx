import {
  Payload,
  Photo,
  UserName,
  Wrapper,
  Box,
  MoreBox,
  PhotoBox,
  Profile,
  UserInfo
} from "../styled/tweet.styled.ts";
import {useEffect, useRef, useState} from "react";
import MoreMenu from "./more-menu.tsx";
import {user} from "../common/common.ts";

export default function Tweet({photoURL, tweet, uid, id}: {
  photoURL: string,
  tweet: string,
  uid: string,
  id: string
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const tweetRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLDivElement | null>(null);


  user(uid).then((data) => {
    setDisplayName(data.displayName);
    setProfile(data.photoURL)
  })


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
            <img src={profile ? profile : '/public/images/user.png'}/>
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
        {open && (<MoreMenu uid={uid} id={id} photoURL={photoURL}/>)}
      </Box>
      <Payload>{tweet}</Payload>
      <PhotoBox>{photoURL ? <Photo src={photoURL}></Photo> : null}</PhotoBox>
    </Wrapper>
  )
}