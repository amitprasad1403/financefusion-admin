import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewCustomer() {
    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState([]); 

    const getCustomer = async () => {
        const customerId = localStorage.getItem('customerViewId');
        const response = await fetch(`http://localhost:5000/api/customer/details/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            setCustomerData(json.data);
        } else {
            console.log(json.message);
        }
    };  

    useEffect(() => {
        if(localStorage.getItem('role')==='Vendor'){
            navigate("/")
        } 
        getCustomer();
       
    }, [navigate]);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">View Customer</h4>
                                    <p className="card-description">
                                        View customer details
                                    </p>
                                    <form className="forms-sample">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputUsername1">First Name</label>
                                                <input type="text" className="form-control" name="first_name" id="exampleInputUsername1" placeholder="First Name" value={customerData.first_name} readOnly/>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPassword1">Last Name</label>
                                                <input type="text" className="form-control" name="last_name" id="exampleInputPassword1" placeholder="Last Name" value={customerData.last_name} readOnly />
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email" value={customerData.email} readOnly />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPhoneNumber1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputPhoneNumber1" placeholder="Phone Number" value={customerData.phone_number} readOnly />
                                            </div>
                                        </div>
                                        <div className="row">  
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Address</label>
                                                <input type="text" className="form-control" name="address" id="exampleInputEmail1" placeholder="Address" value={customerData.address} readOnly />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Pincode</label>
                                                <input type="text" className="form-control" name="pincode" id="exampleInputEmail1" placeholder="Pincode" value={customerData.pincode} readOnly />
                                            </div>
                                        </div>  
                                        <Link to="/customers"><button type="button" className="btn btn-primary">Back</button></Link>
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
