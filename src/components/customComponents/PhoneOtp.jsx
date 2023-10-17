import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import SnackBar from "./SnackBar";

const PhoneOtp = ({ value, onChange, Phone }) => {
  const [val, setVal] = useState("");
  const [check, setCheck] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [snackbar, setSnackbar] = useState({});
  const sendOtp = () => {};
  console.log(Phone);

  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    const phone = "+91" + Phone;
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("success");
        setOtpSent(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOtp = (event) => {
    if (val.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      console.log(confirmationResult);
      confirmationResult
        .confirm(val)
        .then((result) => {
          // User signed in successfully.
          // ...
          setVerified(true);
          onChange("true");
         
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setSnackbar({
            open: true,
            message: "Phone Otp is InValid",
            status: -1,
          });
        });
    }
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

  useEffect(() => {
    if (!check) {
      onChange("false");
      setCheck(true);
    }
  });

  return (
    <>
      {!verified && (
        <>
          <div id="recaptcha"></div>
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
            onClick={(e) => {
              if (!otpSent) {
                handleSend(e);
              } else {
                verifyOtp();
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
      {verified && (
        <>
          <p>Phone Number is verified</p>
        </>
      )}
    </>
  );
};

export default PhoneOtp;
