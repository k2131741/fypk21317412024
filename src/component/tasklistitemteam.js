import { auth } from "../firebase";
import { useState } from "react";
import taskIcon from "../images/taskIcon.png"


export default function TaskListItemTeam(recievedData) {
    const [data, setData] = useState(recievedData || "");
    console.log(recievedData)
    return (
        <div className="taskList" style={{ display: "flex", flexWrap: "wrap", fontSize: ".8rem", color: "white" }}>
            
            <div style={{ marginRight: "10px", marginBottom: "10px",  }}>
                <img src={taskIcon} style={{height:"70px", width:"70px"}}></img>
            </div>

            <div style={{ marginRight: "150px", marginBottom: "10px" }}>
                <h1 className="data" id="data" style={{ margin: "0px" }}>{data.title}</h1>
                <h1 className="taskDeadline" id="taskDeadline" style={{ margin: "0px" }}>{data.deadline}</h1>
            </div>

            <div style={{ marginRight: "auto", marginBottom: "10px" }}>
                <h1>{data.status}</h1>
            </div>

            <div style={{ marginRight: "auto", marginBottom: "10px" }}>
                <h1>{data.priority}</h1>
            </div>

            <div style={{ marginRight: "auto", marginBottom: "10px" }}>
                <h1>{data.deadline}</h1>
            </div>

            <div style={{ marginRight: "10px", marginBottom: "10px" }}>
                <button
                    onClick={() => { console.log(data.idOfTask); window.open(`/teamtaskview?taskId=${data.idOfTask}&teamId=${data.teamId}`, '_self'); }}
                    style={{ height: "70px", width: "80px", border: "solid", borderColor: "black", borderRadius: "10px" }}>
                    EDIT
                </button>
            </div>
        </div>
    );
}