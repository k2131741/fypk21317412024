import { auth } from "../firebase";
import { useState } from "react";
import taskIcon from "../images/taskIcon.png"

export default function TaskListItem(recievedData) {
  const [data, setData] = useState(recievedData || "");
  return (
    <div className="taskList" style={{ display: "flex", flexWrap: "wrap", fontSize: ".8rem", color: "white" }}>

      <img src={taskIcon} style={{ height: "70px", width: "70px", marginBottom: "5px" }} alt="Task Icon" />

      <div style={{ flex: "1", marginBottom: "10px", display: "flex", flexDirection: "column" }}>
        <h1 className="data" id="data" style={{ margin: "0px" }}>{data.title}</h1>
        <h1 className="taskDeadline" id="taskDeadline" style={{ margin: "0px" }}>{data.deadline}</h1>
      </div>

      <div style={{ marginRight: "20px", marginBottom: "10px" }}>
        <h1>{data.status}</h1>
      </div>

      <div style={{ marginRight: "20px",marginLeft:"160px", marginBottom: "10px" }}>
        <h1>{data.priority}</h1>
      </div>

      <div style={{ marginRight: "40px", marginLeft:"125px", marginBottom: "10px" }}>
        <button
          onClick={() => { console.log(data.idOfTask); window.open(`/viewtask?id=${data.idOfTask}`, '_self'); }}
          style={{ height: "50px", width: "75px", border: "solid", borderColor: "black", borderRadius: "10px" }}>
          EDIT
        </button>
      </div>

    </div>

  );
}