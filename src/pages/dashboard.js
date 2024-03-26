import DashboardSidebar from "../component/dashboardSidebar";
import DashboardFeatures from "../component/dashboardFeatures";
import DashboardTopbar from "../component/dashboardTopbar";

export default function Dashboard() {
    return (
        <div className="Dashboard">

            <div className="DashboardSidebar">
                <DashboardSidebar />

            </div>

            <div className="DashboardTopbar">
                <DashboardTopbar />
            </div>

            <div className="DashboardFeatures">
                <DashboardFeatures />
            </div>

        </div>
    );
}