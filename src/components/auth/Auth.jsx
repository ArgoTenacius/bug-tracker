import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { auth } from '../../firebase/config';
import './auth.css';

const Auth = ({setUser}) => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [onLogin, setOnLogin] = useState(false);

  const changeAuthType = () => {
    onLogin ? setOnLogin(false) : setOnLogin(true);
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);
      navigate('/home');
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      navigate('/home');
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  
  return(
    <main className="auth">
      <section className="auth__section">
        { 
          onLogin ? 
          <>
            <h1>Login</h1>
            <input onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email"/>
            <input onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
            <button onClick={login}>Login</button> 
            <span onClick={changeAuthType}>Dont have an account ? Sign in</span>
          </> : 
          <>
            <h1>Register</h1>
            <input onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Email"/>
            <input onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password" />
            <button onClick={register}>Register</button> 
            <span onClick={changeAuthType}>Already have an account ? Login in</span>
          </>
        }
      </section>
    </main>
  )
}

export default Auth