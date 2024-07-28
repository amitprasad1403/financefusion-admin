import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Leads() {

    const navigate = useNavigate();

    const [leadsData,setLeadsData] = useState()

    const getData = async () => {
        const user_id = localStorage.getItem('user_id')
        const role = localStorage.getItem('role')
        const response = await fetch(`http://localhost:5000/api/customer/leads/${role}/${user_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if(json.success){
            console.log('success')
            setLeadsData(json.data[0])
        }else{
            console.log('failed')
        }
    }

    const handleEdit = async (id) => {
        localStorage.setItem('viewLeadId',id)
        navigate('/leadEdit')
    }

    const handleView = async (id) => {
        localStorage.setItem('viewLeadId',id)
        navigate('/leadView')
    }

    useEffect(()=>{
        getData();
    },[navigate])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Leads</h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Applied For</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(leadsData) ?
                                                    leadsData.map(lead => (
                                                        <tr>
                                                            <td>{lead.enquirydetails[0].first_name} {lead.enquirydetails[0].last_name}</td>
                                                            <td>{lead.customerDetails[0].phone_number}</td>
                                                            <td>{lead.lead_for}</td>
                                                            {
                                                                lead.lead_status === "Approved" &&
                                                                <td><label className="badge badge-success">Approved</label></td>
                                                            }
                                                            {
                                                                lead.lead_status === "Pending" &&
                                                                <td><label className="badge badge-warning">Pending</label></td>
                                                            }
                                                            {
                                                                lead.lead_status === "In-Process" &&
                                                                <td><label className="badge badge-info">In-Process</label></td>
                                                            }
                                                            {
                                                                lead.lead_status === "Waiting-to-Approve" &&
                                                                <td><label className="badge badge-primary">Waiting-to-Approve</label></td>
                                                            }
                                                            {
                                                                lead.lead_status === "Rejected" &&
                                                                <td><label className="badge badge-info">Rejected</label></td>
                                                            }

                                                            <td>
                                                                <button type="button" class="btn btn-inverse-primary btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Edit" onClick={() => handleEdit(lead.leads_id)}>
                                                                    <i class="mdi mdi-account-edit"></i>
                                                                </button>
                                                                &emsp;
                                                                <button type="button" class="btn btn-inverse-info btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="View" onClick={() => handleView(lead.leads_id)}>
                                                                    <i class="mdi mdi-eye"></i>
                                                                </button>
                                                                
                                                            </td>

                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td>List not found.</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
