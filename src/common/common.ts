import {collection, getDocs, query, where} from "firebase/firestore";
import {firebaseDB} from "../firebase.ts";

const getUser = async (uid: string | null) => {
  const userCollection = collection(firebaseDB, "users");
  const userQuery = query(userCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(userQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id : doc.id
    }
  })
}

export const owner = async (uid: string | null)  => {
  const data = await getUser(uid);
  return data[0];
}