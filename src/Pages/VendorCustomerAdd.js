import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function VendorCustomerAdd() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vendor_id: localStorage.getItem('user_id'),
        full_name: '',
        phone_number: '',
        address: '',
        note: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        const response = await fetch(`http://localhost:5000/api/vendors/addCustomer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            console.log("Success")
            toast.success(json.message)
            navigate("/vendorCustomers")
        } else {
            console.log("Failed")
            toast.error(json.message);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('role')!='Vendor'){
            navigate("/")
        }
    }, [])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Customer</h4>
                                    <p className="card-description">
                                        Add customer details
                                    </p>
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Full Name</label>
                                                <input type="text" className="form-control" name="full_name" id="exampleInputUsername1" placeholder="Full Name" onChange={handleChange} />
                                            </div>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputUsername1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputUsername1" placeholder="Phone Number" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Address</label>
                                                <input type="text" className="form-control" name="address" id="exampleInputEmail1" placeholder="Address" onChange={handleChange} />
                                            </div>
                                            <div className='col-md-6 form-group'>
                                                <label htmlFor="exampleInputEmail1">Note</label>
                                                <input type="text" className="form-control" name="note" id="exampleInputEmail1" placeholder="Note" onChange={handleChange} />
                                            </div>
                                        </div> 
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        <Link to="/vendorCustomers"><button className="btn btn-light">Cancel</button></Link>
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
