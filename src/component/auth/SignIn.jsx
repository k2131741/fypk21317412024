import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                window.alert("Logged in successfully!")
                window.open('/dashboard', '_self');
            }).catch((error) => {
                console.log(error);
                window.alert("Error!")
            });
    }


    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "150px" }}>


                <h1 style={{

                    backgroundColor: "#3C649F",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "3rem",
                    borderWidth: "2px",
                    borderRadius: "5px",
                }}> WELCOME! </h1>

                <input type="email" style={{ width: "500px", height: "25px" }} placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" style={{ width: "500px", height: "25px", marginBottom: "5px" }} placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="button" onClick={() => window.open('/reset', '_self') } style={{
                    backgroundColor: "transparent",
                    outline: 0,
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    marginLeft: "auto",
                    boxSizing: "border-box",
                    padding: "0",
                }}>Forgot Password</button>

                <button style={{ width: "150px", height: "30px", fontSize: "1.5rem", backgroundColor : "lightgreen"}} type="submit">Log In</button>

                <div className='sign-up-button-home' style={{ paddingTop: "10px"}}>
                    <button onClick={() => window.open('/register', '_self')} type="submit" style={{backgroundColor: "lightgreen", width: "150px", height: "30px", fontSize: "1.5rem" }} className="sign-up-button">Sign Up</button>
                </div>
            </form>

        </div >
    );
};

export default SignIn