export default function Alerts(task) {

    const isDeadlineClose = () => {

        if (task && task.deadline) {
            const [year, month, day] = task.deadline.split("-");
            const deadlineDate = new Date(year, month - 1, day);
            const timeDifference = deadlineDate - new Date();

            return timeDifference < 24 * 60 * 60 * 1000;
        }
        return false;
    };

    return (
        <div className="Alerts" style={{}}>
            {isDeadlineClose() && (
                <div className="alert"
                    style={{
                        borderColor: "red",
                        border: "solid",
                        color: "black",
                        padding: "10px",
                        marginTop: "5px",
                        width: "600px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center", // Align items vertically in the center
                        justifyContent: "space-between" // Space out items evenly along the main axis
                    }}>
                    <div>
                        <pre style={{ margin: "0px", fontSize: "1rem" }}>
                            DEADLINE IS APPROACHING!!
                        </pre>
                        <pre style={{ margin: "0px", fontSize: "1rem" }}>
                            Due on: {task.deadline}
                        </pre>
                        <pre style={{ margin: "0px", fontSize: "1rem" }}>
                            Task: {task.title}
                        </pre>
                    </div>

                    <div>
                        <button style={{ height: "25px" }}> View </button>
                    </div>
                </div>

            )}
        </div>
    );
}
