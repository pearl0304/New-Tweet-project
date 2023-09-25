import {firebaseAuth, firebaseDB, firebaseStorage} from "../firebase.ts";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {addDoc, collection, updateDoc} from "firebase/firestore";
import {getTweet} from "../common/common.ts";
import {AttachFileButton, AttachFileInput, Form, SubmitBtn, TextArea} from "../styled/post.styled.ts";
import moment from "moment/moment";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {GridContainer, Photo, PhotoBox} from "../styled/tweet.styled.ts";

export default function EditTweet() {
  /** USER VERIFICATION**/
  const user = firebaseAuth.currentUser;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [images, setImages] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[] | string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }

  const handleDeleteImage = async () => {
    try {
      console.log("여기서부터 작업하면 됨")
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getTweet(id).then((proc) => {
      setTweet(proc[0].tweet)
      setImages(proc[0].images)
    })
  }, []);


  return <Form>
    <TextArea placeholder="What is happening" onChange={onChange} value={tweet} rows={5} maxLength={180} required/>
    <div>
      {images ? (
        images.length === 1 ? (
          // 이미지가 한 장인 경우
          <div>
            <img src={images[0]}></img>
            <button type="button" onClick={handleDeleteImage}>X</button>
          </div>
        ) : (
          // 이미지가 여러 장인 경우
          <div>
            {images.map((image, index) => (
              <div key={index}>
                <img key={index} src={image}></img>
                <button type="button" onClick={handleDeleteImage}>X</button>
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
    <AttachFileButton htmlFor="file">Add photo</AttachFileButton>
    <AttachFileInput type="file" id="file" accept="image/*" multiple/>
    <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
  </Form>
}