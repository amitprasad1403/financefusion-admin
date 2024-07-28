import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Enquries() {

    const navigate = useNavigate()

    const [enquriesList, setEnquriesList] = useState({});

    const getList = async () => {
        const response = await fetch(`http://localhost:5000/api/customer/enquries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (json.success) {
            console.log('Success')
            setEnquriesList(json.data)
        } else {
            console.log('Failed')
        }
    }

    const handleDownload = (filename) => {
        const encodedFilename = encodeURIComponent(filename);
        window.open(`http://localhost:5000/public/enquiry/userIdentity/${encodedFilename}`);
    }

    const handleConvert = async (id, applied_for) => {
        const response = await fetch(`http://localhost:5000/api/customer/convertEnquiry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enquiry_id: id, handeled_by: localStorage.getItem('user_id'), lead_for: applied_for })
        })
        const json = await response.json()
        if (json.success) {
            toast.success(json.message)
            getList()
        } else {
            toast.error(json.message)
        }
    }

    useEffect(() => {
        getList();
    }, [navigate])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Enquries List</h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>PAN Number</th>
                                                    <th>Applied For</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(enquriesList.length > 0) ?
                                                    enquriesList.map(enquiry => (
                                                        <tr>
                                                            <td>{enquiry.first_name} {enquiry.last_name}</td>
                                                            <td>{enquiry.pan_number}</td>
                                                            <td>{enquiry.applied_for}</td>
                                                            {
                                                                enquiry.status === "Converted" &&
                                                                <td><label className="badge badge-success">Converted</label></td>
                                                            }
                                                            {
                                                                enquiry.status === "Pending" &&
                                                                <td><label className="badge badge-warning">Pending</label></td>
                                                            }
                                                            {
                                                                enquiry.status === "In-Process" &&
                                                                <td><label className="badge badge-info">In-Process</label></td>
                                                            }

                                                            <td>
                                                                <button type="button" class="btn btn-inverse-success btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Download Id" onClick={() => handleDownload(enquiry.user_identity)}>
                                                                    <i class="mdi mdi-download"></i>
                                                                </button>
                                                                &emsp;
                                                                {
                                                                    enquiry.status == 'Pending' &&

                                                                    <button type="button" class="btn btn-inverse-primary btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Convert" onClick={() => handleConvert(enquiry.enquiry_id, enquiry.applied_for)}>
                                                                        <i class="mdi mdi-cached"></i>
                                                                    </button>
                                                                }
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
            <ToastContainer />
        </>
    )
}
