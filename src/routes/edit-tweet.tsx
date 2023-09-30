import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import moment from "moment/moment";
import {firebaseAuth, firebaseDB, firebaseStorage} from "../firebase.ts";
import {getTweet} from "../common/common.ts";
import {AttachFileButton, AttachFileInput, Form, SubmitBtn, TextArea} from "../styled/post.styled.ts";
import {DeleteButton, EditWrap, GridContainer, Photo, PhotoBox} from "../styled/tweet.styled.ts";

export default function EditTweet() {
  /** USER VERIFICATION**/
  const user = firebaseAuth.currentUser;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  if (id === '' || !user) return;

  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();


  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = [...images];
    updatedImages.splice(indexToRemove, 1);
    setImages(updatedImages);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (images.length + files.length > 4) {
        setError('You can upload a maximum of 4 images')
      } else {
        setError('')
        const newFiles = Array.from(files);
        setSelectedFiles([...selectedFiles, ...newFiles])
      }
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uploadImageUrls: string[] = [];
    for (const file of selectedFiles) {
      const storageRef = ref(firebaseStorage, `tweets/${user.uid}/${id}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadImageUrls.push(url);
      } catch (e) {
        console.warn('Error uploading image to Firebase Storage : ', error);
      }
    }

    /** COMBINE EXISTING IMAGE AND NEWLY UPLOADED IMAGE **/
    const finalImages = [...images, ...uploadImageUrls];

    /** UPDATE FIREBASE **/
    try {
      await updateDoc(doc(firebaseDB, 'tweets', id), {
        tweet: tweet,
        images: finalImages,
        dateUpdated: moment().utc().format()
      });

      setLoading(false);
      navigate('/');
    } catch (e) {
      console.warn(e);
      setError('Failed to update the tweet')
    }
  }

  useEffect(() => {
    getTweet(id).then((proc) => {
      setTweet(proc[0].tweet)
      setImages(proc[0].images)
    })
  }, []);


  return <Form onSubmit={onSubmit}>
    <TextArea placeholder="What is happening" onChange={onChange} value={tweet} rows={5} maxLength={180} required/>
    <PhotoBox>
      {images.length > 0 ? (
        <GridContainer>
          {images.map((image, index) => (
            <EditWrap key={index}>
              <Photo src={image} alt={`Image ${index}`}></Photo>
              <DeleteButton type="button" onClick={() => handleRemoveImage(index)}> X</DeleteButton>
            </EditWrap>
          ))}
        </GridContainer>
      ) : null}
    </PhotoBox>
    <AttachFileButton htmlFor="file">Add photo</AttachFileButton>
    <AttachFileInput type="file" id="file" accept="image/*" multiple onChange={handleFileUpload}/>
    <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Edit Tweet"}/>
  </Form>
}