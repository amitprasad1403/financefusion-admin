import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewLeads() {

    const [leadDetails, setLeadDetails] = useState([])
    const [enquiryDetails, setEnquiryDetails] = useState([])
    const [userDetails, setUserDetails] = useState([])

    const getData = async () => {
        const lead_id = localStorage.getItem('viewLeadId');
        const response = await fetch(`http://localhost:5000/api/customer/leadsDetail/${lead_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'appliocation/json'
            }
        })
        const json = await response.json()
        if (json.success) {
            console.log('success')
            setLeadDetails(json.leadData)
            setEnquiryDetails(json.enquiryDetail)
            setUserDetails(json.assignedUserDetails)
        } else {
            console.log('failed')
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">View Lead</h4>
                                    <p className="card-description">
                                        View lead details
                                    </p>
                                    <form className="forms-sample">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputUsername1">Full Name</label>
                                                <span className='form-control'>{enquiryDetails[0]?.first_name} {enquiryDetails[0]?.last_name}</span>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPassword1">Phone Number</label>
                                                <span className='form-control'>{enquiryDetails[0]?.customerDetails[0].phone_number}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <span className='form-control'>{enquiryDetails[0]?.customerDetails[0].email}</span>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputPhoneNumber1">Handeled By</label>
                                                <span className='form-control'>{userDetails.first_name} {userDetails.last_name}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Document Verification</label>
                                                <span className='form-control'>{leadDetails.document_verification}</span>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Verification</label>
                                                <span className='form-control'>{leadDetails.verification}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="exampleInputEmail1">Lead Status</label>
                                                <span className='form-control'>{leadDetails.lead_status}</span>
                                            </div>
                                        </div>
                                        <Link to="/leads"><button type="button" className="btn btn-primary">Back</button></Link>
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
