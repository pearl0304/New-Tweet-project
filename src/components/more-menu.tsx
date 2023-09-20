import {Column, Icon, Menu, MoreLi, MoreUl, PopupWrapper} from "../styled/moreMenu.styled.ts";
import {deleteDoc, doc} from "firebase/firestore";
import {firebaseAuth, firebaseDB, firebaseStorage} from "../firebase.ts";
import {deleteObject, ref} from "firebase/storage";


export default function MoreMenu({uid, photoURL, id}: { uid: string, photoURL: string, id: string }) {

  const user = firebaseAuth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweets?");
    if (!ok || user?.uid !== uid) return;
    try {
      await deleteDoc(doc(firebaseDB, "tweets", id));
      if (photoURL) {
        const photoRef = ref(firebaseStorage, `tweets/${user?.uid}/${id}`);
        await deleteObject(photoRef)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <PopupWrapper>
      <MoreUl>
        <MoreLi>
          <Column>
            <Icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
              </svg>
            </Icon>
            <Menu>Save</Menu>
          </Column>
        </MoreLi>
        {user?.uid === uid ? (
          <MoreLi>
            <Column>
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
              </Icon>
              <Menu>Edit</Menu>
            </Column>
          </MoreLi>) : null
        }

        {user?.uid === uid ? (<MoreLi>
          <Column className="delete" onClick={onDelete}>
            <Icon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </Icon>
            <Menu>Delete</Menu>
          </Column>
        </MoreLi>) : null}
      </MoreUl>
    </PopupWrapper>
  )
}