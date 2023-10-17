import React from "react";
import "./main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Pages/adminPages/AdminHome";
import Login from "./components/Pages/Login";
// import UserManagement from "./components/Pages/adminPages/UserManagement";
import UserManagement from "./components/Pages/adminPages/SuperUserManagement";
import MasterManagement from "./components/Pages/adminPages/MasterManagement";
import SuperMasterTable from "./components/Pages/adminPages/SuperMasterTable";
import StatsList from "./components/Pages/adminPages/StatsList";
// import Home from "./components/Pages/Home";
// import DetailedView from "./components/Pages/DetailedView";
// import SearchResult from "./components/Pages/SearchResult";
import { useSelector } from "react-redux";
import FormPage from "./components/customComponents/FormPage";
import ViewListing from "./components/Pages/adminPages/ViewListing";
import ApproveListing from "./components/Pages/adminPages/ApproveListings";
import TableFormPage from "./components/customComponents/TableFormData";
import SalesOpen from "./components/Pages/SalesOpen.jsx";
import SalesClose from "./components/Pages/SalesClose.jsx";
import RecordCall from "./components/Pages/RecordCall.jsx";
import ActiveCall from "./components/Pages/ActiveCall.jsx";
import Dashboard from "./components/Pages/Dashboard.jsx";
import Home from "./components/Pages/Home";

function App() {
  const userProfile = useSelector((state) => state.profile);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/builderFloorDetails" element={<DetailedView />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/property" element={<PropertyManagement />} />
          <Route path="/admin/master" element={<MasterManagement />} />
          <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/admin/form" element={<FormPage />} />
          <Route path="/admin/TableForm" element={<TableFormPage />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/approveListing" element={<ApproveListing />} />
          <Route path="/admin/master" element={<MasterManagement />} />
          <Route path="/admin/masterTable" element={<SuperMasterTable />} />
          <Route path="/admin/statistics" element={<StatsList />} /> */}
          {/* <Route
            path="/admin/statistics/listingData"
            element={<ViewListing />}
          />
          <Route
            path="/admin"
            element={<AdminHome role={userProfile.role} />}
          />
          <Route path="/" element={<Login />} /> */}
          <Route path="/sales/open" element={<SalesOpen />} />
          <Route path="/sales/close" element={<SalesClose />} />
          <Route path="/recording/recorded-calls" element={<RecordCall />} />
          <Route path="/recording/active-calls" element={<ActiveCall />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
