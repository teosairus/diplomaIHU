import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import getToken from "../../httpRequests/getToken";

import "./loginLoading-styles.scss";

const LoginLoading = (props) => {
  const { clientID, token, setToken, setIsLogged, setUserInfo } = props;
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      if (location.search.includes("code")) {
        const tempCode = location.search.match(/([\d]+)/g);

        getToken(tempCode[0], clientID).then((res) => {
          console.log("TOKEN RES", res);
          if (res.status === 200) {
            setToken(res.data.access_token);
            const tempUserInfo = {
              ...res.data.user_info,
              firstname:
                res.data.user_info.firstname.charAt(0).toUpperCase() +
                res.data.user_info.firstname.slice(1).toLowerCase(),
              lastname:
                res.data.user_info.lastname.charAt(0).toUpperCase() +
                res.data.user_info.lastname.slice(1).toLowerCase(),
            };
            setUserInfo({ ...tempUserInfo });
            setIsLogged(true);
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
