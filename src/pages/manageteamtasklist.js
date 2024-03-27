import { auth } from "../firebase";
import DashboardSidebar from "../component/dashboardSidebar";
import DashboardTopbar from "../component/dashboardTopbar";
import TaskListItemTeam from "../component/tasklistitemteam";
import { useState, useEffect } from "react";
import { set, ref, get, remove } from "firebase/database";
import { child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { db } from "../firebase";

export default function Manageteamtasklist() {

    const userData = null

    const urlParams = new URLSearchParams(window.location.search);
    const idOfTeam = urlParams.get('id');

    const [teamTasks, setTeamTasks] = useState(null);

    const [teamMembers, setTeamMembers] = useState(null);
    const [userList, setUserList] = useState(null)

    const [userTeam, setUserTeam] = useState(null)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(getDatabase());

                get(child(dbRef, `teams/${idOfTeam}/members`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setTeamMembers(snapshot.val());
                    } else {
                        console.log("No data available");
                        setTeamMembers([]);
                    }
                })

                get(child(ref(db), `users`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log(snapshot.val());
                            const data = snapshot.val();
                            setUserList(snapshot.val());
                        } else {
                            console.log("No data available");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                get(child(dbRef, `teams/${idOfTeam}/tasks/`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setTeamTasks(snapshot.val());

                    } else {
                        console.log("No data available");
                        setTeamTasks([]);
                    }
                }).catch((error) => {
                    console.error(error);
                    setTeamTasks([]);
                });
            } else {
                console.log("No user signed in");
                setTeamTasks([]);
            }
        });

        return () => unsubscribe();
    }, []);


    function leaveTeam(id) {
        const confirmation = window.confirm("Are you sure you want to leave this team?");
        if (confirmation) {
            const dbRef = ref(getDatabase());
            const memberRef = child(dbRef, `teams/${idOfTeam}/members/${auth.currentUser.uid}`);

            remove(memberRef).then(() => {
                alert("Successfully left team!");
                window.open("/teams", "_self");
            }).catch((error) => {
                console.error("An error occurred:", error);
            });
        }
    }

    function kickUserFromTeam(userId, teamId) {
        const confirmation = window.confirm("Are you sure you want to kick this person?");
        if (confirmation) {
            const dbRef = ref(getDatabase());
            const memberRef = child(dbRef, `teams/${teamId}/members/${userId}`);

            remove(memberRef).then(() => {
                alert("Successfully kicked member!");
            }).catch((error) => {
                console.error("An error occurred:", error);
            });
        }
    }


    function getTeamCode(idOfTeam) {
        const dbRef = ref(getDatabase());
        const memberRef = child(dbRef, `teams/${idOfTeam}`);

        get(memberRef).then((snapshot) => {
            const teamData = snapshot.val(); 
            if (teamData) {
                const joinCode = teamData.joinCode; 
                setUserTeam(teamData)
                console.log("Join code:", joinCode);
            } else {
                console.error("Team not found");
            }
        }).catch((error) => {
            console.error("An error occurred:", error);
        });
    }
    
    getTeamCode(idOfTeam)

    if (!userTeam) {
        return <div style={{ textAlign: "center", fontSize: "5rem" }}>Loading</div>;
    }


    if (!teamTasks) {
        return <div style={{ textAlign: "center", fontSize: "5rem" }}>Loading</div>;
    }


    return (

        <div className="Dashboard">

            <div className="DashboardSidebar">
                <DashboardSidebar />

            </div>

            <div className="DashboardTopbar">
                <DashboardTopbar />
            </div>

            <div className="DashboardFeat">


                <div style={{ display: "flex", flexDirection: "row" }}>

                    <div style={{ paddingLeft: "10px" }}>
                        <h1 style={{ margin: "0px", color: "white", fontSize: "4rem" }}>Manage Team</h1>
                        <h1 style={{ margin: "0px", color: "white", fontSize: "1rem", paddingLeft: "10px" }}> Manage your tasks for your team!</h1>
                        <div style={{ backgroundColor: "white", width: "500px", height: "2px", marginTop: "10px", marginLeft: "5px" }}></div>
                    </div>

                    <div style={{ border: "solid", borderColor: "white", borderRadius: "250px", width: "200px", height: "200px", marginTop: "0px", marginLeft: "50px" }}></div>
                    <h1 style={{ marginLeft: "50px", color:"white" }}>Join Code: {userTeam.joinCode} </h1>


                </div>

                <h1 style={{ margin: "0px", marginTop: "-50px", fontSize: "4rem", color: "white" }}>Tasks</h1>
                <div style={{ backgroundColor: "white", width: "500px", height: "2px", marginTop: "10px", marginLeft: "5px" }}></div>

                <div className="taskList" style={{ marginTop: "0px", marginLeft: "50px", }}>



                    <div className="taskListHeaders" style={{ display: "flex", margin: "0px" }}>
                        <h1 style={{ color: "white" }}> Task List </h1>
                        <h1 style={{ marginLeft: "450px", color: "white" }}> Priority </h1>
                        <h1 style={{ marginLeft: "60px", color: "white" }}> Deadline </h1>
                    </div>




                    <div style={{ display: "flex", }}>
                        <div className="taskListContainer" style={{ width: "1100px", height: "450px", border: "solid", borderRadius: "10px", borderWidth: "5px", marginRight: "0px", overflowY: "auto", margin: "0" }}>
                            <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px" }}>
                                {Object.entries(teamTasks).map(([taskId, taskData]) => {

                                    if (taskData.uid && taskData.uid !== auth.currentUser.uid) {
                                        return null;
                                    }
                                    const taskName = taskId;
                                    return (
                                        <div key={taskId}>
                                            <TaskListItemTeam
                                                title={taskData.title}
                                                deadline={taskData.deadline}
                                                status={taskData.status}
                                                priority={taskData.priority}
                                                idOfTask={taskName}
                                                teamId={idOfTeam}
                                            />
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "5px", marginLeft: "865px" }}>
                    <button
                        style={{ width: "140px", height: "50px", fontSize: "1.5rem", background: "linear-gradient(180deg, #4B91F7 0%, #367AF6 100%)" }}
                        onClick={() => { window.open(`/teamtaskcreate?id=${idOfTeam}`, '_self'); }}>
                        Create Task
                    </button>
                    <button
                        style={{ marginLeft: "10px", marginRight: "auto", width: "auto", height: "50px", fontSize: "1.5rem", background: "linear-gradient(180deg, #FF0000 0%, #FF0000 100%)" }}
                        onClick={() => { leaveTeam(idOfTeam) }}>
                        Leave Team
                    </button>

                </div>
                <div style={{ margin: "0px" }}>
                    <h1 style={{ fontSize: "3rem", margin: "0px" }}>Members</h1>
                    <div style={{ backgroundColor: "white", width: "500px", height: "2px", marginTop: "10px", marginLeft: "5px" }}></div>

                    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', backgroundColor: "transparent", height: "200px", width: "1500px" }}>

                        {teamMembers && Object.keys(teamMembers).map(teamId => {
                            const team = teamMembers[teamId];
                            const members = team.members || {};

                            const currentUserType = teamMembers[auth.currentUser.uid].type
                            console.log(currentUserType)

                            const teamFound = Object.keys(userList).includes(teamId);
                            const userFound = Object.keys(userList).some(userId => userList[userId] === teamId);
                            const isMember = Object.keys(members).includes(auth.currentUser.uid);

                            if (teamFound || userFound) {
                                if (teamMembers[teamId].type === "admin") {
                                    return (
                                        <div key={teamId} style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginRight: '20px',
                                            height: "150px",
                                            width: "150px",
                                            border: "solid",
                                            borderRadius: "50%", textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: "10px"
                                        }}>
                                            <h1 style={{ fontSize: "12px", margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "1.5rem" }}>{userList[teamId].username}</h1>
                                            <h1 style={{ fontSize: ".8rem" }}>ADMIN</h1>
                                        </div>
                                    );
                                } else {
                                    if (teamMembers[teamId].type === "member" && auth.currentUser.uid !== teamId && currentUserType === "admin") {
                                        return (
                                            <div key={teamId} style={{ display: "flex", flexDirection: "column", marginRight: '20px', height: "150px", width: "150px", border: "solid", borderRadius: "50%", textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                                                <h1 style={{ fontSize: "12px", margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "1.5rem" }}>{userList[teamId].username}</h1>
                                                <button style={{ backgroundColor: "red" }} onClick={() => { kickUserFromTeam(teamId, idOfTeam); window.location.reload(); }}>KICK</button>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={teamId} style={{ display: "flex", flexDirection: "column", marginRight: '20px', height: "150px", width: "150px", border: "solid", borderRadius: "50%", textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                                                <h1 style={{ fontSize: "12px", margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "1.5rem" }}>{userList[teamId].username}</h1>
                                            </div>
                                        );
                                    }
                                }
                            }

                            return null;
                        })}


                    </div>


                </div>





            </div >
        </div>


    );
}