"use client";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { child, get, ref, set } from "firebase/database";
import { auth, db } from "../../firebase";
import { Auth } from 'firebase/auth';


export default function CreateTask() {

    const [usersList, setUsersList] = useState([]);

    const [formData, setFormData] = useState({
        title: null,
        description: null,
        priority: null,
        deadline: null,
        tags: null,
        notes: null,    
        status: null,
        assigned_user: null,
    });


    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxTick = (event) => {
        setIsChecked(event.target.value);
    };

    const getUserList = () => {
        get(child(ref(db), `users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
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
    useEffect(() => {
        getUserList();
    }, []);

    const handleChange = (e) => {
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

        const taskId = uuidv4();
        set(ref(db, 'tasks/' + taskId), formData)
            .then(() => {
                alert("Task has been created");
            })
            .catch((error) => {
                console.error("Error creating task: ", error);
            });
    }
    return (

        <div style={{}}>
            <div style={{ color: "white", borderBottom: "4px solid", borderRadius: "1px", margin: "auto", display: "inline-block" }}>
                <h1 style={{ margin: "0px", textAlign: "center" }}>Task Creator</h1>
                <h2 style={{ margin: "0px", textAlign: "center" }}>Create your task!</h2>
            </div>




            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column", marginTop: "20px" }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputTitle1" className="form-label" >
                    </label>
                    <input
                        type="text"
                        style={{ marginBottom: "10px", width: "557px" }}
                        className="form-control"
                        id="exampleInputTitle1"
                        placeholder="Text Title"
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
                                }} />
                            </div>


                            <div className='Priority2' style={{ paddingLeft: '5px' }}>
                                <label htmlFor="priority2">2</label>
                                <input type='radio' id="priority2" name="priority" onChange={(event) => {
                                    handleCheckboxTick(event);
                                    handleChange(event);
                                }} />
                            </div>
                            <div className='Priority3' style={{ paddingLeft: '10px' }}>
                                <label htmlFor="priority3">3</label>
                                <input type='radio' id="priority3" name="priority" onChange={(event) => {
                                    handleCheckboxTick(event);
                                    handleChange(event);
                                }} />
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


                    <div>
                        <div>
                            <textarea
                                className="form-control"
                                id="notes"
                                rows={3}
                                name="notes"
                                placeholder="Enter notes here"
                                onChange={handleChange}
                                style={{
                                    marginTop: "10px",
                                    marginLeft: "100px",
                                    height: "200px",
                                    width: "400px",

                                }}
                            ></textarea>
                        </div>
                    </div>

                </div>

                <div style={{ marginTop: "0px" }}>
                    <button type="button" className="btn btn-success" style={{ marginRight: "10px" }} onClick={() => window.open('/dashboard', '_self')}>
                        Back
                    </button>
                    <button type="submit" className="btn btn-success" style={{}}>
                        Create New Task
                    </button>

                </div>
            </form>




        </div>
    )
}