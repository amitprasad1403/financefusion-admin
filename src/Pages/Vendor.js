import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Vendor() {

    const navigate = useNavigate()

    const [vendorsList, setVendorlist] = useState()

    const vendorList = async () => {
        const response = await fetch(`http://localhost:5000/api/vendors/list`, {
            methods: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        console.log(json)
        if (json.success) {
            setVendorlist(json.data)
        } else {
            console.log("Failed fo fetch data")
        }
    }

    const handleEdit = (id) => {
        localStorage.setItem('vendorEditId',id)
        navigate("/vendorEdit")
    }

    const handleDelete = async (id) => {
        // console.log(id)

        const response = await fetch(`http://localhost:5000/api/vendors/delete/${id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if(json.success){
            toast.success(json.message)
            vendorList()
        }else{
            toast.error(json.message)
        }
    }

    useEffect(() => { 
        if(localStorage.getItem('role')=='Vendor'){
            navigate("/")
        }
        vendorList();
    }, [])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Vendors List</h4>
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
                                                {(vendorsList) ?
                                                    vendorsList.map(vendor => (
                                                        <tr>
                                                            <td>{vendor.vendor_name}</td>
                                                            <td>{vendor.email}</td>
                                                            <td>{vendor.phone_number}</td>
                                                            {
                                                                vendor.status === "Active" ?
                                                                    <td><label className="badge badge-success">Active</label></td>
                                                                    :
                                                                    <td><label className="badge badge-danger">In-Active</label></td>
                                                            }

                                                            <td>
                                                                <button type="button" class="btn btn-inverse-success btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Edit" onClick={() => handleEdit(vendor.vendor_id)}>
                                                                    <i class="mdi mdi-account-edit"></i>
                                                                </button>
                                                                &emsp;
                                                                {
                                                                    vendor.status == 'Active' ?
                                                                        <button type="button" class="btn btn-inverse-danger btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="View" onClick={() => handleDelete(vendor.vendor_id)}>
                                                                            <i class="mdi mdi-delete"></i>
                                                                        </button>
                                                                        :
                                                                        <></>
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
