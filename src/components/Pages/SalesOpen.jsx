import React from "react";
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer";
import { SALES_OPEN, SEARCH_RESULT } from "../../ScreenJson";
const SalesOpen = () => {
  return <RenderComponent jsonToRender={SALES_OPEN} />;
};

export default SalesOpen;
