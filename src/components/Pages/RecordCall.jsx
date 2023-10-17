import React from "react";
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer";
import { RECORD_CALL, SALES_OPEN, SEARCH_RESULT } from "../../ScreenJson";
const SalesOpen = () => {
  return <RenderComponent jsonToRender={RECORD_CALL} />;
};

export default SalesOpen;
