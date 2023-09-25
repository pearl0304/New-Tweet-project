import {collection, doc, getDocs, query, where} from "firebase/firestore";
import {firebaseDB} from "../firebase.ts";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

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


export const getTweet = async (id: string | null) => {
  const docCollection = collection(firebaseDB, "tweets");
  const docQuery = query(docCollection, where("id", "==", id));
  const querySnapshot = await getDocs(docQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id : doc.id
    }
  })
}