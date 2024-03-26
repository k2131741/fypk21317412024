import { Database } from "firebase/database";
import { db } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function PasswordReset() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value
        sendPasswordResetEmail(auth, emailVal).then(data => {
            alert("A link will be sent if you are registered!")
        }).catch(err => {
            alert("Invalid Email!")
        })
    }


    return (
        <>

            <div style={{ paddingTop: "200px" }}>


                <div style={{ textAlign: "center", color: "white", fontSize: "1.05rem" }}>
                    <h1 >A One Time link will be sent to your email!</h1>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} style={{ justifyContent: "center", textAlign: "center", display: "flex", flexDirection: "column" }}>

                    <input name="email" style={{ width: "650px", height: "30px", fontSize: "2rem", marginBottom: "1px" }} placeholder="Enter Email"></input>

                    <button type="button" onClick={() => window.open('/reset', '_self')} style={{
                        backgroundColor: "transparent",
                        outline: 0,
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        marginLeft: "auto",
                        boxSizing: "border-box",
                        padding: "0",
                        position: "absolute",
                        right: "545px",
                        top: "325px"

                    }}>Resend Code</button>


                    <button type="submit" style={{ width: "150px", margin: "10px auto", backgroundColor: "lightGreen", fontSize: "2rem" }}>SEND</button>
                    <button type="button" onClick={() => window.open('/', '_self')} style={{ width: "150px", margin: "10px auto", backgroundColor: "orange", fontSize: "2rem" }}>BACK</button>

                </form>

            </div >




        </>
    )
}