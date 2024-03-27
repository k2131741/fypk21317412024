import DashboardSidebar from "../component/dashboardSidebar";
import DashboardFeatures from "../component/dashboardFeatures";
import DashboardTopbar from "../component/dashboardTopbar";
import CreateTask from "../component/tasks/createtask";
import { useState, useEffect } from "react";
import TeamsItem from "../component/teamsItem";
import lockLogo from "../images/lockLogo.png";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../firebase";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update, set } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

export default function Teamviewpage() {

    const [isVisible, setIsVisible] = useState(false);
    const [visibility, setVisibility] = useState('Invite Only');
    const [visibilityDesc, setVisibilityDesc] = useState('Only people you invite can join this team!');

    const [teamData, setTeamData] = useState(null);

    const [userJoinCode, setuserJoinCode] = useState(null);


    const [formData, setFormData] = useState({
        teamName: null,
        teamDescription: null,
        visbility: { visibility },
        joinCode: null,
    });

    const [adminData, setadminData] = useState({
        type: "admin",
    });
    const [regularUser, setRegularUser] = useState({
        type: "member",
    });


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(getDatabase());
                const teamsPromise = get(child(dbRef, `teams/`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setTeamData(snapshot.val());
                    } else {
                        console.log("No team data available");
                        setTeamData([]);
                    }
                }).catch((error) => {
                    console.error(error);
                    setTeamData([]);
                });


                Promise.all([teamsPromise]).then(() => {
                    console.log("All data loaded successfully");
                }).catch((error) => {
                    console.error("Error loading data:", error);
                });
            } else {
                console.log("No user signed in");
                setTeamData([]);
            }
        });

        return () => unsubscribe();
    }, []);




    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsVisible(!isVisible);
    }

    const setVisibilityOption = (option, event) => {
        setVisibility(option);
        setIsVisible(false);
    }

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    function generateRandomJoinCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let joinCode = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            joinCode += characters[randomIndex];
        }
        return joinCode;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        const teamId = uuidv4();
        const randomJoinCode = generateRandomJoinCode(6);
        console.log(randomJoinCode)
        setFormData({ ...formData, joinCode: randomJoinCode });


        set(ref(db, 'teams/' + teamId), formData)
            .then(() => {
                alert("Team has been created");
                set(ref(db, `teams/${teamId}/members/` + user.uid), adminData)
                    .then(() => {
                        alert("Added To User!")
                    })
                    .catch((error) => {
                        console.error("Error Adding Team To User!:", error);
                    });
            })
            .catch((error) => {
                console.error("Error creating team: ", error);
            });
    }

    function joinTeam() {
        let found = false;
        let teamIdMatched = null;

        teamData && Object.keys(teamData).forEach(teamId => {
            const team = teamData[teamId];
            if (userJoinCode === team.joinCode) {
                found = true;
                teamIdMatched = teamId;
            }
        });
        if (!found) {
            alert("Join Code is Invalid!");
        } else {
            console.log("Found!");
            console.log("Team ID matched:", teamData[teamIdMatched]);
            set(ref(db, `teams/${teamIdMatched}/members/` + auth.currentUser.uid), regularUser)
                .then(() => {
                    alert("Added To User!")
                    window.open("/teams", "_self")
                })
                .catch((error) => {
                    console.error("Error Adding Team To User!:", error);
                });
        }
    }


    if (!teamData) {
        return <div style={{ textAlign: "center", fontSize: "5rem" }}>Loading</div>;
    }

    return (
        <div className="Createtask">
            <div className="ctasksidebar">
                <DashboardSidebar />
            </div>

            <div className="ctasktopbar">
                <h1>Teams</h1>
            </div>

            <div className="ctaskmain">


                <div style={{ margin: "0px", color: "white" }}>
                    <h1 style={{ margin: "0px" }}>Teams</h1>
                    <h2 style={{ margin: "0px", fontSize: "1rem" }}>Create teams or manage them!</h2>
                </div>


                <div>
                    <h1 style={{ color: "white", margin: "0px", marginTop: "50px", fontSize: "2.5rem" }}>Your Teams</h1>

                    <div style={{ border: "solid", height: "225px", width: "1000px", overflowX: "auto", whiteSpace: "nowrap", display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "0px" }}>


                        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex' }}>
                            {teamData && Object.keys(teamData).map(teamId => {
                                const team = teamData[teamId];
                                const members = team.members || {};

                                const isMember = Object.keys(members).includes(auth.currentUser.uid);

                                if (isMember) {
                                    return (
                                        <div key={teamId} style={{ marginRight: '10px' }}>
                                            <TeamsItem
                                                title={team.teamName}
                                                idOfTeam={teamId}
                                            />
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}

                        </div>

                    </div>
                </div>

                <div style={{ margin: "0px" }}>
                    <h1 style={{ margin: "0px", marginTop: "75px", fontSize: "2.5rem", color: "white", margin: "0px" }}>Join Team</h1>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input onChange={(e) => setuserJoinCode(e.target.value)} placeholder="Enter Join Code" style={{ width: "250px", height: "50px", margin: "0px" }}></input>
                        <button type="button" style={{ width: "75px", height: "55px" }} onClick={joinTeam}>Join</button>
                    </div>
                </div>

                <div>
                    <div style={{ margin: "0px", color: "white" }}>
                        <h1 style={{ margin: "0px", marginTop: "25px", fontSize: "2.5rem" }}>Create Team</h1>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", marginTop: "0px", marginLeft: "10px" }}>

                            <div style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}>
                                <label style={{ width: "100%", fontSize: "1.8rem" }}>Team Name</label>
                                <textarea
                                    className="form-control"
                                    id="exampleInputDescription1"
                                    rows={2}
                                    style={{ height: '40px', width: '40%' }}
                                    placeholder=""
                                    name="teamName"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}>
                                <label style={{ width: "40%", fontSize: "1.8rem" }}>Team Description</label>
                                <textarea
                                    className="form-control"
                                    id="exampleInputDescription1"
                                    rows={2}
                                    style={{ height: '40px', width: '40%' }}
                                    placeholder=""
                                    name="teamDescription"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row" }}>

                                <div style={{ position: "relative", border: "solid", borderColor: "black", display: "flex", flexDirection: "row", marginTop: "25px", width: "40.3%", height: "150px", borderColor: "black", backgroundColor: "white", border: "solid", alignItems: "center" }}>
                                    <img src={lockLogo} style={{ height: "120px", width: "120px" }}></img>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <h1 style={{ color: "black", marginBottom: "auto" }}>{visibility}</h1>
                                        <h2 style={{ color: "black", marginTop: "auto" }}>{visibilityDesc}</h2>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", position: "relative", marginBottom: "30px", marginLeft: "20px" }}>
                                        <button onClick={toggleDropdown} style={{ width: "160px", backgroundColor: isVisible ? "transparent" : "transparent", color: "black", height: "50px", fontSize: "70px", border: "none", cursor: "pointer", position: "relative" }}>▼</button>
                                        {isVisible && (
                                            <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#f9f9f9", minWidth: "160px", boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", zIndex: "1" }}>
                                                <div onClick={(e) => { setVisibilityOption('Invite Only'); setVisibilityDesc("Only people you invite can join this team!") }} style={{ color: "black", padding: "12px 16px", textDecoration: "none", cursor: "pointer" }}>Invite Only</div>
                                                <div onClick={(e) => { setVisibilityOption('Public'); setVisibilityDesc("This team is open to everyone!") }} style={{ color: "black", padding: "12px 16px", textDecoration: "none", cursor: "pointer" }}>Public</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{}}>
                                    <button type="submit" style={{ marginLeft: "10px", marginTop: "125px", fontSize: "2.5rem", height: "60px", width: "180px", border: "solid", borderColor: "black", borderRadius: "10px", backgroundColor: "lightgreen" }}>Create</button>
                                </div>

                            </div>




                        </form>



                    </div>
                </div>


            </div>

        </div>
    );
}