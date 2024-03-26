import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });
        return () => {
            listen();
        }

    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign out successful")
        }).catch(error => console.log(error))
    }


    return (
        <div>
            {authUser ? (
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p>Signed In As {authUser.email}</p>
                        <button onClick={() => { userSignOut(); window.open("/", "_self"); }}>Sign Out</button>
                    </div>

                </>
            ) : (
                <p></p>
            )}
        </div>

    )
}


export default AuthDetails