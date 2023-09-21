import {collection, getDocs, query, where} from "firebase/firestore";
import {firebaseDB} from "../firebase.ts";

const getUser = async (uid: string) => {
  const userCollection = collection(firebaseDB, "users");
  const userQuery = query(userCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(userQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      displayName: data.displayName,
      photoURL: data.photoURL
    }
  })
}

export const user = async (uid: string) => {
  const data = await getUser(uid);
  return data[0];
}