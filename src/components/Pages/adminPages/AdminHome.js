import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import Panel from "../../utils/Panel";
import Navbar from "../../utils/Navbar";
import { useSelector } from "react-redux";
import {
  ADMIN_DASHBOARD,
  ADMIN_DASHBOARD_LOGIN,
  PROPERTY_DEALER,
} from "../../utils/Const";
import { USER_ROLE } from "../../../ScreenJson";
import PageSelector from "../../customComponents/PageSelector";

export default function AdminHome() {
  const userProfile = useSelector((state) => state.profile);
  const [showMenu, setShowMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(ADMIN_DASHBOARD);

  return (
    <div className="whole-container">
      <div className="nav-nav ">
        <Button
          className="admin-menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </Button>
        <h1>Dashboard</h1>
        {/* <Navbar role={userProfile?.role} /> */}
      </div>
      <div
        // className={`${"main-admin-container"} ${
        //   showMenu ? "menu-is-active" : "menu-is-not-active"
        // } `}
        className={`${"content-container"}
       
         `}
      >
        {showMenu && (
          // <div className="admin-dashboard-home">
          <div className="admin-dashboard-home-check">
            <Panel
              currentPage={currentPage}
              nonSalesUser={userProfile?.role !== USER_ROLE[PROPERTY_DEALER]}
              handlePageClick={(page) => {
                setCurrentPage(page);
              }}
              onLogoutClick={ADMIN_DASHBOARD_LOGIN}
            />
          </div>
        )}
        <div className="main-content">
          <PageSelector pageName={currentPage} />
        </div>
      </div>
    </div>
  );
}
