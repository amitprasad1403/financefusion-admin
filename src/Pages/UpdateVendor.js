import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateVendor() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        vendor_name: '', 
        email: '',
        phone_number: '',
        location: '',
        status: '',
        assigned_to: null,
    });

    const [userList,setUserList] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getVendor = async () => {
        const vendorId = localStorage.getItem('vendorEditId');
        const response = await fetch(`http://localhost:5000/api/vendors/get/${vendorId}`, {
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

    const getUsersList = async () => {
        const response = await fetch(`http://localhost:5000/api/vendors/userList`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }            
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            setUserList(json.data)
        }else{
            console.log("Failed to get user list.")
        }
    }

    const updateVendor = async (e) => {
        e.preventDefault();
        const vendorId = localStorage.getItem('vendorEditId');
        const response = await fetch(`http://localhost:5000/api/vendors/update/${vendorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            toast.success(json.message);
            localStorage.removeItem('vendorEditId');
            navigate("/vendors");
        } else {
            console.log("Failed to update");
            toast.error(json.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem('role')==='Vendor'){
            navigate("/")
        }
        getUsersList();
        getVendor();
       
    }, [navigate]);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Edit Vendor</h4>
                                    <p className="card-description">
                                        Edit vendor details
                                    </p>
                                    <form className="forms-sample" onSubmit={updateVendor}>
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
                                                <label htmlFor="exampleInputFirstName1">Full name</label>
                                                <input type="text" className="form-control" name="vendor_name" id="exampleInputFirstName1" placeholder="Full name" value={formData.vendor_name} onChange={handleChange} />
                                            </div> 
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email" value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">                                            
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPhoneNumber1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputPhoneNumber1" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Location</label>
                                                <input type="text" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email" value={formData.location} onChange={handleChange} />
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
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputStatus1">Assign to</label>
                                                <select className="form-control" name="assigned_to" value={formData.assigned_to} onChange={handleChange}>
                                                    <option value="">Select User</option>
                                                    {
                                                        userList.map((user, index) => (
                                                            <option key={index} value={user.user_id}>{user.first_name} {user.last_name}</option>
                                                        ))
                                                    }
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        <Link to="/vendors"><button type="button" className="btn btn-light">Cancel</button></Link>
                                    </form>
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
