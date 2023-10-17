import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function PanelHeader({ component }) {
  const {
    mainHeading,
    panelTitle,
    panelTitles,
    classes,
    mainHeaderClass,
    detailsClass,
    detailsChildClass,
    panelTitleClass,
  } = component;
  const userProfile = useSelector((state) => state.profile);

  const getTitle = () => {
    return panelTitle ? panelTitle : panelTitles[userProfile.role];
  };

  return (
    <Container classes={classes} style={{ width: "100%", textAlign: "center" }}>
      <h1 className={mainHeaderClass}>{mainHeading}</h1>
      <div className={detailsClass}>
        <span className={detailsChildClass}>{userProfile.companyName}</span>
        <span className={detailsChildClass}>{userProfile.name}</span>
      </div>
      <h2 className={panelTitleClass}>{getTitle()}</h2>
    </Container>
  );
}
