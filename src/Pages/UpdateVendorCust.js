import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateVendorCust() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        address: '',
        note: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getUser = async () => {
        const vendorCustId = localStorage.getItem('vendorCustId');
        const response = await fetch(`http://localhost:5000/api/vendors/getCustomer/${vendorCustId}`, {
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

    const updateVendorCust = async (e) => {
        e.preventDefault();
        const vendorCustId = localStorage.getItem('vendorCustId');
        const response = await fetch(`http://localhost:5000/api/vendors/updateCustomer/${vendorCustId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            localStorage.removeItem('vendorCustId');
            navigate("/vendorCustomers");
        } else {
            console.log("Failed to update");
            toast.error(json.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('role') !== 'Vendor') {
            navigate("/")
        }
        getUser();
    }, [navigate]);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Edit Customer</h4>
                                    <p className="card-description">
                                        Edit customer details
                                    </p>
                                    <form className="forms-sample" onSubmit={updateVendorCust}>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputUsername1">Full Name</label>
                                                <input type="text" className="form-control" name="full_name" id="exampleInputUsername1" placeholder="Full Name" value={formData.full_name} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPassword1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputPassword1" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputFirstName1">Address</label>
                                                <input type="text" className="form-control" name="address" id="exampleInputFirstName1" placeholder="Address" value={formData.address} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Note</label>
                                                <input type="text" className="form-control" name="note" id="exampleInputEmail1" placeholder="Note" value={formData.note} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        <Link to="/vendorCustomers"><button type="button" className="btn btn-light">Cancel</button></Link>
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
