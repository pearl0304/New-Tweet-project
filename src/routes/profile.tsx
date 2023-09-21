import {
  Wrapper,
  AvatarBox,
  AvatarImg,
  AvatarInput,
  AvatarUpload,
  Name,
  Tweets,
  PlusButton, Top, Box, Info
} from "../styled/profile.styled.ts";
import {firebaseAuth, firebaseStorage, firebaseDB} from "../firebase.ts";
import React, {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from "firebase/auth";
import {collection, query, where, getDocs, limit, orderBy, updateDoc, doc} from "firebase/firestore";
import {ITweet} from "../interfaces.ts";
import Tweet from "../components/tweet.tsx";

export default function Profile() {
  const user = firebaseAuth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const getMyTweets = async () => {
    const tweetQuery = query(
      collection(firebaseDB, "tweets"),
      where("uid", "==", user?.uid),
      orderBy("dateCreated", "desc"),
      limit(25)
    );
    const snapShot = await getDocs(tweetQuery);
    const tweets = snapShot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      }
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTweets(tweets);
  };

  useEffect(() => {
    getMyTweets()
  }, []);


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
      try {
        const userQuery = query(collection(firebaseDB, 'users'), where('uid', '==', user.uid));
        const querySnapShot = await getDocs(userQuery);
        const updatePromise: Promise<void>[] = [];
        querySnapShot.forEach((proc) => {
          const userRef = doc(firebaseDB, "users", proc.id);
          updatePromise.push(updateDoc(userRef, {photoURL: avatarUrl}));
          setAvatar(avatarUrl);
        });
        await Promise.all(updatePromise)
      } catch (e) {
        console.warn('Error : Update Profile')
      }
    }
  };

  return (
    <Wrapper>
      <Box>
        <AvatarBox>
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
          <PlusButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"/>
            </svg>
          </PlusButton>
          <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*"></AvatarInput>
        </AvatarBox>
        <Name>{user?.displayName ?? "User"}</Name>
      </Box>
      <Tweets>{tweets.map((tweet) => (<Tweet key={tweet.id} {...tweet}/>))}</Tweets>
    </Wrapper>
  )
}