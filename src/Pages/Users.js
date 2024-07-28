import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Users() {

    const navigate = useNavigate()

    const [userList, setUserlist] = useState()

    const usersList = async () => {
        const response = await fetch(`http://localhost:5000/api/users/list`, {
            methods: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        console.log(json)
        if (json.success) {
            setUserlist(json.data)
        } else {
            console.log("Failed fo fetch data")
        }
    }

    const handleEdit = (id) => {
        localStorage.setItem('userEditId',id)
        navigate("/userEdit")
    }

    const handleDelete = async (id) => {
        // console.log(id)

        const response = await fetch(`http://localhost:5000/api/users/delete/${id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if(json.success){
            toast.success(json.message)
            usersList()
        }else{
            toast.error(json.message)
        }
    }

    useEffect(() => {  
        if(localStorage.getItem('role')=='Vendor'){
            navigate("/")
        }
        usersList();
    }, [])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Admin Users List</h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(userList) ?
                                                    userList.map(user => (
                                                        <tr>
                                                            <td>{user.first_name} {user.last_name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone_number}</td>
                                                            <td>{user.role}</td>
                                                            {
                                                                user.status === "Active" ?
                                                                    <td><label className="badge badge-success">Active</label></td>
                                                                    :
                                                                    <td><label className="badge badge-danger">In-Active</label></td>
                                                            }
                                                            <td>
                                                                <button type="button" class="btn btn-inverse-success btn-icon" onClick={()=>handleEdit(user.user_id)}>
                                                                    <i class="mdi mdi-account-edit"></i>
                                                                </button>
                                                                &emsp;
                                                                {
                                                                    user.status == 'Active' && user.role != 'SuperAdmin' ?
                                                                    <button type="button" class="btn btn-inverse-danger btn-icon" onClick={()=>handleDelete(user.user_id)}>
                                                                        <i class="mdi mdi-delete"></i>
                                                                    </button>
                                                                    :
                                                                    <></>
                                                                }
                                                                
                                                            </td>

                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td>List not found.</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
