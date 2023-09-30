import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {firebaseDB} from "../firebase.ts";

const getUser = async (uid: string | null) => {
  try {
    const userCollection = collection(firebaseDB, "users");
    const userQuery = query(userCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      }
    })
  } catch (e) {
    console.error(e)
  }

}

export const owner = async (uid: string | null) => {
  const data = await getUser(uid);
  return data[0];
}


export const getTweet = async (id: string | null) => {
  try {
    const docCollection = collection(firebaseDB, "tweets");
    const docQuery = query(docCollection, where("id", "==", id));
    const querySnapshot = await getDocs(docQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export const getBookmark = async (refId: string, uid: string | undefined) => {
  try {
    const docCollection = collection(firebaseDB, "bookmarks");
    const docQuery = query(docCollection, where("refId", "==", refId), where('uid', '==', uid));
    const querySnapshot = await getDocs(docQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      }
    })
  } catch (e) {
    console.log()
  }
}

export const getBookmarkList = async (uid: string) => {
  try {
    const docCollection = collection(firebaseDB, "bookmarks");
    const docQuery = query(docCollection, where('uid', '==', uid), orderBy("dateCreated", "desc"),
      limit(25));
    const querySnapshot = await getDocs(docQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      }
    })
  } catch (e) {
    console.error(e)
  }
}