import userProfile from "../images/profile.png"


export default function DashboardTopbar() {
  return (
    <div className="DashboardTop" style={{ marginLeft: "25px", display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px" }}>
      <div style={{ border: "solid", borderRadius: "100px", width: "50px", height: "50px", marginRight: "10px", overflow: "hidden" }} >
        <img src={userProfile} onClick={() => window.open("/profile", "_self")} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="User Profile" />
        <button
          style={{ width: "100%", height: "100%", backgroundColor: "transparent", border: "none", padding: 0 }}
          type="button"
          onClick={() => window.open("/profile", "_self")}
        ></button>
      </div>
      <h1 style={{ color: "white", margin: 0 }}>Dashboard</h1>
    </div>

  );
}