import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';  
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewVendorCust() {

    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState([]);
    const [status, setStatus] = useState();

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
            setCustomerData(json.data);
        } else {
            console.log(json.message);
        }
    };

    const handleChange = async (value) => {
        // console.log(value);
        setStatus(value)
        const vendorCustId = localStorage.getItem('vendorCustId');
        const response = await fetch(`http://localhost:5000/api/vendors/updateStatus/${vendorCustId}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ status: value })
        })
        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            localStorage.removeItem('vendorCustId');
            navigate("/vendorCustomers");
        } else {
            console.log("Failed to update");
            toast.error(json.message);
        }
    }

    useEffect(() => { 
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
                                    <h4 className="card-title">View Customer</h4>
                                    <p className="card-description">
                                        View customer details
                                    </p>
                                    <form className="forms-sample">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputUsername1">Full Name</label>
                                                <input type="text" className="form-control" name="full_name" id="exampleInputUsername1" placeholder="Full Name" value={customerData.full_name} readOnly />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPassword1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputPassword1" placeholder="Phone Number" value={customerData.phone_number} readOnly/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputFirstName1">Address</label>
                                                <input type="text" className="form-control" name="address" id="exampleInputFirstName1" placeholder="Address" value={customerData.address} readOnly/>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Note</label> 
                                                <input type="text" className="form-control" name="note" id="exampleInputEmail1" placeholder="Note" value={customerData.note} readOnly />
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputStatus1">Status</label>
                                                <select className="form-control" name="status" value={customerData.status} onChange={(e)=>handleChange(e.target.value)}>
                                                    <option value="">Select Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Registered">Registered</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div> 
                                        </div> 
                                        <Link to="/vendorCustomers"><button type="button" className="btn btn-primary">Back</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}
