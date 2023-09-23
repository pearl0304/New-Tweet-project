import {Form, TextArea, AttachFileButton, AttachFileInput, SubmitBtn} from "../styled/post.styled.ts";
import React, {useState} from "react";
import {addDoc, collection, updateDoc} from 'firebase/firestore'
import {firebaseAuth, firebaseDB, firebaseStorage} from "../firebase.ts";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import moment from "moment";


export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[] | string[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if(files.length > 5) {
      alert("You can only attach 4 photos at a time")
      return false
    }
    setSelectedFiles([...selectedFiles, ...files])
  }


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = firebaseAuth.currentUser;
    if (isLoading || !user || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(firebaseDB, "tweets"), {
        tweet,
        dateCreated: moment.utc().format(),
        uid: user.uid
      });

      if (selectedFiles.length < 5) {
        const images = [];
        for (const file of selectedFiles) {
          /** SET FIRE STORAGE PATH **/
          const locationRef = ref(
            firebaseStorage,
            `tweets/${user.uid}/${doc.id}/${file.name}`
          )
          const result = await uploadBytes(locationRef, file)
          const url = await getDownloadURL(result.ref);
          images.push(url)
        }
        await Promise.all(images);
        await updateDoc(doc, {
          images: images
        })
        setSelectedFiles(images)
      }
      setTweet("")


    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return <Form onSubmit={onSubmit}>
    <TextArea placeholder="What is happening" value={tweet} onChange={onChange} rows={5} maxLength={180} required/>
    <AttachFileButton htmlFor="file">Add photo</AttachFileButton>
    <AttachFileInput type="file" id="file" accept="image/*" onChange={onFileChange} multiple/>
    <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
  </Form>
}