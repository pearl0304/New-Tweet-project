import {collection, orderBy, query, limit, onSnapshot} from "firebase/firestore";
import {useEffect, useState} from "react";
import {ITweet} from "../interfaces.ts";
import {Wrapper} from "../styled/tweet-list.styled.ts";
import {firebaseDB} from "../firebase.ts";
import Tweet from "./tweet.tsx";
import {Unsubscribe} from "firebase/auth"

export default function TweetList() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    /** 유저가 로그아웃 했거나, 다른 화면에 있을 때 굳이 이벤트를 들을 필요가 없기때문에 마운트 됐을 때에만 Snapshot 하도록 처리**/
    let unsubscribe : Unsubscribe | null = null;
    const getList = async ()=> {
      const tweetQuery = query(
        collection(firebaseDB, "tweets"),
        orderBy("dateCreated","desc"),
        limit(25)
      );
      unsubscribe =  onSnapshot(tweetQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc)=> {
          const data = doc.data();
          return {
            ...data,
            id: doc.id
          };
        });

        setTweets(tweets)
      });
    }
    getList()
    return () => {
      unsubscribe && unsubscribe()
    }
  }, []);

  return (
    <Wrapper>
      {tweets?.map((tweet) => (
        <Tweet key={tweet.id} {...tweet}/>
      ))}
    </Wrapper>
  )
}