import {Column, DeleteButton, EditButton, Payload, Photo, UserName, Wrapper} from "../styled/tweet.styled.ts";
import {ITweet} from "../interfaces.ts";
import {firebaseDB, firebaseAuth, firebaseStorage} from "../firebase.ts";
import{deleteDoc, doc} from "firebase/firestore"
import {deleteObject, ref} from "firebase/storage"


export default function Tweet({displayName, photoURL, tweet, uid, id}: ITweet) {
  const user = firebaseAuth.currentUser;
  const onDelete = async ()=> {
    const ok = confirm("Are you sure you want to delete this tweets?");
    if(!ok || user?.uid !== uid) return;
    try {
      await deleteDoc(doc(firebaseDB, "tweets", id));
      if(photoURL) {
        const phoroRef = ref(firebaseStorage, `tweets/${user.uid}/${id}`);
        await deleteObject(phoroRef)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <Wrapper>
      <Column>
        <UserName>{displayName}</UserName>
        <Payload>{tweet}</Payload>
        {user?.uid === uid ? (<EditButton>✏️</EditButton>) : null}
        {user?.uid === uid ? (<DeleteButton onClick={onDelete}>x</DeleteButton>) : null}
      </Column>
      <Column>{photoURL ? <Photo src={photoURL}></Photo> : null}</Column>
    </Wrapper>
  )
}