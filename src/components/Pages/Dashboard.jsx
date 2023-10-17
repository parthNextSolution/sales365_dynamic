import React from "react";
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer";
import { DASHBOARD, SALES_OPEN, SEARCH_RESULT } from "../../ScreenJson";
const SalesOpen = () => {
  return <RenderComponent jsonToRender={DASHBOARD} />;
};

export default SalesOpen;
