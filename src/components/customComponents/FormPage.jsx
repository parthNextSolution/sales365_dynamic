import React, { useRef, useEffect, useState } from "react";
import FormBuilder from "../utils/FormBuilder";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_DASHBOARD_LOGIN,
  BF_ADMIN,
  NEED_APPROVAL_BY,
  POST,
  PROPERTY_DEALER,
  ROUTE_BUTTON,
} from "../utils/Const";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { callApi } from "../../redux/utils/apiActions";
import { filterAutofillData, sanitizeFormData } from "../utils/reusableMethods";
import CustomRouteButton from "./RouteButton";
import { USER_ROLE } from "../../ScreenJson";
import _ from "lodash";
import SnackBar from "../customComponents/SnackBar";
import { useNavigate } from "react-router-dom";
import { selectApiStatus } from "../../redux/utils/selectors";

const FormPage = () => {
  const finalizeRef = useRef(null);
  const [snackbar, setSnackbar] = useState({});
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);

  const snackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
    });
  };

  let phoneCheck = false
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleSave = async () => {
    if (!loading) {
      const formData = finalizeRef.current();
      if (formData) {
        try {
          let newFormData = new FormData();

          if (formData.hasOwnProperty("emailOtp")) {
            if (formData.emailOtp === "false") {
              setSnackbar({
                open: true,
                message: "Please Verify your Email!",
                status: -1,
              });
              return;
            }
          }

          if (formData.hasOwnProperty("phoneOtp")) {
            if (!phoneCheck) {
              if (formData.phoneOtp === "false") {
                setSnackbar({
                  open: true,
                  message: "Please Verify your Phone Number!",
                  status: -1,
                });
                return;
              }
            }
          }

          if (
            formData.hasOwnProperty("emailOtp") &&
            formData.hasOwnProperty("phoneOtp")
          ) {
            if (formData.emailOtp === "true") {
              delete formData.emailOtp;
            }
            if (formData.phoneOtp === "true") {
              delete formData.phoneOtp;
            }
          }

          const fileFields = [
            "thumbnailFile",
            "normalImageFile",
            "threeSixtyImages",
            "layoutFile",
            "VideoFile",
            "virtualFile",
          ];

          fileFields.forEach((field) => {
            if (formData[field]) {
              for (const file of formData[field]) {
                newFormData.append(field, file);
              }
            }
          });

          // Add additional fields to formData
          newFormData.append("parentId", userProfile._id);
          newFormData.append(
            "contactId",
            userProfile.role === USER_ROLE[PROPERTY_DEALER]
              ? userProfile.parentId
              : userProfile._id
          );
          newFormData.append(NEED_APPROVAL_BY, userProfile.parentId);

          function isObjectNotString(value) {
            return (
              typeof value === "object" &&
              !Array.isArray(value) &&
              value !== null
            );
          }

          function isFileList(value) {
            return value instanceof FileList;
          }

          Object.keys(formData).forEach((element) => {
            if (!isFileList(formData[element])) {
              if (isObjectNotString(formData[element])) {
                newFormData.append(
                  element,
                  JSON.stringify(formData[element].value)
                );
              } else {
                newFormData.append(element, formData[element]);
              }
            }
          });

          const imagesCheck = fileFields.some((field) => formData[field]);

          // Set the headers and data based on whether images/files are being uploaded
          let headers = imagesCheck
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" };

          let data = imagesCheck
            ? newFormData
            : sanitizeFormData({
              ...formData,
              parentId: userProfile._id,
              role:
                userProfile.role === USER_ROLE[BF_ADMIN]
                  ? USER_ROLE["channelPartner"]
                  : USER_ROLE["salesUser"],
            });

          const options = {
            url: API_ENDPOINTS[userProfile.formSaveApi],
            method: POST,
            headers: headers,
            data: data,
          };

          setLoading(true);
          dispatch(callApi(options)).then(() => {
            setLoading(false);
            router("/admin");
            setSnackbar({ open: true, message: `Saved.` });
          });
        } catch (error) {
          setLoading(false);
          setSnackbar({ open: true, message: `Save Failed.` });
          console.log("--- Save failed ---", error);
        }
      } else {
        setLoading(false);
        setSnackbar({ open: true, message: `Empty required field(s).` });
      }
    } else {
      setSnackbar({ open: true, message: `Saving Already.` });
    }
  };

  const navigate = useNavigate();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  // const userProfile1 = useSelector((state) =>
  //   selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  // );

  const [check, setCheck] = useState(false);
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
        } catch (error) { }
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } else {
      setCheck(true);
    }
  }, [loginStatus]);

  return (
    <>
      {check && (
        <>
          <div>
            <div className="formheadingcontainer">{userProfile.formName}</div>
            <FormBuilder
              ref={finalizeRef}
              fields={userProfile.formType}
              propsFormData={
                userProfile.autofill
                  ? filterAutofillData(userProfile.autofill, userProfile)
                  : {}
              }
            />
            <Button variant="primary" onClick={handleSave} disabled={loading}>{loading ? "Saving" : "Save"}</Button>
            <CustomRouteButton
              component={{
                type: ROUTE_BUTTON,
                className: "admin-route-button",
                label: "Go to Dashboard",
                name: "Go to Dashboard",
                route: "/admin",
              }}
            />
          </div>
          <SnackBar
            open={snackbar?.open}
            message={snackbar?.message}
            onClose={snackbarClose}
          />
          {loading === true ? <CircularProgress /> : null}
        </>
      )}
    </>
  );
};

export default FormPage;
