import DashboardSidebar from "../component/dashboardSidebar";
import DashboardTopbar from "../component/dashboardTopbar";
import AllTasks from "../component/alltasks";

export default function ViewAllTask() {
    return (
        <div className="Dashboard">

            <div className="DashboardSidebar">
                <DashboardSidebar />

            </div>

            <div className="DashboardTop" style={{ marginLeft: "0px", display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px", marginLeft:"10px" }}>
                <div style={{ border: "solid", borderRadius: "100px", width: "50px", height: "50px", marginRight: "10px", overflow: "hidden" }} >
                    <button
                        style={{ width: "100%", height: "100%", backgroundColor: "transparent", border: "none", padding: 0 }}
                        type="button"
                        onClick={() => window.open("/profile", "_self")}
                    ></button>
                </div>
                <h1 style={{ color: "white", margin: 0 }}>Task Creator</h1>
            </div>

            <div className="DashboardFeatures">
                <AllTasks />
            </div>

        </div>
    );
}