import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { auth } from '../../firebase/config';
import './auth.css';

const Auth = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const errorText = useRef();
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [onLogin, setOnLogin] = useState(false);

  const authError = (message) => {
    errorText.current.innerText = message
  }

  const changeAuthType = () => {
    emailInput.current.value = "";
    passwordInput.current.value = "";
    onLogin ? setOnLogin(false) : setOnLogin(true);
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);
      navigate('/home');
    } catch (error) {
      authError(error.message);
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      navigate('/home');
    } catch (error) {
      authError(error.message);
      console.log(error.message);
    }
  };
  
  return(
    <main className="auth">
      <section className="auth__section">
        { 
          onLogin ? 
          <>
            <h1>Login</h1>
            <input ref={emailInput} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email"/>
            <input ref={passwordInput} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
            <button onClick={login}>Login</button> 
            <span onClick={changeAuthType}>Dont have an account ? Sign in</span>
          </> : 
          <>
            <h1>Register</h1>
            <input ref={emailInput} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Email"/>
            <input ref={passwordInput} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password" />
            <button onClick={register}>Register</button> 
            <span onClick={changeAuthType}>Already have an account ? Login in</span>
          </>
        }
        <h4 ref={errorText} className="auth__section-error"> ERROR </h4>
      </section>
    </main>
  )
}

export default Auth