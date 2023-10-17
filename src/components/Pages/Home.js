import React, { useEffect } from "react";

import { Card } from "react-bootstrap";
import { HOME_SCREEN } from "../../ScreenJson";
import RenderComponent from "../customComponents/ComponentRenderer";
import { ADMIN_DASHBOARD_LOGIN, POST } from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../redux/utils/apiActions";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { selectApiStatus } from "../../redux/utils/selectors";

export default function Home() {
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginStatus) {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      if (email && password) {
        try {
          const options = {
            url: API_ENDPOINTS[ADMIN_DASHBOARD_LOGIN],
            method: POST,
            headers: { "Content-Type": "application/json" },
            data: {
              email: email,
              password: password,
            },
          };
          dispatch(callApi(options));
          navigate("/sales/open");
        } catch (error) {}
      } else {
        navigate("/login");
      }
    } else {
    }
  });

  return <>{/* <MenupState MenuItems={MENU_ITEMS} /> */}</>;
}
