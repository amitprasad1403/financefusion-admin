import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
    const navigate = useNavigate();
    const [contactUsData,setContactUsData] = useState([]);

    const getLsitData = async () => {
        const response = await fetch(`http://localhost:5000/api/contact_us/list`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if(json.success){
            console.log('Success')
            setContactUsData(json.data)
        }else{
            console.log('Failed')
        }
    }

    const handleView = (id) => {
        localStorage.setItem('contactViewid',id)
        navigate("/viewContact")
    }

    useEffect(()=>{
        getLsitData();
    },[navigate])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">ContactUS List</h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th> 
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(contactUsData.length > 0) ?
                                                    contactUsData.map(contact => (
                                                        <tr>
                                                            <td>{contact.name}</td>
                                                            <td>{contact.email}</td>
                                                            <td>{contact.phone_number}</td>
                                                            {
                                                                contact.status === "Completed" &&
                                                                    <td><label className="badge badge-success">Completed</label></td>  
                                                            }
                                                            {
                                                                contact.status === "Pending" &&
                                                                    <td><label className="badge badge-warning">Pending</label></td>  
                                                            }
                                                            {
                                                                contact.status === "Closed" &&
                                                                    <td><label className="badge badge-danger">Closed</label></td>  
                                                            }

                                                            <td>
                                                                <button type="button" class="btn btn-inverse-info btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="View" onClick={() => handleView(contact.contact_id)}>
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
