import React from "react";
import { decode } from "string-encode-decode";
// import React, { useState } from "react";

import "./main-styles.scss";

const Main = () => {
  const firstname = decode(
    JSON.parse(sessionStorage.getItem("user_info")).firstname
  );
  const lastname = decode(
    JSON.parse(sessionStorage.getItem("user_info")).lastname
  );

  return (
    <main className="main-container">
      <div className="main-welcome">
        <span>{`Welcome ${firstname} ${lastname}!`}</span>
      </div>
    </main>
  );
};

export default Main;
