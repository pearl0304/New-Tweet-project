import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth} from "../firebase.ts";
import {useNavigate, Link} from "react-router-dom";
import {Wrapper,Title, Form, Input, Switcher , Error} from "../styled/auth.styled.ts";

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

  return <Wrapper>
    <Title>Log In 🥕</Title>
    <Form onSubmit={onSubmit}>
      <Input name="email" value={formData.email} onChange={onChange} placeholder="Email" type="email" required/>
      <Input name="password" value={formData.password} onChange={onChange} placeholder="Password" type="password"
             required/>
      <Input type="submit" value="Login"/>
    </Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
      Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
    </Switcher>
  </Wrapper>
}