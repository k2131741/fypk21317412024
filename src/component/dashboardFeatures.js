import TaskListItem from "./tasklistitem";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import Alerts from "./alerts";
import allIcon from "../images/all.png"
import pendingIcon from "../images/clock.png"
import taskDoneIcon from "../images/checked.png"
import userProfileIcon from "../images/profile.png"



export default function DashboardFeatures() {


  const [userData, setUserData] = useState(null);

  let completeCount = 0;
  let inprogressCount = 0;
  let totalCount = 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `tasks/`)).then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("No data available");
            setUserData([]);
          }
        }).catch((error) => {
          console.error(error);
          setUserData([]); 
        });
      } else {
        console.log("No user signed in");
        setUserData([]); 
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
        <div style={{ display: "flex", marginRight: "10px" }}>

          <div className="rectangle" style={{ width: "350px", height: "130px", backgroundColor: "lightgreen", border: "solid", borderRadius: "20px", display: "flex", alignItems: "center", padding: "10px" }}>


            {Object.entries(userData).map(([taskId, taskData]) => {
              if (taskData.assigned_user && taskData.assigned_user !== auth.currentUser.uid) {
                return null;
              }
              switch (taskData.status) {
                case 'complete':
                  completeCount++;
                  break;
                case 'in_progress':
                  inprogressCount++;
                  break;
                case 'not_started':
                  totalCount++;
                  break;
                default:
                  break;
              }
            })}
            <img src={allIcon} style={{ width: "80px", height: "80px", marginRight: "20px" }} alt="Pending Icon" />

            <div>
              <h1 style={{ margin: "0px", fontSize: "1.8rem", color: "white" }}> Total Tasks</h1>
              <h1 style={{ margin: "0px", fontSize: "2rem", color: "white" }}> {completeCount + inprogressCount + totalCount}</h1>
            </div>
          </div>

          <div className="rectangle" style={{ width: "350px", height: "130px", backgroundColor: "lightgreen", border: "solid", borderRadius: "20px", display: "flex", alignItems: "center", padding: "10px" }}>
            <img src={pendingIcon} style={{ width: "80px", height: "80px", marginRight: "20px" }} alt="Pending Icon" />
            <div>
              <h1 style={{ margin: "0px", fontSize: "1.8rem", color: "white" }}>Pending Tasks</h1>
              <h1 style={{ margin: "0px", fontSize: "2rem", color: "white" }}>{inprogressCount + totalCount}</h1>
            </div>
          </div>

          <div className="rectangle" style={{ width: "350px", height: "130px", backgroundColor: "lightgreen", border: "solid", borderRadius: "20px", display: "flex", alignItems: "center", padding: "10px" }}>
            <img src={taskDoneIcon} style={{ width: "80px", height: "80px", marginRight: "20px" }} alt="Task Done Icon" />
            <div>
              <h1 style={{ margin: "0px", fontSize: "1.8rem", color: "white" }}>Total Complete</h1>
              <h1 style={{ margin: "0px", fontSize: "2rem", color: "white" }}>{completeCount}</h1>
            </div>
          </div>
        </div>



      </div>

      <div className="taskList" style={{ marginTop: "0px", marginLeft: "25px" }}>

        <div className="taskListHeaders" style={{ display: "flex" }}>
          <h1 style={{ marginLeft: "500px", margin: "0px", marginTop: "10px", color: "white" }}> Task List </h1>
          <h1 style={{ margin: "0px", marginLeft: "530px", marginTop: "10px", color: "white" }}> Priority </h1>
          <button style={{ marginLeft: "250px", marginTop: "10px", fontSize: "1.2rem", height: "35px", width: "100px", border: "solid", borderColor: "black", borderRadius: "10px", backgroundColor: "lightgreen" }} onClick={() => { window.open(`/all`, '_self'); }}> View All </button>
        </div>

        <div style={{ display: "flex" }}>
          <div className="taskListContainer" style={{
            width: "1000px",
            height: "175px",
            border: "solid",
            borderRadius: "10px",
            borderWidth: "5px",
            marginTop: "5px",
            marginRight: "0px",
            overflowY: "auto",
            margin: "0"
          }}>

            <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "10px" }}>
              <li style={{}}>


                {Object.entries(userData).map(([taskId, taskData]) => {

                  if (taskData.assigned_user && taskData.assigned_user !== auth.currentUser.uid) {
                    return null;
                  }
                  const taskName = taskId;
                  console.log(taskData.assigned_user)
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

          <div style={{ display: "flex", flexDirection: "column", marginLeft: "200px" }}>
            <h1 style={{ margin: "0px", fontSize: "1.5rem", color: "white" }}>
              QUICK ACTIONS
            </h1>
            <button
              onClick={() => {
                window.open(`/taskcreate`, '_self');
              }}
              style={{
                height: "50px",
                marginTop: "10px",
                borderRadius: "10px",
                backgroundColor: "lightgreen",
                border: "solid",
                borderColor: "black",
                fontSize: "2rem"
              }}>
              Create Tasks
            </button>
            <button style={{
              height: "50px",
              marginTop: "10px",
              borderRadius: "10px",
              backgroundColor: "lightgreen", border: "solid", borderColor: "black", fontSize: "2rem"
            }}>Filter Tasks</button>
          </div>
        </div>




      </div>

      <div className="bottomOfDashboard">

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="AlertLeft" style={{ marginLeft: "25px" }}>
            <h1 style={{ margin: "10px 0px 0px", marginTop: "10px", color: "white" }}>Alerts</h1>
            <div style={{ backgroundColor: "orange", height: "341px", width: "710px", border: "solid", borderRadius: "10px" }}>

              <ul style={{ listStyleType: "none", padding: "0px", marginLeft: "5px", maxHeight: "320px", overflowY: "auto" }}>
                <li>               
                  {Object.entries(userData).map(([taskId, taskData]) => {

                    if (taskData.assigned_user && taskData.assigned_user !== auth.currentUser.uid) {
                      return null; 
                    }
                    const taskName = taskId;
                    return (
                      <div key={taskId}>
                        <Alerts
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
          </div>
          <div className="AlertRight" style={{ marginLeft: "100px" }}>
            <h1 style={{ margin: "0px", marginTop: "10px", color: "white" }}>Calender</h1>
            <div style={{ border: "solid", borderColor: "orange", height: "321px", width: "700px", border: "solid", borderRadius: "10px" }}> </div>
          </div>

        </div>



      </div>

    </div >
  );
}