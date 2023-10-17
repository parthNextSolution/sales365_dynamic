import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../redux/utils/api";
import {
  ADMIN_DASHBOARD_LOGIN,
  EMAIL,
  LOADING,
  POST,
  SUCCESS,
} from "../utils/Const";
import { callApi } from "../../redux/utils/apiActions";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors";
import { storeUserData } from "../../redux/slice/userSlice";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div role="status">
        <svg
          className="animate-spin"
          aria-hidden="true"
          style={{ width: "18px", height: "18px", marginRight: "8px" }}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#cccccc00"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  const userProfile = useSelector((state) =>
    selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  );
  const [email, setEmail] = useState("admin@builderfloor.com");
  const [password, setPassword] = useState("123");

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      dispatch(storeUserData(userProfile?.profile));
      navigate("/sales/open");
    }
  }, [loginStatus]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
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
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      dispatch(callApi(options));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="sales-login-container">
      <div className="sales-login-container-2">
        <div className="sales-login-container-2-back">
          <img src="/assets/login/bg1.svg" className="login-cont-bg1" alt="" />
          <img src="/assets/login/bg2.svg" className="login-cont-bg2" alt="" />
        </div>
        <div className="sales-login-container-2-front">
          <div className="sales-login-container-2-front-inner-left">
            <img
              src="/assets/login/logo.svg"
              style={{
                width: "100%",
              }}
              alt=""
            />
          </div>
          <div className="sales-login-container-2-front-inner-right">
            <div className="form-sales-container">
              <h1 className="">Welcome back!</h1>
              <p className="">Login</p>
              <div className="input-container">
                <img src="/email.svg" alt="" />
                <input
                  className=""
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="input-container-pass">
                <img src="/lock.svg" alt="" />
                <input
                  className=""
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Password"
                />
              </div>
              <div className="sales-remember-me-container">
                <p
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Your Password?
                </p>
              </div>
              <div
                onClick={(e) => {
                  setLoading(true);

                  setTimeout(() => {
                    handleSubmit(e);
                  }, 500);
                }}
                className="sales-login-button"
              >
                {loading ? <Loader /> : "Sign Up"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sales-footer">
        <div className="sales-footer-inner">
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
        <div className="sales-footer-inner">
          <p>Help & Support</p>
          <p>©365 Sales 2023</p>
        </div>
      </div>
      {/* <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="lab-class">Email</label>

          <input
            type={EMAIL}
            value={email}
            name="email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="inpt"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {loginStatus === LOADING ? (
          <div className="loading-class">
            <CircularProgress />
          </div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form> */}
    </div>
  );
};

export default Login;
