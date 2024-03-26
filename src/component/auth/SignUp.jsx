import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Navigate, useHistory, useNavigate } from "react-router-dom";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [priority1Checked, setPriority1Checked] = useState(false);
    const [priority2Checked, setPriority2Checked] = useState(false);


    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        password: "",
    })

    const signUp = (e) => {
        e.preventDefault();



        if (!email) {
            alert("Enter an email!");
            return;
        }
        if (!password) {
            alert("Enter a password!");
            return;
        }
        if (email !== confirmEmail) {
            alert("Emails don't match");
            return;
        }
        if (password !== confirmPass) {
            alert("Passwords do not match!")
            return;
        }

        if (!priority2Checked) {
            alert("Please agree to conditions!");
            return;
        }




        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                window.alert("User Created!")
                const user = userCredential.user
                set(ref(db, 'users/' + user.uid), {
                    username: firstname + " " + lastname,
                    fname: firstname,
                    lname: lastname,
                    email: email,
                    id: user.uid
                });
                //window.open("/dashboard", "_self");
            }).catch((error) => {
                console.log(error);
                alert("An error has occured please retry!")
            });
    }

    const getData = (e) => {
        const { email, password, firstname, lastname } = user;
        e.preventDefault()
    }


    const handleCheckboxTick = (event) => {
        const { id, checked } = event.target;

        if (id === "priority1") {
            setPriority1Checked(checked);
        } else if (id === "priority2") {
            setPriority2Checked(checked);
        }
    };

    return (
        <div className='sign-up-container' style={{ paddingTop: "120px" }}>
            <div className="Header" style={{ paddingRight: "355px" }}>
                <h1 style={{ backgroundColor: "darkblue", margin: "10px auto", width: "250px", color: "white", border: "solid", borderColor: "black" }}>Create Account</h1>
            </div>
            <duv style={{marginRight:"353px"}}>
                <label style={{paddingRight:"2px"}}>Already have an account?</label>
                <button style={{textDecoration:"underline", color: "blue", border :"none", backgroundColor : "transparent"}} onClick={() => window.open('/', '_self')} >Sign in?</button>
            </duv>
            <form onSubmit={signUp} className="center-form" style={{ display: "flex", flexDirection: "column" }}>
                <div className="name-input-container" style={{ textAlign: "center" }}>
                    <input type="text" placeholder='First Name' style={{ marginRight: '5px', width: "293px", height: "30px" }} value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder='Last Name' style={{ marginLeft: '5px', width: "290px", height: "31px" }} value={lastname} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <input type="email" placeholder='Enter your email' style={{ width: "600px", height: "30px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="email" placeholder='Confirm your email' style={{ width: "600px", height: "30px" }} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                <input type="password" placeholder='Enter your password' style={{ width: "600px", height: "30px" }} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='Confirm password' style={{ width: "600px", height: "30px" }} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

                <div className='Priority1' style={{ textAlign: "center" }} >

                    <input type='checkbox' id="priority1" name="priority" style={{ width: "18px", height: "18px", marginRight: "10px", verticalAlign: "midle" }} onChange={(event) => {
                        handleCheckboxTick(event);

                    }} />
                    <label htmlFor="priority1" style={{ color: "white", alignSelf: "start", fontSize: "1.3rem" }}>I want newsletters sent to my email.</label>
                </div>


                <div className='Priority2' style={{ textAlign: "center" }}>
                    <input type='checkbox' id="priority2" name="priority" style={{ width: "18px", height: "18px", marginRight: "10px", verticalAlign: "midle" }} onChange={(event) => {
                        handleCheckboxTick(event);
                    }} />
                    <label htmlFor="priority2" style={{ color: "blue", alignSelf: "start", textDecoration: "underline", fontSize: "1.3rem" }}>I have agreed to the terms and conditions</label>
                </div>


                <button type="submit" style={{ margin: "10px auto", width: "100px", height: "30px", fontSize: "1.5rem", backgroundColor: "lightgreen" }}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp
