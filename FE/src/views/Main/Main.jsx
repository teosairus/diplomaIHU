import React from "react";
import { useNavigate } from "react-router-dom";
import { decode } from "string-encode-decode";
import Divider from "@mui/material/Divider";
// import React, { useState } from "react";

import "./main-styles.scss";

const Main = () => {
  const firstname = decode(
    JSON.parse(sessionStorage.getItem("user_info")).firstname
  );
  const lastname = decode(
    JSON.parse(sessionStorage.getItem("user_info")).lastname
  );
  const navigate = useNavigate();

  return (
    <main className="main-container">
      <div className="main-welcome">
        <span>{`Welcome ${firstname} ${lastname}!`}</span>
      </div>
      <div className="main-welcome-message-container">
        <span className="main-welcome-message">
          Internation Hellenic University is offering My publications, so all
          the academic personnel to be able to gather in a semi-automatic way
          all of their publications.
        </span>
        <span className="main-welcome-message">
          This apps works with an SSO provided by IHU, so all the information
          that you have entered in your IHU profile pages are fetched. If among
          these information, your Scopus ID and/or your OrcID are found, then
          this app is gathering all your publications from these sources and
          list them out, in My Publications section.
        </span>
        <span className="main-welcome-message">
          In this app, you are able to hide the publications that you don't want
          to be visible and also unhide them if you change your mind. You cannot
          change your publication information and profile information through
          this app.
        </span>
        <span className="main-welcome-message">
          Your publications depend on Scopus and OrcID webpages so if you want
          to apply changes you have to make them through these webpages and then
          your publications will automatically be updated also in this app. Your
          profile information depend on the information added in your IHU
          profile page.
        </span>
      </div>
      <div className="main-actionTiles">
        <div className="main-actionTitle">
          <span>Action Tiles</span>
        </div>
        <Divider />
        <div className="main-tiles-container">
          <div className="main-tile">
            <div className="main-tile-info">
              <span className="main-tile-title">My Publications</span>
              <span className="main-tile-description">
                Here you can find everything about your publications.
              </span>
            </div>
            <div className="main-tile-button-container">
              <button
                type="button"
                className="main-tile-button"
                onClick={() => navigate("/publications")}
              >
                Go
              </button>
            </div>
          </div>
          <div className="main-tile">
            <div className="main-tile-info">
              <span className="main-tile-title">My Account</span>
              <span className="main-tile-description">
                Here you can find everything about your account.
              </span>
            </div>
            <div className="main-tile-button-container">
              <button
                type="button"
                className="main-tile-button"
                onClick={() => navigate("/account")}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
