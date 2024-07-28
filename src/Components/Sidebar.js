import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {

    const location = useLocation();
    const [role, setRole] = useState()

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    }, [])

    return (
        <  >
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item sidebar-category" >

                        <span></span>
                    </li>
                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/">
                            <i className="mdi mdi-view-quilt menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item sidebar-category">
                        <p>Components</p>
                        <span></span>
                    </li>
                    <li className={`nav-item ${location.pathname === '/vendorCustomers' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/vendorCustomers">
                            <i className="mdi mdi-view-headline menu-icon"></i>
                            <span className="menu-title">Vendor Customers</span>
                        </Link>
                    </li>
                    {role === 'Admin' &&
                        <>
                            <li className={`nav-item ${location.pathname === '/customers' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/customers">
                                    <i className="mdi mdi-account-multiple menu-icon"></i>
                                    <span className="menu-title">Registered Customers</span>
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/leads' ? 'active' : ''}`}>
                                <Link to="/leads" className="nav-link">
                                    <i className="mdi mdi-calendar-text menu-icon"></i>
                                    <span className="menu-title">Leads</span>
                                </Link>
                            </li> 
                            <li className={`nav-item ${location.pathname === '/enquries' ? 'active' : ''}`}>
                                <Link to="/enquries" className="nav-link">
                                    <i className="mdi mdi-chart-pie menu-icon"></i>
                                    <span className="menu-title">Enquries</span>
                                </Link>
                            </li> 
                            <li className={`nav-item ${location.pathname === '/contactUs' ? 'active' : ''}`}>
                                <Link to="/contactUs" className="nav-link">
                                    <i className="mdi mdi-phone menu-icon"></i>
                                    <span className="menu-title">Contact Us</span>
                                </Link>
                            </li> 
                        </>
                    }
                    {role === 'SuperAdmin' &&
                        <>
                            <li className={`nav-item ${location.pathname === '/customers' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/customers">
                                    <i className="mdi mdi-view-headline menu-icon"></i>
                                    <span className="menu-title">Registered Customers</span>
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/leads' ? 'active' : ''}`}>
                                <Link to="/leads" className="nav-link">
                                    <i className="mdi mdi-calendar-text menu-icon"></i>
                                    <span className="menu-title">Leads</span>
                                </Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/enquries' ? 'active' : ''}`}>
                                <Link to="/enquries" className="nav-link">
                                    <i className="mdi mdi-chart-pie menu-icon"></i>
                                    <span className="menu-title">Enquries</span>
                                </Link>
                            </li> 
                            <li className={`nav-item ${location.pathname === '/contactUs' ? 'active' : ''}`}>
                                <Link to="/contactUs" className="nav-link">
                                    <i className="mdi mdi-phone menu-icon"></i>
                                    <span className="menu-title">Contact Us</span>
                                </Link>
                            </li> 
                            <li className={`nav-item ${location.pathname === '/vendors' ? 'active' : ''}`}>
                                <a className="nav-link" data-toggle="collapse" href="#ui-basic-vendors" aria-expanded="false" aria-controls="ui-basic-vendors">
                                    <i className="mdi mdi-account menu-icon"></i>
                                    <span className="menu-title">Vendors</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="collapse" id="ui-basic-vendors">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item"> <Link to="/vendors" className="nav-link">Vendors List</Link></li>
                                        <li className="nav-item"> <Link to="/vendorAdd" className="nav-link">Add Vendor</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li className={`nav-item ${location.pathname === '/users' || location.pathname === '/userAdd' ? 'active' : ''}`}>
                                <a className="nav-link" data-toggle="collapse" href="#ui-basic-user" aria-expanded="false" aria-controls="ui-basic-user">
                                    <i className="mdi mdi-account menu-icon"></i>
                                    <span className="menu-title">Users</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="collapse" id="ui-basic-user">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item"> <Link to="/users" className="nav-link">Users List</Link></li>
                                        <li className="nav-item"> <Link to="/userAdd" className="nav-link">Add User</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </ >
    )
}
