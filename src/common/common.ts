import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {firebaseDB} from "../firebase.ts";

export const getUser = async (uid: string) => {
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

export const owner = async (uid: string) => {
  const data = await getUser(uid);
  return data[0];
}


export const getTweet = async (id: string) => {
  try {
    if (id) {
      const docCollection = collection(firebaseDB, "tweets");
      const docQuery = query(docCollection, where("id", "==", id));
      const querySnapshot = await getDocs(docQuery);
      const result = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id
        }
      })
      return result;

    } else {
      return null
    }
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
    const bookmarkList = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      }
    });

    const result = await Promise.all(bookmarkList.map(async (data) => {
      if (data.refId) {
        const tweet = await getTweet(data.refId);
        return tweet;
      } else {
        console.error(`Invalid refId in bookmark data : ${JSON.stringify(data)}`)
        return null;
      }
    }));
    return result;
  } catch (e) {
    console.error(e)
  }
}