import React, { useState } from "react";
import RenderComponent from "./ComponentRenderer";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ classes, src1, src2, childClass, route }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selected = Array.isArray(route)
    ? route.includes(location.pathname)
    : route === location.pathname;
  return (
    <div
      onClick={() => {
        if (Array.isArray(route)) {
          navigate(route[0]);
        } else {
          navigate(route);
        }
      }}
      style={{
        backgroundColor: selected && "#fe50433c",
      }}
      className={
        "w-[40px] h-[40px] rounded-[12px] flex items-center translate-x-[-2px]    justify-center " +
        classes
      }
    >
      <img
        src={selected ? src2 : src1}
        className={childClass + "    cursor-pointer "}
        alt=""
      />
    </div>
  );
};

const Navbar = ({ title, mainTitle, iconSrc }) => {
  return (
    <div className="w-[100%] h-[80px] pl-[50px] flex justify-between items-center">
      <div className="flex items-center">
        <img src={iconSrc} className="w-[25px] translate-y-[1px]" alt="" />
        <p className="text-[25px] font-medium text-[#2E3134] ml-[10px]">
          {title}
        </p>
        <p className="text-[25px] font-medium italic text-[#FE5143] ml-[10px]">
          {mainTitle}
        </p>
      </div>
      <div className="flex">
        <div className="w-[372px] bg-[#f0f0f0] mr-[10px] overflow-hidden rounded-[11px] flex h-[42px]">
          <input
            type="text"
            style={{
              border: "0px",
              height: "100%",
              padding: "0px 10px",
            }}
            className=" w-[100%] h-[100%] text-[14px] font-medium tracking-wide outline-none bg-transparent "
          />
          <img
            src="/assets/navbar/search.svg"
            className="w-[20px] shrink-0 mx-[10px]"
            alt=""
          />
        </div>
        <img
          src="/assets/navbar/bell.svg"
          className="ml-[20px] cursor-pointer"
          alt=""
        />
        <img
          src="/assets/navbar/ava.png"
          className="w-[30px]  cursor-pointer mx-[20px] mr-[40px] shrink-0 object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className=" w-[71px] shrink-0 bg-[#2E3134] h-[100vh] flex flex-col items-center py-[25px] rounded-r-[20px]">
      <img
        src="/assets/open/logo-1.png"
        className="w-[22px] translate-x-[-2px] cursor-pointer"
        alt=""
      />
      <SidebarItem
        route="/dashboard"
        src1="/assets/sidebar/light/dashboard.svg"
        src2="/assets/sidebar/dark/dashboard.svg"
        classes={" mt-[30px]"}
        childClass="w-[18px]"
      />
      <SidebarItem
        route={["/sales/open", "/sales/close"]}
        src1="/assets/sidebar/light/park.svg"
        src2="/assets/sidebar/dark/park.svg"
        classes={"mt-[10px]"}
        childClass="w-[18px]"
      />
      <SidebarItem
        route={["/recording/recorded-calls", "/recording/active-calls"]}
        src1="/assets/sidebar/light/call.svg"
        src2="/assets/sidebar/dark/call.svg"
        classes={"mt-[10px]"}
        childClass="w-[27px]"
      />
    </div>
  );
};

const MainLayout = ({ component }) => {
  return (
    <div className="w-[100%] h-[100vh] flex fixed z-10 left-0 top-0">
      <Sidebar />
      <div className="w-[100%] h-[100vh] ">
        <Navbar
          title={component.navTitle}
          mainTitle={component.navTitleMain}
          iconSrc={component.navTitleIconSrc}
        />
        <div
          className="w-[100%]  "
          style={{
            height: "calc(100% - 80px)",
          }}
        >
          <RenderComponent jsonToRender={component} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
