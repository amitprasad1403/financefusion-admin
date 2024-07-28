import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Customers from './Pages/Customers';
import { useEffect } from 'react';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import UserAdd from './Pages/UserAdd';
import Users from './Pages/Users';
import UpdateUser from './Pages/UpdateUser';
import Vendor from './Pages/Vendor';
import VendorAdd from './Pages/VendorAdd';
import UpdateVendor from './Pages/UpdateVendor';
import VendorCustomers from './Pages/VendorCustomers';
import VendorCustomerAdd from './Pages/VendorCustomerAdd';
import UpdateVendorCust from './Pages/UpdateVendorCust';
import ViewVendorCust from './Pages/ViewVendorCust';
import ViewCustomer from './Pages/ViewCustomer';
import ContactUs from './Pages/ContactUs';
import ViewContactUs from './Pages/ViewContactUs';
import Enquries from './Pages/Enquries';
import Leads from './Pages/Leads';
import UpdateLead from './Pages/UpdateLead';
import ViewLeads from './Pages/ViewLeads';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route path='/*' element={<ProtectedLayout />} />
    </Routes>
  );
}

function ProtectedLayout() { 

  return (
    <div className="container-scroller d-flex">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/customers' element={<Customers />} />
          <Route exact path='/customerView' element={<ViewCustomer />} />
          <Route exact path='/vendorCustomers' element={<VendorCustomers />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/userAdd' element={<UserAdd />} />
          <Route exact path='/userEdit' element={<UpdateUser />} />
          <Route exact path='/vendors' element={<Vendor />} />
          <Route exact path='/vendorAdd' element={<VendorAdd />} />
          <Route exact path='/vendorEdit' element={<UpdateVendor />} />
          <Route exact path='/vendorCustAdd' element={<VendorCustomerAdd />} />
          <Route exact path='/vendorCustEdit' element={<UpdateVendorCust />} />
          <Route exact path='/vendorCustView' element={<ViewVendorCust />} />
          <Route exact path='/contactUs' element={<ContactUs />} />
          <Route exact path='/ViewContact' element={<ViewContactUs />} />
          <Route exact path='/enquries' element={<Enquries />} />
          <Route exact path='/leads' element={<Leads />} />
          <Route exact path='/viewEnqiry' element={<Leads />} />
          <Route exact path='/leadEdit' element={<UpdateLead />} />
          <Route exact path='/leadView' element={<ViewLeads />} />
        </Routes>
      </div>      
      <Tooltip id="my-tooltip" />
    </div>
  );
}

export default App;
