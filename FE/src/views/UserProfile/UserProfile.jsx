import React from "react";
import { decode } from "string-encode-decode";
import "./userProfile-styles.scss";

const UserProfile = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("user_info"));
  if (
    !userInfo ||
    (Object.keys(userInfo) && Object.keys(userInfo).length < 0)
  ) {
    return (
      <div className="userProfile-error">
        <span>There was an error while fetching your information.</span>
        <span> Please try again later....</span>
      </div>
    );
  }
  return (
    <div className="userProfile-container">
      <div className="userProfile-title">
        <span>My Account</span>
      </div>
      <div className="userProfile-account-container">
        <div className="userProfile-account">
          <span className="userProfile-userAttribute">First Name:</span>
          <span className="userProfile-userInfo">
            {decode(userInfo.firstname)}
          </span>
        </div>
        <div className="userProfile-account">
          <span className="userProfile-userAttribute">Last Name:</span>
          <span className="userProfile-userInfo">
            {decode(userInfo.lastname)}
          </span>
        </div>
        <div className="userProfile-account">
          <span className="userProfile-userAttribute">Email:</span>
          <span className="userProfile-userInfo">{decode(userInfo.email)}</span>
        </div>
        <div className="userProfile-account">
          <span className="userProfile-userAttribute">Scopus ID:</span>
          <span className="userProfile-userInfo">
            {decode(userInfo.scopus_id) || "-"}
          </span>
        </div>
        <div className="userProfile-account">
          <span className="userProfile-userAttribute">ORCID:</span>
          <span className="userProfile-userInfo">
            {decode(userInfo.orc_id) || "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
