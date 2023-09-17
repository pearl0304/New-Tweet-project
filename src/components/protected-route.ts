import React, {useEffect} from "react";
import {firebaseAuth} from "../firebase.ts";
import {useNavigate} from "react-router-dom";

export default function ProtectedRoute({children}: { children: React.ReactNode }) {

  const navigate = useNavigate()
  const user = firebaseAuth.currentUser;

  useEffect(()=> {
    if(user === null) {
      navigate('/login')
    }
  },[user, navigate])

  if(user === null) {
    return null;

  }
  return children;
}