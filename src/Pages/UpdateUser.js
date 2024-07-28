import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateUser() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        status: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getUser = async () => {
        const userId = localStorage.getItem('userEditId');
        const response = await fetch(`http://localhost:5000/api/users/get/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (json.success) {
            setFormData(json.data);
        } else {
            console.log(json.message);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userEditId');
        const response = await fetch(`http://localhost:5000/api/users/update/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            localStorage.removeItem('userEditId');
            navigate("/users");
        } else {
            console.log("Failed to update");
            toast.error(json.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem('role')=='Vendor'){
            navigate("/")
        }
        getUser();
    }, []);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Edit User</h4>
                                    <p className="card-description">
                                        Edit admin user
                                    </p>
                                    <form className="forms-sample" onSubmit={updateUser}>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputUsername1">Username</label>
                                                <input type="text" className="form-control" name="username" id="exampleInputUsername1" placeholder="Username" value={formData.username} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" value={formData.password} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputFirstName1">First name</label>
                                                <input type="text" className="form-control" name="first_name" id="exampleInputFirstName1" placeholder="First name" value={formData.first_name} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputLastName1">Last Name</label>
                                                <input type="text" className="form-control" name="last_name" id="exampleInputLastName1" placeholder="Last name" value={formData.last_name} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email" value={formData.email} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPhoneNumber1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputPhoneNumber1" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputStatus1">Status</label>
                                                <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="In-Active">In-Active</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        <Link to="/users"><button type="button" className="btn btn-light">Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
