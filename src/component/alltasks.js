import TaskListItem from "./tasklistitem";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import Alerts from "./alerts";



export default function AllTasks() {


    const [userData, setUserData] = useState(null);

    let completeCount = 0;
    let inprogressCount = 0;
    let notStartedCount = 0;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(getDatabase());
                get(child(dbRef, `tasks/`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    } else {
                        console.log("No data available");
                        setUserData([]); // Set empty array if no data is available
                    }
                }).catch((error) => {
                    console.error(error);
                    setUserData([]); // Set empty array on error
                });
            } else {
                console.log("No user signed in");
                setUserData([]); // Set empty array if no user is signed in
            }
        });

        return () => unsubscribe();
    }, []);


    if (!userData) {
        return <div style={{ textAlign: "center", fontSize: "5rem" }}>Loading</div>;
    }


    return (




        <div className="DashboardFeat">



            <div style={{ paddingLeft: "10px" }}>
                <h1 style={{ margin: "0px", color: "white", fontSize: "4rem" }}>Task Overview</h1>
                <h1 style={{ margin: "0px", color: "white", fontSize: "1rem", paddingLeft: "10px" }}> Track the progress of your tasks at a glance.</h1>
            </div>



            <div className="Dashboard Grid" style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}>
                <div className="rectangle" style={{ width: "350px", height: "130px", backgroundColor: "lightgreen", marginRight: "30px", border: "solid", borderRadius: "20px" }}>


                    {Object.entries(userData).map(([taskId, taskData]) => {
                        if (taskData.uid && taskData.uid !== auth.currentUser.uid) {
                            return null; // Skip rendering this task
                        }
                        // Increment respective counters based on task status
                        switch (taskData.status) {
                            case 'complete':
                                completeCount++;
                                break;
                            case 'in_progress':
                                inprogressCount++;
                                break;
                            case 'not_started':
                                notStartedCount++;
                                break;
                            default:
                                break;
                        }
                    })}

                    <h1 style={{ margin: "0px", marginLeft: "140px", marginTop: "30px", fontSize: "1.5rem", color: "white" }}> Total Tasks</h1>
                    <h1 style={{ margin: "0px", marginLeft: "140px", fontSize: "1.5rem", color: "white" }}> {completeCount + inprogressCount + notStartedCount}</h1>


                </div>

                <div className="rectangle" style={{ width: "350px", height: "130px", backgroundColor: "lightgreen", marginRight: "30px", border: "solid", borderRadius: "20px" }}>
                    <h1 style={{ margin: "0px", marginLeft: "140px", marginTop: "30px", fontSize: "1.5rem", color: "white" }}> Pending Tasks</h1>
                    <h1 style={{ margin: "0px", marginLeft: "140px", fontSize: "1.5rem", color: "white" }}> {inprogressCount + notStartedCount} </h1>


                </div>

                <div className="rectangle" style={{ width: "350px", height: "130px", backgroundColor: "lightgreen", marginRight: "30px", border: "solid", borderRadius: "20px" }}>
                    <h1 style={{ margin: "0px", marginLeft: "140px", marginTop: "30px", color: "white", fontSize: "1.5rem" }}> Total Complete</h1>
                    <h1 style={{ margin: "0px", marginLeft: "140px", fontSize: "1.5rem", color: "white" }}> {completeCount}</h1>

                </div>


            </div>

            <div className="taskList" style={{ marginTop: "0px", marginLeft: "25px" }}>

                <div className="taskListHeaders" style={{ display: "flex" }}>
                    <h1 style={{ color: "white" }}> Task List </h1>
                    <h1 style={{ marginLeft: "415px", color: "white" }}> Priority </h1>
                </div>

                <div style={{ display: "flex" }}>
                    <div className="taskListContainer" style={{ width: "1000px", height: "450px", border: "solid", borderRadius:"10px", borderWidth:"5px", marginRight: "0px", overflowY: "auto", margin: "0" }}>

                        <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px" }}>
                            <li style={{}}>


                                {Object.entries(userData).map(([taskId, taskData]) => {

                                    if (taskData.uid && taskData.uid !== auth.currentUser.uid) {
                                        return null;
                                    }
                                    const taskName = taskId;
                                    return (
                                        <div key={taskId}>
                                            <TaskListItem
                                                title={taskData.title}
                                                deadline={taskData.deadline}
                                                status={taskData.status}
                                                priority={taskData.priority}
                                                idOfTask={taskName}
                                            />
                                        </div>
                                    );
                                })}


                            </li>


                        </ul>

                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                        <div style={{ width: "700px", height: "350px", border: "solid", borderColor: "orange", borderRadius: "10px", marginRight: "25px" }}>

                            <div style={{ marginLeft: "10px", paddingTop: "10px" }}>
                                <h1 style={{ margin: "0px", color: "white" }}>Priority</h1>
                            </div>

                            <div className="FilterPriority" style={{ display: "flex", flexDirection: "row", paddingTop: "5px", marginLeft: "10px" }}>
                                <div className='Priority1'>
                                    <label htmlFor="priority1" style={{ fontSize: "1.5rem", marginRight: "5px", color: "white" }}>1</label>
                                    <input type='radio' id="priority1" name="priority" style={{ height: "20px", width: "20px" }} onChange={(event) => {
                                    }} />
                                </div>

                                <div className='Priority2' style={{ marginLeft: "10px" }}>
                                    <label htmlFor="priority2" style={{ fontSize: "1.5rem", marginRight: "5px", color: "white" }}>2</label>
                                    <input type='radio' id="priority2" name="priority" style={{ height: "20px", width: "20px" }} onChange={(event) => {
                                    }} />

                                </div>
                                <div className='Priority3' style={{ marginLeft: "10px" }}>
                                    <label htmlFor="priority3" style={{ fontSize: "1.5rem", marginRight: "5px", color: "white" }}>3</label>
                                    <input type='radio' id="priority3" name="priority" style={{ height: "20px", width: "20px" }} onChange={(event) => {
                                    }} />
                                </div>
                            </div>

                            <div className="FilterDueDate">
                                <h1 style={{ margin: "0px", marginLeft: "10px", paddingTop: "10px", color: "white" }}> Due Date </h1>
                                <input style={{ margin: "0px", marginTop: "5px", marginLeft: "10px", width: "400px", height: "35px", textAlign: "center" }}
                                    type="date"
                                    className="form-control"
                                    name="deadline"
                                    id="deadline"
                                    min={new Date().toISOString().split("T")[0]}
                                />

                            </div>

                            <div style={{ marginLeft: "10px", paddingTop: "10px" }}>
                                <h1 style={{ margin: "0px", color: "white" }}>Priority</h1>
                            </div>

                            <div className="FilterStatus" style={{ display: "flex", flexDirection: "row", marginTop: "5px", marginLeft: "10px" }}>

                                <div className='Priority1'>
                                    <label htmlFor="priority1" style={{ fontSize: "1.5rem", marginRight: "5px", color: "white" }}>Not Started</label>
                                    <input type='radio' id="priority1" name="priority" style={{ height: "20px", width: "20px" }} onChange={(event) => {
                                    }} />
                                </div>

                                <div className='Priority2' style={{ marginLeft: "10px" }}>
                                    <label htmlFor="priority2" style={{ fontSize: "1.5rem", marginRight: "5px", color: "white" }}>In Progress</label>
                                    <input type='radio' id="priority2" name="priority" style={{ height: "20px", width: "20px" }} onChange={(event) => {
                                    }} />

                                </div>
                                <div className='Priority3' style={{ marginLeft: "10px" }}>
                                    <label htmlFor="priority3" style={{ fontSize: "1.5rem", marginRight: "5px", color: "white" }}>Completed</label>
                                    <input type='radio' id="priority3" name="priority" style={{ height: "20px", width: "20px" }} onChange={(event) => {
                                    }} />
                                </div>
                            </div>

                            <div className="FilterTags" style={{}}>
                                <h1 style={{ margin: "0px", marginTop: "10px", marginLeft: "10px", color: "white" }} htmlFor="exampleInputTags" className="form-label">Tags</h1>
                                <input
                                    style={{ marginLeft: "10px", height: "25px", width: "500px", marginTop: "5px" }}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputTags"
                                    placeholder="Enter tags separated by commas"
                                    name="tags"

                                />
                            </div>

                        </div>
                        <button style={{ height: "50px", width: "150px", marginTop: "10px", borderRadius: "10px", marginLeft: "280px", fontSize: "1.7rem" }}>Filter Tasks</button>
                    </div>
                </div>


            </div>

            <div style={{ textAlign: "center", marginRight: "800px", marginTop: "25px" }}>



                <div>
                    <button
                        style={{ width: "140px", height: "50px", fontSize: "1.5rem", background: "linear-gradient(180deg, #4B91F7 0%, #367AF6 100%)" }}
                        onClick={() => { window.open(`/taskcreate`, '_self'); }}>
                        Create Task
                    </button>
                </div>


            </div>





        </div >
    );
}