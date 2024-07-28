import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VendorCustomers() {
    const navigate = useNavigate();
    const [customersList, setCustomerlist] = useState([]);
    const [loginuser, setLoginuser] = useState();

    const customerList = async () => {
        const role = localStorage.getItem('role');
        const user_id = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:5000/api/vendors/customerList/${role}/${user_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            setCustomerlist(Array.isArray(json.data) ? json.data : []);
        } else {
            console.log("Failed to fetch data");
        }
    };

    const handleEdit = (id) => {
        localStorage.setItem('vendorCustId', id);
        navigate("/vendorCustEdit");
    };

    const handleView = (id) => {
        localStorage.setItem('vendorCustId', id);
        navigate("/vendorCustView");
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/vendors/deleteCustomer/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (json.success) {
            toast.success(json.message);
            customerList();
        } else {
            toast.error(json.message);
        }
    };

    useEffect(() => {
        setLoginuser(localStorage.getItem('role'));
        customerList();
    }, []);

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Vendor Customers List</h4>
                                    {localStorage.getItem('role') === 'Vendor' &&
                                        <Link to="/vendorCustAdd">
                                            <button type="submit" className="btn btn-primary mr-2" style={{ float: 'right' }}>
                                                Add <i className="mdi mdi-account-plus"></i>
                                            </button>
                                        </Link>
                                    }
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    {(loginuser === 'Admin' || loginuser === 'SuperAdmin') &&
                                                        <th>Vendor Name</th>
                                                    }
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customersList ?
                                                    customersList.map(cust => (
                                                        <tr key={cust.vc_id}>
                                                            <td>{cust.full_name}</td>
                                                            <td>{cust.phone_number}</td>
                                                            {(loginuser === 'Admin' || loginuser === 'SuperAdmin') &&
                                                                <td>{cust.vendorDetails?.vendor_name}</td>
                                                            }
                                                            <td>
                                                                {cust.status === "Pending" &&
                                                                    <label className="badge badge-warning">Pending</label>
                                                                }
                                                                {cust.status === "Registered" &&
                                                                    <label className="badge badge-success">Registered</label>
                                                                }
                                                                {cust.status === "Closed" &&
                                                                    <label className="badge badge-danger">Closed</label>
                                                                }
                                                            </td>
                                                            <td>
                                                                {loginuser === 'Vendor' &&
                                                                    <>
                                                                        <button type="button" className="btn btn-inverse-success btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Edit" onClick={() => handleEdit(cust.vc_id)}>
                                                                            <i className="mdi mdi-account-edit"></i>
                                                                        </button>
                                                                        &emsp;
                                                                        <button type="button" className="btn btn-inverse-danger btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="Delete" onClick={() => handleDelete(cust.vc_id)}>
                                                                            <i className="mdi mdi-delete"></i>
                                                                        </button>
                                                                    </>
                                                                }
                                                                {(loginuser === 'SuperAdmin' || loginuser === 'Admin') &&
                                                                    <button type="button" className="btn btn-inverse-success btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="View" onClick={() => handleView(cust.vc_id)}>
                                                                        <i className="mdi mdi-eye"></i>
                                                                    </button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan="5">List not found.</td>
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
    );
}
