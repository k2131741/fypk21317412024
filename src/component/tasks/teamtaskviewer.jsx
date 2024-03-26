"use client";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { child, get, ref, update, remove } from "firebase/database";
import { auth, db } from "../../firebase";
import { Auth } from 'firebase/auth';

export default function TeamTaskViewer() {
    const [usersList, setUsersList] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '',
        deadline: '',
        notes: '',
        tags: null,
        status: '',
        assigned_user: '',
    });
    const [isChecked, setIsChecked] = useState(false);
    const [idOfTask, setIdOfTask] = useState('')
    const [idOfTeam, setIdOfTeam] = useState('')
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const idOfTask = urlParams.get('id');

            const taskId = urlParams.get('taskId');
            setIdOfTask(taskId)
            const teamId = urlParams.get('teamId');
            setIdOfTeam(teamId)
            console.log("Task ID:", taskId);
            console.log("Team ID:", teamId);

            const getTaskData = async (taskId) => {
                try {
                    if (!taskId) {
                        console.log('Task ID is missing or invalid');
                        return null;
                    }

                    const taskRef = ref(db, `teams/${teamId}/tasks/${taskId}`);
                    const snapshot = await get(taskRef);

                    if (snapshot.exists()) {
                        const taskData = snapshot.val();
                        console.log('Task data:', taskData);
                        return taskData;
                    } else {
                        console.log('No such task exists');
                        return null;
                    }
                } catch (error) {
                    console.error('Error getting task data:', error);
                    return null;
                }
            };

            const data = await getTaskData(taskId);
            setTaskData(data);
            getUserList();
        };

        fetchData();
    }, []);

    const getUserList = () => {
        get(child(ref(db), `users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUsersList(Object.values(data));
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteTask = () => {

        const urlParams = new URLSearchParams(window.location.search);

        const taskId = urlParams.get('taskId');
        const teamId = urlParams.get('teamId');


        if (!taskId) {
            console.log('Task ID is missing or invalid');
            return;
        }

        const taskRef = ref(db, `teams/${teamId}/tasks/${taskId}`);

        remove(taskRef)
            .then(() => {
                console.log("Task deleted successfully");
                alert("Task deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

    const handleCheckboxTick = (event) => {
        setIsChecked(event.target.value);
    };

    const handleChange = (e) => {
        console.log(auth.currentUser.uid);
        if (e.target.name === 'priority') {
            console.log(parseInt(e.target.id.substring(8)))
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.id.substring(8)) });
            console.log(formData)
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            console.log(formData)
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('taskId');
        const teamId = urlParams.get('teamId');
        update(ref(db, `teams/${teamId}/tasks/${taskId}`), formData).then(() => {
            alert("Task has been updated!");
        })
            .catch((error) => {
                console.error("Error updating task: ", error);
            });
    };


    useEffect(() => {
        if (taskData) {
            setFormData({
                title: taskData.title || '',
                description: taskData.description || '',
                priority: taskData.priority || '',
                deadline: taskData.deadline || '',
                notes: taskData.notes || '',
                tags: null,
                status: taskData.status || '',
                assigned_user: taskData.assigned_user || '',
            });
        }
    }, [taskData]);

    if (!taskData) {
        return <div>Loading...</div>;
    }
    return (

        <div style={{}}>
            <div style={{ color: "white", borderBottom: "4px solid", borderRadius: "1px", margin: "auto", display: "inline-block" }}>
                <h1 style={{ margin: "0px", textAlign: "center" }}>Task Viewer</h1>
                <h2 style={{ margin: "0px", textAlign: "center" }}>Create your task!</h2>
            </div>




            <form onSubmit={handleSubmit} style={{ display: 'flexflex', flexDirection: "column", marginTop: "20px", }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputTitle1" className="form-label" >

                    </label>
                    <input
                        type="text"
                        style={{ marginBottom: "10px", width: "557px" }}
                        className="form-control"
                        id="exampleInputTitle1"
                        placeholder={taskData.title}
                        defaultValue={taskData.title}
                        name="title"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">

                    </label>
                    <textarea
                        className="form-control"
                        id="exampleInputDescription1"
                        rows={6}
                        style={{ height: '100px', width: '40%' }}
                        placeholder="Edit your task description here"
                        defaultValue={taskData.description}
                        name="description"
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className='noteboxSeperator' style={{ display: 'flex', flexDirection: "row" }}>


                    <div className="d-flex" style={{ marginTop: "2px" }}>

                        <div>
                            <label htmlFor="" style={{ paddingTop: "5px", color: "white" }}> Priority </label>
                        </div>

                        <div className='prioirtyCheckboxCreate' style={{ display: 'flex', flexDirection: 'row', }}>


                            <div className='Priority1'>
                                <label htmlFor="priority1">1</label>
                                <input type='radio' id="priority1" name="priority" onChange={(event) => {
                                    handleCheckboxTick(event);
                                    handleChange(event);
                                }}
                                    checked={taskData && taskData.priority === 1}
                                />
                            </div>


                            <div className='Priority2' style={{ paddingLeft: '5px' }}>

                                <label htmlFor="priority2">2</label>
                                <input type='radio' id="priority2" name="priority" onChange={(event) => {
                                    handleCheckboxTick(event);
                                    handleChange(event);
                                }}
                                    checked={taskData && taskData.priority === 2}
                                />

                            </div>

                            <div className='Priority3' style={{ paddingLeft: '10px' }}>
                                <label htmlFor="priority3">3</label>
                                <input type='radio' id="priority3" name="priority" onChange={(event) => {
                                    handleCheckboxTick(event);
                                    handleChange(event);
                                }}
                                    checked={taskData && taskData.priority === 3}
                                />
                            </div>
                        </div>

                        <div className="mb-3 col-3 me-3" style={{ display: "flex", flexDirection: 'column', marginTop: "2px" }}>
                            <label htmlFor="deadline" className="form-label" style={{ paddingTop: "0px", color: "white" }}>
                                Deadline
                            </label>
                            <input style={{ margin: "0px" }}
                                onChange={handleChange}
                                type="date"
                                className="form-control"
                                name="deadline"
                                defaultValue={taskData.deadline}
                                id="deadline"
                                min={new Date().toISOString().split("T")[0]}
                            />

                        </div>




                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="status" style={{ display: "flex", flexDirection: 'column', marginTop: "5px", color: "white" }} className="form-label">
                                Status
                            </label>
                            <select
                                name="status"
                                className="form-select"
                                aria-label="Default select example"
                                defaultValue={taskData.status}
                                onChange={handleChange}

                            >
                                <option>Select Status</option>
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>

                        <div className="mb-3 col-3 me-3" style={{ marginTop: "5px", color: "white", display: "flex", flexDirection: "column" }}>
                            <label htmlFor="assigned_user" className="form-label">
                                Assigned User
                            </label>
                            <select
                                name="assigned_user"
                                className="form-select"
                                aria-label="Default select example"
                                defaultValue={taskData.assigned_user || ''}
                                onChange={handleChange}

                            >
                                <option>Select User</option>
                                {usersList.map((item) => {

                                    if (item.id === auth.currentUser.uid) {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {`${item.username} (${item.email})`}
                                            </option>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </select>
                        </div>


                    </div>

                    <div className="createTaskNotBbox">


                    </div>

                    <textarea
                        className="form-control"
                        id="notes"
                        rows={3}
                        name="notes"
                        placeholder="Enter notes here"
                        defaultValue={taskData.notes}
                        onChange={handleChange}
                        style={{
                            marginTop: "10px",
                            marginLeft: "100px",
                            height: "200px",
                            width: "400px",

                        }}
                    ></textarea>


                </div>
                <div style={{ marginTop: "30px" }}>
                    <button type="button" className="btn btn-success" style={{ marginRight: "10px" }} onClick={() => window.open(`/teamtasks?id=${idOfTeam}`, "_self")}>
                        Back
                    </button>
                    <button type="submit" className="btn btn-success" style={{}}>
                        Update Task
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginLeft: "10px", backgroundColor: "red" }}
                        onClick={() => {
                            window.open(`/teamtasks?id=${idOfTeam}`, "_self");
                            alert("Task Deleted!")
                            deleteTask();
                        }}
                    >
                        Delete
                    </button>


                </div>
            </form>




        </div>
    )
}