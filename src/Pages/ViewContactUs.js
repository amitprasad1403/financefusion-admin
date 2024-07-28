import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewContactUs() {
    const navigate = useNavigate();

    const [contactData, setContactData] = useState({});
    const [status, setStatus] = useState('');

    const getDetails = async () => {
        const contactViewid = localStorage.getItem('contactViewid');
        const response = await fetch(`http://localhost:5000/api/contact_us/getDetails/${contactViewid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (json.success) {
            setContactData(json.data);
            setStatus(json.data.status); // Initialize the status
        } else {
            console.log(json.message);
        }
    };

    const handleChange = async (value) => {
        setStatus(value);
        const contactViewid = localStorage.getItem('contactViewid');
        const response = await fetch(`http://localhost:5000/api/contact_us/updateStatus/${contactViewid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: value }),
        });
        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            localStorage.removeItem('contactViewid');
            navigate('/contactUs');
        } else {
            console.log('Failed to update');
            toast.error(json.message);
        }
    };

    useEffect(() => {
        getDetails();
    }, []); // Run only once on mount

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">View ContactUs</h4>
                                    <p className="card-description">View contact us details</p>
                                    <form className="forms-sample">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputUsername1">Full Name</label>
                                                <input type="text" className="form-control" name="full_name" id="exampleInputUsername1" placeholder="Full Name" value={contactData.name || ''} readOnly />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPassword1">Phone Number</label>
                                                <input type="text" className="form-control" name="phone_number" id="exampleInputPassword1" placeholder="Phone Number" value={contactData.phone_number || ''} readOnly />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputFirstName1">Email</label>
                                                <input type="text" className="form-control" name="email" id="exampleInputFirstName1" placeholder="Email" value={contactData.email || ''} readOnly />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Message</label>
                                                <input type="text" className="form-control" name="message" id="exampleInputEmail1" placeholder="Message" value={contactData.message || ''} readOnly />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputStatus1">Status</label>
                                                <select className="form-control" name="status" value={status} onChange={(e) => handleChange(e.target.value)}>
                                                    <option value="">Select Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Link to="/contactUs"><button type="button" className="btn btn-primary">Back</button></Link>
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
