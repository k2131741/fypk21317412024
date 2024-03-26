import { useState } from "react";
export default function TeamsItem(recievedData) {
    const [data, setData] = useState(recievedData || "");

    return (
        <div style={{ marginLeft: "5px", marginRight: "20px", width: "200px", height: "200px", backgroundColor: "black", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
                onClick={() => { window.open(`/teamtasks?id=${recievedData.idOfTeam}`, '_self') }}
                style={{ color: "white", margin: "0", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "transparent" }}>{recievedData.title}</button>
        </div>
    )
}
