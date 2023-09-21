import {Wrapper, Title, Form, Input, Switcher, Error} from "../styled/auth.styled.ts";
import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {firebaseAuth, firebaseDB} from "../firebase.ts";
import {useNavigate, Link} from "react-router-dom";
import {addDoc, collection} from "firebase/firestore";
import moment from "moment";


export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
    try {
      setLoading(true)
      if (isLoading || formData.name == "" || formData.email === "" || formData.password === "") return;

      /** CREATE AN ACCOUNT **/
      const credentials = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password)

      /** SET THE NAME OF THE  USER **/
      await updateProfile(credentials.user, {displayName: formData.name});

      /** CREATE USER DOCUMENT**/
      await addDoc(collection(firebaseDB, "users"), {
        uid: credentials.user.uid,
        displayName: credentials.user.displayName,
        email: credentials.user.email,
        dateCreated: moment().utc().format()
      }).then(() => {
        /** REDIRECT TO THE HOME PAGE **/
        navigate("/");
      });
    } catch (error) {
      // TODO : SET ERROR **/
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return <Wrapper>
    <Title>Join 🥕</Title>
    <Form onSubmit={onSubmit}>
      <Input name="name" value={formData.name} onChange={onChange} placeholder="Name" type="text" required/>
      <Input name="email" value={formData.email} onChange={onChange} placeholder="Email" type="email" required/>
      <Input name="password" value={formData.password} onChange={onChange} placeholder="Password" type="password"
             required/>
      <Input type="submit" value="Create Account"/>
    </Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
      Already you have an account?? <Link to="/login">Log in &rarr;</Link>
    </Switcher>
  </Wrapper>
}