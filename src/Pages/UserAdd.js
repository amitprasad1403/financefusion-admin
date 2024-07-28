import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function UserAdd() {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        username:'',
        password:'',
        first_name:'',
        last_name:'',
        email:'',
        phone_number:'',
        role:'Admin'
    })

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        const response = await fetch(`http://localhost:5000/api/users/addUser`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })

        const json = await response.json()
        console.log(json)
        if(json.success){
            console.log("Success")
            toast.success(json.message)
            navigate("/users")
        }else{
            console.log("Failed")
            toast.error(json.message);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('role')=='Vendor'){
            navigate("/")
        }
    },[])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add User</h4>
                                    <p className="card-description">
                                        Add admin user
                                    </p>
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Username</label>
                                                <input type="text" className="form-control" name="username" id="exampleInputUsername1" placeholder="Username" onChange={handleChange} />
                                            </div>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Password</label>
                                                <input type="password" className="form-control" name="password" id="exampleInputUsername1" placeholder="Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">First name</label>
                                                <input type="text" className="form-control" name="first_name" id="exampleInputEmail1" placeholder="First name" onChange={handleChange} />
                                            </div>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Last Name</label>
                                                <input type="text" className="form-control" name="last_name" id="exampleInputUsername1" placeholder="Last name" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email" onChange={handleChange} />
                                            </div>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputUsername1" placeholder="Phone Number" onChange={handleChange} />
                                            </div>
                                        </div>  
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        <Link to="/users"><button className="btn btn-light">Cancel</button></Link>
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
