import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateLead() {

  const navigate = useNavigate()

  const [leadDetails, setLeadDetails] = useState([])
  const [enquiryDetails, setEnquiryDetails] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [documentVerif, setDocumentVerif] = useState()
  const [verification, setVerification] = useState()
  const [leadStatus, setLeadStatus] = useState()

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

  const handleSubmit = async () => {
    const lead_id = localStorage.getItem('viewLeadId');
    const response = await fetch(`http://localhost:5000/api/customer/updateLead/${lead_id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({document_verification:documentVerif,verification:verification,lead_status:leadStatus})
    })

    const json = await response.json()
    if(json.success){
      console.log('success')
      navigate('/leads')
    }else{
      console.log('failed')
      toast.error(json.message)
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
                  <h4 className="card-title">Edit Lead</h4>
                  <p className="card-description">
                    Edit lead details
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
                        <select className='form-control' name="document_verification" value={leadDetails.document_verification} onChange={(e)=>setDocumentVerif(e.target.value)}> 
                          <option value="Yes">Yes</option> 
                          <option value ="No">No</option> 
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="exampleInputEmail1">Verification</label>
                        <select className='form-control' name="document_verification" value={leadDetails.verification} onChange={(e)=>setVerification(e.target.value)}> 
                          <option value="Yes">Yes</option> 
                          <option value ="No">No</option> 
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="exampleInputEmail1">Lead Status</label>
                        <select className='form-control' name="document_verification" value={leadDetails.lead_status} onChange={(e)=>setLeadStatus(e.target.value)}> 
                          <option value="">Select Status</option> 
                          <option value ="Pending">Pending</option> 
                          <option value ="In-Process">In-Process</option> 
                          <option value ="Waiting-to-Approve">Waiting-to-Approve</option> 
                          <option value ="Approved">Approved</option> 
                          <option value ="Rejected">Rejected</option> 
                        </select>
                      </div>
                    </div>
                    <button type='button' className='btn btn-primary' onClick={handleSubmit}>Update</button>
                    &emsp;
                    <Link to="/leads"><button type="button" className="btn btn-light">Back</button></Link>
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
