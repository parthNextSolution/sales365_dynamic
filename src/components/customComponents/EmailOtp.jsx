import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SnackBar from "./SnackBar";

const EmailOtp = ({ value, onChange, email }) => {
  const [val, setVal] = useState("");
  const [check, setCheck] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const sendOtp = () => {
    axios
      .post(
        "https://builder-floor-backend-n2ib.onrender.com/api/users/sendOtp",
        { email: email }
      )
      .then((e) => {
        console.log(e);
        setOtpSent(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const snackbarClose = (status) => {
    setSnackbar({
      ...snackbar,
      open: false,
      message: "",
    });
    // if status is 0, then refresh
    if (status === 0) {
    }
  };

  const verifyEmail = () => {
    axios
      .post(
        "https://builder-floor-backend-n2ib.onrender.com/api/users/verifyEmailOtp",
        { email: email, otp: val }
      )
      .then((e) => {
        console.log(e);
        if (e.data.success) {
          setVerified(true);
          onChange("true");
        } else {
          setSnackbar({
            open: true,
            message: "Email Otp is InValid",
            status: -1,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setSnackbar({
          open: true,
          message: "Email Otp is InValid",
          status: -1,
        });
      });
  };

  useEffect(() => {
    if (!check) {
      onChange("false");
      setCheck(true);
    }
  });
  return (
    <>
      {verified ? (
        <>
          <p>Email is verified</p>
        </>
      ) : (
        <>
          <input
            className="inputtag"
            placeholder="Enter your otp"
            type="text"
            disabled={!otpSent}
            style={{
              opacity: otpSent ? 1 : 0.3,
            }}
            name=""
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
            id=""
          />
          <div
            style={{
              width: "100px",
              height: "32px",
              marginLeft: "10px",
              backgroundColor: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "3px",
              fontSize: "12px",
              color: "#fff",
              fontWeight: "medium",
              cursor: "pointer",
            }}
            onClick={() => {
              if (!otpSent) {
                sendOtp();
              } else {
                verifyEmail();
              }
            }}
          >
            {otpSent ? "Verify" : "Send"}
          </div>
          <SnackBar
            open={snackbar?.open}
            message={snackbar?.message}
            onClose={snackbarClose}
          />
        </>
      )}
    </>
  );
};

export default EmailOtp;
