import React, {useState} from "react";
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import {firebaseAuth, firebaseDB} from "../firebase.ts";
import {useNavigate, Link} from "react-router-dom";
import {Wrapper, Title, Form, Input, Switcher, Error} from "../styled/auth.styled.ts";
import firebase from "firebase/compat";
import AuthCredential = firebase.auth.AuthCredential;
import User = firebase.User;
import {addDoc, collection} from "firebase/firestore";
import moment from "moment/moment";
import {owner} from "../common/common.ts";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if (isLoading || formData.email === "" || formData.password === "") return;
    try {
      setLoading(true)
      await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password)
      navigate("/")


    } catch (error) {
      // TODO : SET ERROR **/
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const googlePopup = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential: AuthCredential = GoogleAuthProvider.credentialFromResult(result);
        const token: string = credential.accessToken;
        const user: User = result.user;

        /** SET THE NAME OF THE  USER **/
        updateProfile(credential.user, {displayName: credential.displayName});

        /** CREATE USER DOCUMENT**/
        owner(user.uid).then((data) => {
          if (data === undefined) {
            addDoc(collection(firebaseDB, "users"), {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              dateCreated: moment().utc().format()
            })
          }
        });

        navigate("/");
      })
      .catch((error) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;
        GoogleAuthProvider.credentialFromError(error);
        setError(`${errorCode} : ${errorMessage}`);
      });
  }

  return <Wrapper>
    <Title>Log In 🥕</Title>
    <Form onSubmit={onSubmit}>
      <Input name="email" value={formData.email} onChange={onChange} placeholder="Email" type="email" required/>
      <Input name="password" value={formData.password} onChange={onChange} placeholder="Password" type="password"
             required/>
      <Input type="submit" value="Login"/>
    </Form>
    <Input type="button" value="Login with Google" onClick={googlePopup}/>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
      Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
    </Switcher>
  </Wrapper>
}