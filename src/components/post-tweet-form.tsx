import {Form, TextArea, AttachFileButton, AttachFileInput, SubmitBtn} from "../styled/post.styled.ts";
import React, {useState} from "react";
import {addDoc, collection, updateDoc} from 'firebase/firestore'
import {firebaseAuth, firebaseDB, firebaseStorage} from "../firebase.ts";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import moment from "moment";


export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("")
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;

    if (files && files[0].size >  2 * 1024 * 1024) {
      alert("Please attach an image of 1MB or less")
      return false
    }

    if (files && files.length === 1 && files[0].size < 2 * 1024 * 1024) {
      setFile(files[0])
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = firebaseAuth.currentUser;
    if (isLoading || !user || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true)
      const doc = await addDoc(collection(firebaseDB, "tweets"), {
        tweet,
        dateCreated: moment.utc().format(),
        displayName: user.displayName || "User",
        uid: user.uid
      });

      if (file) {
        /** SET FIRE STORAGE PATH **/
        const locationRef = ref(
          firebaseStorage,
          `tweets/${user.uid}/${doc.id}`
        )
        const result = await uploadBytes(locationRef, file)
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photoURL: url
        })
      }
      setTweet("")
      setFile(null)

    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return <Form onSubmit={onSubmit}>
    <TextArea placeholder="What is happening" value={tweet} onChange={onChange} rows={5} maxLength={180} required/>
    <AttachFileButton htmlFor="file">{file ? "Photo added ✅" : "Add photo"}</AttachFileButton>
    <AttachFileInput type="file" id="file" accept="image/*" onChange={onFileChange}/>
    <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
  </Form>
}