import DashboardSidebar from "../component/dashboardSidebar";
import DashboardFeatures from "../component/dashboardFeatures";
import DashboardTopbar from "../component/dashboardTopbar";
import TeamTaskViewer from "../component/tasks/teamtaskviewer";
export default function ViewTaskTeam() {
    return (
        <div className="Createtask">
            <div className="ctasksidebar">
                <DashboardSidebar />
            </div>

            <div className="ctasktopbar">
                <div className="DashboardTop" style={{ marginLeft: "0px", display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px" }}>
                    <div style={{ border: "solid", borderRadius: "100px", width: "50px", height: "50px", marginRight: "10px", overflow: "hidden" }} >
                        <button
                            style={{ width: "100%", height: "100%", backgroundColor: "transparent", border: "none", padding: 0 }}
                            type="button"
                            onClick={() => window.open("/profile", "_self")}
                        ></button>
                    </div>
                    <h1 style={{ color: "white", margin: 0 }}>Task Creator</h1>
                </div>            </div>

            <div className="ctaskmain">
                <TeamTaskViewer />
            </div>

        </div>
    );
}