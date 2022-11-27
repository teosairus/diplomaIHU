import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { encode, decode } from "string-encode-decode";
import ReactLoading from "react-loading";
import getToken from "../../httpRequests/getToken";

import "./loginLoading-styles.scss";

const LoginLoading = (props) => {
  const { clientID } = props;
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = decode(sessionStorage.getItem("tkn"));

  useEffect(() => {
    if (token.length === 0) {
      if (location.search.includes("code")) {
        const tempCode = location.search.match(/([\d]+)/g);

        getToken(tempCode[0], clientID).then((res) => {
          console.log("TOKEN RES", res);
          if (res.status === 200) {
            sessionStorage.setItem("tkn", encode(res.data.access_token));
            const tempUserInfo = {
              firstname: encode(
                res.data.user_info.firstname.charAt(0).toUpperCase() +
                  res.data.user_info.firstname.slice(1).toLowerCase()
              ),
              lastname: encode(
                res.data.user_info.lastname.charAt(0).toUpperCase() +
                  res.data.user_info.lastname.slice(1).toLowerCase()
              ),
              uid: encode(res.data.user_info.uid),
              email: encode(res.data.user_info.email),
              orc_id: encode(res.data.user_info.orc_id),
              scopus_id: encode(res.data.user_info.scopus_id),
            };
            sessionStorage.setItem(
              "user_info",
              JSON.stringify({ ...tempUserInfo })
            );
            navigate("/home");
          } else {
            setIsError(true);
          }
        });
      } else {
        setIsError(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="loginLoading-container">
      {isError ? (
        <div className="loginLoading-error">
          <span>There was an error while you were trying to login.</span>
          <span>Please try again later...</span>
          <Link className="loginLoading-button" to="/">
            Go back
          </Link>
        </div>
      ) : (
        <ReactLoading
          type="bubbles"
          color={"#ffffff"}
          height={"200px"}
          width={"200px"}
        />
      )}
    </div>
  );
};

export default LoginLoading;
