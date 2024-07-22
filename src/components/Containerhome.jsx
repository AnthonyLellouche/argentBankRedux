import React from "react";
import "../styles/components/containerhome.scss";

import info from "../info.json";

const Containerhome = () => {
  return (
    <div className="container">
      {info.card.map((item) => (
        <div key={item.id} className="container-item">
          <div className="container-font">
            <img src={item.icon} alt="icon" />
          </div>
          <div className="container-text">
            <div className="title">{item.title}</div>
            <div className="subtitle">{item.paragraph}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Containerhome;
