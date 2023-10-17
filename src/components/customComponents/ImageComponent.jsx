import React from "react";

const ImageComponent = ({ component }) => {
  return <img src={component.src} className={component.className} alt="" />;
};

export default ImageComponent;
