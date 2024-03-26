import DashboardSidebar from "../component/dashboardSidebar";
import DashboardTopbar from "../component/dashboardTopbar";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { wait } from "@testing-library/user-event/dist/utils";
import DashboardFeatures from "../component/dashboardFeatures";
import { sendPasswordResetEmail } from "firebase/auth";


export default function Userprofile() {

    const [userData, setUserData] = useState(null);

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedGender, setSelectedGender] = useState('');
    const [fullName, setFullName] = useState('');


    const handleNameChange = (e) => {
        const newNameChange = e.target.value;
        setFullName(newNameChange);
        console.log(fullName)
    };

    const handleDateOfBirthChange = (e) => {
        const newDateOfBirth = e.target.value;
        setDateOfBirth(newDateOfBirth);
        updateDateOfBirthToFirebase(newDateOfBirth);
    };

    const handleGenderChange = (e) => {
        const newGender = e.target.value;
        setSelectedGender(newGender);
        updateGenderToFirebase(newGender);
    };

    const updateNameToFirebase = () => {
        if (!fullName.includes(' ')) {
            alert("Please enter both first name and last name separated by a space.");
            return;
        }

        const [firstName, lastName] = fullName.split(' ');
        const user = auth.currentUser;
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        update(userRef, {
            firstName: firstName,
            lastName: lastName,
            username: fullName
        })
            .then(() => {
                console.log("Name updated successfully!");
                alert("Name Updated!");
                window.open("/profile", "_self")
            })
            .catch((error) => {
                console.error("Error updating name:", error);
            });
    };

    const updateDateOfBirthToFirebase = (newDateOfBirth) => {
        const user = auth.currentUser;
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        update(userRef, { dateOfBirth: newDateOfBirth })
            .then(() => {
                console.log("Date of birth updated successfully!");
                alert("Date Of Birth Updated!")
            })
            .catch((error) => {
                console.error("Error updating date of birth:", error);
            });
    };

    const updateGenderToFirebase = (newGender) => {
        const user = auth.currentUser;
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        update(userRef, { gender: newGender })
            .then(() => {
                console.log("Gender updated successfully!");
                alert("Gender Updated!")
            })
            .catch((error) => {
                console.error("Error updating gender:", error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                        if (snapshot.val().dateOfBirth) {
                            setDateOfBirth(snapshot.val().dateOfBirth);
                        }
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                console.log("No user signed in");
            }
        });

        return () => unsubscribe();
    }, []);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const emailVal = userData.email
        sendPasswordResetEmail(auth, emailVal).then(data => {
            alert("A link has been sent to your email!")
        }).catch(err => {
            alert("Invalid Email!")
        })
    }

    if (userData === null) {
        return <div><h1 style={{ fontSize: "5rem", textAlign: "center" }}>Loading...</h1></div>;
    }

    return (

        <div className="Dashboard">

            <div className="DashboardSidebar">
                <DashboardSidebar />
            </div>

            <div className="DashboardTopbar" style={{ border: "solid", borderColor: "white", width: "300px", borderTop: "10px", borderRight: "10px", borderLeft: "10px" }}>
                <h1 style={{ color: "white", marginLeft: "25px" }}>User Profile</h1>
            </div>

            <div className="DashboardFeatures">
                <div style={{ height: "860px" }}>

                    <div style={{ marginLeft: "10px", border: "solid", width: "300px", borderColor: "white", borderTop: "10px", borderRight: "10px", borderLeft: "10px", borderRadius: "3px" }}>
                        <h1 style={{ margin: "0px", color: "white", fontSize: "3rem" }}>User Profile</h1>
                        <h1 style={{ margin: "0px", color: "white", fontSize: "1rem" }}>Edit the contents of your profile!</h1>
                    </div>

                    <div style={{}}>
                        <div style={{ border: "solid", borderRadius: "100px", height: "150px", width: "150px", margin: "0px", marginLeft: "700px" }}></div>
                        <h1 style={{ textAlign: "center", fontSize: "3rem", color: "white", margin: "0px", marginRight: "40px" }}>{userData.username}</h1>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>

                        <div>
                            <h1 style={{ margin: "0px", marginLeft: "95px", marginBottom: "0px", color: "white" }}>Basic Information</h1>
                            <div style={{ margin: "0px", border: "solid", borderColor: "white", borderRadius: "10px", height: "540px", width: "650px", marginLeft: "93px", marginTop: "3px", display: "flex", flexDirection: "column" }}>
                                <div style={{ border: "solid", borderColor: "white", height: "105px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <label style={{ fontSize: "2rem", margin: "0", color: "white", paddingLeft: "10px" }}>Full Name:</label>
                                    <input style={{ fontSize: "2rem", margin: "0", color: "black", width: "350px" }} defaultValue={userData.username} onChange={handleNameChange}></input>
                                    <button style={{ fontSize: "2rem", margin: "0", marginRight: "0" }} onClick={updateNameToFirebase}>Update</button>
                                </div>



                                <div style={{ border: "solid", borderColor: "white", height: "105px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <label style={{ fontSize: "2rem", margin: 0, color: "white", paddingLeft: "10px" }}>Email Address:</label>
                                    <label style={{ fontSize: "2rem", margin: 0, color: "white", paddingRight: "10px" }}>{userData.email}</label>
                                </div>
                                <div style={{ border: "solid", borderColor: "white", height: "105px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <label style={{ fontSize: "2rem", margin: 0, color: "white", paddingLeft: "10px" }}>Date Of Birth:</label>
                                    <input style={{ margin: "0px", marginRight: "10px", width: "250px", height: "50px", textAlign: "center", fontSize: "2rem" }}
                                        type="date"
                                        className="form-control"
                                        name="dateOfBirth"
                                        defaultValue={userData.dateOfBirth}
                                        id="dateOfBirth"
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={handleDateOfBirthChange}
                                    />
                                </div>
                                <div style={{ border: "solid", borderColor: "white", height: "105px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <label style={{ fontSize: "2rem", margin: 0, color: "white", paddingLeft: "10px" }}>Password:</label>
                                    <div style={{ display: "flex", alignItems: "center", paddingRight: "10px" }}>
                                        <label style={{ fontSize: "2rem", margin: 0, color: "white" }}>**********</label>
                                        <button style={{ height: "40px", width: "70px", marginLeft: "10px" }} onClick={handlePasswordChange}>Change</button>
                                    </div>
                                </div>



                                <div style={{ border: "solid", borderColor: "white", height: "105px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <label style={{ fontSize: "2rem", margin: 0, color: "white", paddingLeft: "10px" }}>Gender:</label>
                                    <select id="selectGender" name="gender" style={{ fontSize: "1rem", marginRight: "10px", width: "350px", height: "50px", fontSize: "2rem", textAlign: "center" }} defaultValue={userData.gender ? userData.gender : "None"} onChange={handleGenderChange}>
                                        <option name="gender" value="None" disabled hidden>Choose...</option>
                                        <option name="gender" value="male"> Male</option>
                                        <option name="gender" value="female">Female</option>
                                        <option name="gender" value="preferNotToSay">Prefer Not to Say</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h1 style={{ margin: "0px", marginLeft: "95px", marginBottom: "5px", color: "white" }}>System Information</h1>
                                <div style={{ margin: "0px", border: "solid", borderColor: "white", borderRadius: "10px", height: "540px", width: "650px", marginLeft: "93px", marginTop: "3px", display: "flex", flexDirection: "column" }}>
                                    <div style={{ border: "solid", borderColor: "white", height: "50px", flexGrow: 1 }}>
                                        <h1 style={{ textAlign: "center", color: "white", fontSize: "2rem", marginBottom: "10px" }}>Notifcation Settings</h1>
                                    </div>
                                    <div style={{ border: "solid", borderColor: "white", height: "70px", textAlign: "center", flexGrow: 2 }}>
                                        <h1 style={{ margin: "0px", color: "white", marginTop: "20px" }}>Perferred Email Address: </h1>
                                        <label style={{ fontSize: "2rem", color: "white", marginTop: "10px" }}> {userData.email} </label>
                                    </div>
                                    <div style={{ border: "solid", borderColor: "white", height: "70px", flexGrow: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <h1 style={{ margin: "0px", color: "white" }}>Notifications Enabled:</h1>
                                        <input type="checkbox" style={{ margin: "10px", height: "100px", width: "100px" }} />
                                    </div>

                                    <div style={{ border: "solid", borderColor: "white", height: "140px", flexGrow: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <button style={{ fontSize: "3rem", padding: "20px 40px", borderRadius: "10px", backgroundColor: "lightgreen" }}>Advanced Settings</button>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            </div>

        </div>
    );
}