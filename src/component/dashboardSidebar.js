import AuthDetails from "./AuthDetails";
export default function DashboardSidebar() {
  return (


    <div className="DashboardSide" style={{

      borderTop: "0px",
      borderLeft: "0px"
    }}>

      <ul style={{ marginTop: "20px" }}>
        <li style={{ fontSize: "2rem", color: "white" }}>
          <div className="sidebarList">
            <button style={{ fontSize: "1.8rem", backgroundColor: "transparent", border: "none" }} onClick={() => { window.open(`/dashboard`, '_self'); }}>Task Overview</button>
          </div>
        </li>

        <li style={{ fontSize: "2rem", color: "white" }}>
          <div className="sidebarList">
            <button style={{ fontSize: "1.8rem", backgroundColor: "transparent", border: "none" }} onClick={() => { window.open(`/all`, '_self'); }}>Task List</button>
          </div>
        </li>

        <li style={{ fontSize: "2rem", color: "white" }}>
          <div className="sidebarList">
            <button style={{ fontSize: "1.8rem", backgroundColor: "transparent", border: "none" }}>Calender View</button>
          </div>
        </li>

        <li style={{ fontSize: "2rem", color: "white" }}>
          <div className="sidebarList">
            <button style={{ fontSize: "1.8rem", backgroundColor: "transparent", border: "none" }}onClick={() => { window.open(`/dashboard`, '_self'); }}>Upcoming Deadline</button>
          </div>
        </li>

        <li style={{ fontSize: "2rem", color: "white" }}>
          <div className="sidebarList">
            <button style={{ fontSize: "1.8rem", backgroundColor: "transparent", border: "none" }}>User/Productivity Report</button>
          </div>
        </li>

        <li style={{ fontSize: "2rem", color: "white" }}>
          <div className="sidebarList">
            <button style={{ fontSize: "1.8rem", backgroundColor: "transparent", border: "none" }} onClick={() => { window.open(`/teams`, '_self'); }}>Teams</button>
          </div>
        </li>

      </ul>
      <div style={{marginTop:"0px"}}>
        <AuthDetails />
      </div>
    </div>

  );
}