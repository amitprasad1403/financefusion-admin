import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const navigate = useNavigate()

    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(role);
        if(role=='Admin'){
            var url = `http://localhost:5000/api/users/login`
        }else if(role=='Vendor'){
            var url = `http://localhost:5000/api/vendors/login`
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })

        const data = await response.json()
        // console.log(data)
        if (data.success) {
            console.log("Success")
            // sessionStorage.setItem
            localStorage.setItem('user_id', data.data.user_id)
            localStorage.setItem('full_name', data.data.full_name)
            localStorage.setItem('role', data.data.role)
            localStorage.setItem('token', data.data.auth_token)
            navigate("/")
            window.location.reload();
        } else {
            toast.error(data.message);
            console.log("Failed to login")
        }
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="container-scroller d-flex">
                <div className="container-fluid page-body-wrapper full-page-wrapper d-flex">
                    <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                        <div className="row flex-grow">
                            <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                <div className="auth-form-transparent text-left p-3">
                                    <div className="brand-logo">
                                        <img src="assets/images/logo-ff.png" alt="logo" />
                                    </div>
                                    <h4>Welcome back!</h4>
                                    <h6 className="font-weight-light">Happy to see you again!</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <label>Role</label>
                                            <select className="form-control form-control-lg" id="exampleFormControlSelect2" onChange={(e)=>setRole(e.target.value)}>
                                                <option value="">Select Role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Vendor">Vendor</option> 
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail">Username</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-account-outline text-primary"></i>
                                                    </span>
                                                </div>
                                                <input type="text"
                                                    className="form-control form-control-lg border-left-0"
                                                    id="exampleInputEmail"
                                                    placeholder="Username"
                                                    name="username"
                                                    value={username}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword">Password</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-lock-outline text-primary"></i>
                                                    </span>
                                                </div>
                                                <input type="password"
                                                    className="form-control form-control-lg border-left-0"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                        Keep me signed in
                                                </label>
                                            </div>
                                            <a href="#" className="auth-link text-black">Forgot password?</a>
                                        </div> */}
                                        <div className="my-3">
                                            <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit}>LOGIN</a>
                                        </div>
                                        {/* <div className="mb-2 d-flex">
                                            <button type="button" className="btn btn-facebook auth-form-btn flex-grow mr-1">
                                                <i className="mdi mdi-facebook mr-2"></i>Facebook
                                            </button>
                                            <button type="button" className="btn btn-google auth-form-btn flex-grow ml-1">
                                                <i className="mdi mdi-google mr-2"></i>Google
                                            </button>
                                        </div> */}
                                        {/* <div className="text-center mt-4 font-weight-light">
                                            Don't have an account? <a href="register-2.html" className="text-primary">Create</a>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 login-half-bg d-none d-lg-flex flex-row">
                                <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2024  All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
