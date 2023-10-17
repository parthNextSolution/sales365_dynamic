import axios from "axios";
import React, { useEffect, useState } from "react";

const ApiText = ({ component }) => {
  const [check, setCheck] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    if (!check) {
      if (component.form === "api-text") {
        axios.get(component.api).then((e) => {
          console.log(e.data.text);
          setText(e.data.text);
        });
      }

      setCheck(true);
    }
  });
  return (
    <>
      {component.form === "normal-text" && (
        <span className={component.className}>{component.text}</span>
      )}
      {component.type === "api-text" && (
        <span className={component.className}>{text}</span>
      )}
    </>
  );
};

export default ApiText;
