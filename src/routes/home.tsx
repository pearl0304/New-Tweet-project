import PostTweetForm from "../components/post-tweet-form.tsx";
import styled from "styled-components";
import TweetList from "../components/tweet-list.tsx";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;
export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm/>
      <TweetList/>
    </Wrapper>
  )
}