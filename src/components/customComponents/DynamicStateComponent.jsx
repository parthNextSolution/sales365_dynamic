import React, { useState } from "react";
import RenderComponent from "./ComponentRenderer";

const DyanamicStateRoute = ({ component }) => {
  const [curr, setCurr] = useState(0);
  return (
    <>
      <div className={component.parentClass}>
        {component.states.map((item, i) => {
          return (
            <div
              style={{
                backgroundColor: curr == i ? "#fea8a1" : "#fff",
              }}
              onClick={() => {
                setCurr(i);
              }}
              key={i}
              className={component.childClass}
            >
              {item}
            </div>
          );
        })}
      </div>
      <RenderComponent
        jsonToRender={{ children:[ component.children[curr]] }}
      />
    </>
  );
};

export default DyanamicStateRoute;
