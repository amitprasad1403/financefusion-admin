import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Customers() {
    const navigate = useNavigate();
    const [customerList, setCustomerlist] = useState()

    const handleView = async (id) => {
        localStorage.setItem('customerViewId',id)
        navigate("/customerView")
    }

    useEffect(() => {
        if (localStorage.getItem('role') == 'Vendor') {
            navigate("/")
        }

        const customerList = async () => {
            const response = await fetch(`http://localhost:5000/api/customer/list`, {
                methods: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            console.log(json)
            if (json.success) {
                setCustomerlist(json.data)
            } else {
                console.log("Failed fo fetch data")
            }
        }

        customerList();
    }, [])

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Registered Customers List</h4>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>Email Verified</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(customerList) ?
                                                    customerList.map(cust => (
                                                        <tr>
                                                            <td>{cust.first_name} {cust.last_name}</td>
                                                            <td>{cust.email}</td>
                                                            <td>{cust.phone_number}</td>
                                                            {
                                                                cust.email_verified === "Yes" ?
                                                                    <td><label className="badge badge-success">Yes</label></td>
                                                                    :
                                                                    <td><label className="badge badge-danger">No</label></td>
                                                            }

                                                            <td>
                                                                <button type="button" class="btn btn-inverse-info btn-icon" data-tooltip-id="my-tooltip" data-tooltip-content="View" onClick={() => handleView(cust.customer_id)}>
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
