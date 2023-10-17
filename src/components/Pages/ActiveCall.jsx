import React from "react";
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer";
import { ACTIVE_CALL } from "../../ScreenJson";

const SalesOpen = () => {
  return <RenderComponent jsonToRender={ACTIVE_CALL} />;
};

export default SalesOpen;
