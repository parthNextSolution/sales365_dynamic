import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { EMAIL, GET_MASTER_DATA_ON_HOME, TEXT } from "./Const";
import { useSelector } from "react-redux";
import { selectMasterData } from "../../redux/utils/selectors";
import _ from "lodash";
import { useImperativeHandle } from "react";
import { isValueEmpty } from "./reusableMethods";
import EmailOtp from "../customComponents/EmailOtp";
import PhoneOtp from "../customComponents/PhoneOtp";

const FormBuilder = forwardRef(({ fields, propsFormData }, ref) => {
  const [formData, setFormData] = useState(propsFormData || {});
  const [fieldErrors, setFieldErrors] = useState({});

  const masterData = useSelector((state) =>
    selectMasterData(state, GET_MASTER_DATA_ON_HOME || "")
  );

  const validateAllFields = () => {
    let errors = {};

    fields.forEach((field) => {
      const value = formData[field.name];
      console.log(value)
      if (field.isRequired && isValueEmpty(value)) {
        errors[field.name] =
          field.requiredErrorMessage || "This field is required.";
      } else if (field.regex && !field.regex.test(value)) {
        errors[field.name] = field.regexErrorMessage || "Invalid input.";
      }
    });

    setFieldErrors(errors);
    return errors;
  };

  const finalizeData = () => {
    const errors = validateAllFields();
    console.log(formData);
    if (isValueEmpty(errors)) {
      return formData;
    } else {
      console.error(
        "There are errors in the form. Please correct them before saving."
      );
      return null;
    }
  };

  // Expose the finalizeData function to the parent using a ref
  useImperativeHandle(ref, () => finalizeData);

  const handleChange = (field, value) => {
    const errors = { ...fieldErrors };
    console.log(field, value);
    if (field.isRequired && isValueEmpty(value)) {
      console.log("inside 3 this ");
      errors[field.name] =
        field.requiredErrorMessage || "This field is required.";
    } else if (field.regex && !field.regex.test(value)) {
      console.log("inside 2 this");
      errors[field.name] =
        field.regexErrorMessage || "Regex is not correct in this field";
    } else {
      console.log("inside 1 this");
      delete errors[field.name];
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field.name]: value,
    }));
    setFieldErrors(errors);
    console.log(formData, errors);
  };

  const handleCurrencyChange = (field, existingTotal) => (e, unitType) => {
    let updatedValue = parseInt(e.target.value) || 0;

    if (unitType === "crore") {
      updatedValue = (existingTotal % 10000000) + updatedValue * 10000000;
    } else if (unitType === "lakh") {
      updatedValue =
        Math.floor(existingTotal / 10000000) * 10000000 + updatedValue * 100000;
    }

    handleChange(field, updatedValue);
  };

  return (
    <form className="addbtn">
      <div className="formcontainer">
        {fields.map((field) => (
          <div key={field.name} className={`subform ${field.parentclassName}`}>
            <div className="lablediv">
              <label className="lbel" htmlFor={field.name}>
                {field.label}
              </label>
            </div>

            <div className="inputdiv">
              {/* ... (Other input types can be added similarly) */}
              {field.type === TEXT && (
                <input
                  className="inputtag"
                  type={TEXT}
                  disabled={field.disabled}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {field.type === EMAIL && (
                <input
                  className="inputtag"
                  type={EMAIL}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {field.type === "phoneOtp" && (
                <PhoneOtp
                  Phone={formData["phoneNumber"] || ""}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field, e)}
                />
              )}
              {field.type === "emailOtp" && (
                <EmailOtp
                  email={formData["email"] || ""}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field, e)}
                />
              )}
              {field.type === "password" && (
                <input
                  className="inputtag"
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || formData[field.dataKey] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  className="inputtag"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || formData[field.dataKey] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}
              {field.type === "select" && (
                <Select
                  className="inputtag"
                  id={field.name}
                  name={field.name}
                  value={
                    (formData[field.name] &&
                      (typeof formData[field.name] === "string"
                        ? {
                            label: formData[field.name],
                            value: formData[field.name],
                          }
                        : formData[field.name])) ||
                    field.defaultOption
                  }
                  options={field.options || masterData[field.name]}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: "auto",
                      display: "flex",
                      alignItems: "center",
                      border: state.isFocused ? baseStyles.border : "gray",
                      borderBottom: "1px solid #ccc",
                      borderRadius: state.isFocused
                        ? baseStyles.borderRadius
                        : "",
                      textAlign: "center",
                    }),
                  }}
                  onChange={(selectedOption) => {
                    handleChange(field, selectedOption || null);
                  }}
                  closeMenuOnSelect={!field.isMulti}
                  required={field.isRequired}
                  isMulti={field.isMulti}
                />
              )}
              {field.type === "radio" && (
                <div className="radio-button-styling">
                  {field.options.map((option) => (
                    <label key={option.value}>
                      <input
                        className="inputtag"
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={
                          (formData[field.name] &&
                            formData[field.name] === option.value) ||
                          formData[field.dataKey] === option.value
                        }
                        onChange={() => handleChange(field, option.value)}
                        required={field.isRequired}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
              {field.type === "file" && (
                <input
                  type="file"
                  name={field.name}
                  multiple
                  onChange={(e) => handleChange(field, e.target.files)}
                  accept={field?.acceptedFileTypes}
                />
              )}
              {field.type === "price" && (
                <div className={field.className}>
                  {console.log(field.name)}
                  <input
                    className="inputtag"
                    type="text"
                    disabled={field.disabled}
                    id={`${field.name}-crore`}
                    name={`${field.name}-crore`}
                    value={Math.floor((formData[field.name] || 0) / 10000000)}
                    onChange={(e) =>
                      handleCurrencyChange(field, formData[field.name] || 0)(
                        e,
                        "crore"
                      )
                    }
                    required={field.isRequired}
                  />
                  <label>Cr</label>
                  <input
                    className="inputtag"
                    type="text"
                    disabled={field.disabled}
                    id={`${field.name}-lakh`}
                    name={`${field.name}-lakh`}
                    value={((formData[field.name] || 0) % 10000000) / 100000}
                    onChange={(e) =>
                      handleCurrencyChange(field, formData[field.name] || 0)(
                        e,
                        "lakh"
                      )
                    }
                    required={field.isRequired}
                  />
                  <label>Lakh</label>
                </div>
              )}
              {field.type === "size" && (
                <div className={field.className}>
                  <input
                    className="inputtag"
                    type={TEXT}
                    disabled={field.disabled}
                    id={field.name}
                    name={field.name}
                    value={
                      formData[field.name] || formData[field.dataKey] || ""
                    }
                    onChange={(e) => {
                      handleChange(field, e.target.value);
                    }}
                    required={field.isRequired}
                  />
                  <Select
                    className="inputtag"
                    id={field.nameType}
                    name={field.nameType}
                    value={
                      (formData[field.nameType] &&
                        (typeof formData[field.nameType] === "string"
                          ? {
                              label: formData[field.nameType],
                              value: formData[field.nameType],
                            }
                          : formData[field.nameType])) ||
                      field.defaultOption
                    }
                    options={field.options || masterData[field.name]}
                    onChange={(selectedOption) =>
                      handleChange(
                        { ...field, name: field.nameType },
                        selectedOption || null
                      )
                    }
                    required={field.isRequired}
                  />
                </div>
              )}
              {fieldErrors[field.name] && <p>{fieldErrors[field.name]}</p>}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
});

FormBuilder.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        TEXT,
        EMAIL,
        "password",
        "textarea",
        "select",
        "radio",
        "file",
      ]).isRequired,
      isRequired: PropTypes.bool.isRequired,
      regex: PropTypes.instanceOf(RegExp),
      regexErrorMessage: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onFormDataChange: PropTypes.func.isRequired,
};

export default FormBuilder;
