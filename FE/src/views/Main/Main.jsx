import React from "react";
// import React, { useState } from "react";

import "./main-styles.scss";

const Main = (props) => {
  const { userInfo } = props;

  return (
    <main className="main-container">
      <div className="main-welcome">
        <span>{`Welcome ${userInfo.firstname} ${userInfo.lastname}!`}</span>
      </div>
    </main>
  );
};

export default Main;
