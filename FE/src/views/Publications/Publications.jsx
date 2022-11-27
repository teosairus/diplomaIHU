import React, { useState, useEffect } from "react";
import { decode } from "string-encode-decode";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReactLoading from "react-loading";
import PublicationList from "../../widgets/PublicationList";
import showUser from "../../httpRequests/showUser";

import "./publications-styles.scss";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="publications-tabpanel"
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

const Publications = (props) => {
  const {
    setOpenHiddenDialog,
    publications,
    setPublications,
    setOpenSnackBar,
    setSnackBarMessage,
  } = props;
  const [tab, setTab] = useState(0);
  const [visiblePub, setVisiblePub] = useState(
    publications && publications.length > 0
      ? publications.filter((item) => item.hidden === false)
      : []
  );
  const [hiddenPub, setHiddenPub] = useState(
    publications && publications.length > 0
      ? publications.filter((item) => item.hidden === true)
      : []
  );
  const token = decode(sessionStorage.getItem("tkn"));
  const uid = decode(JSON.parse(sessionStorage.getItem("user_info")).uid);

  useEffect(() => {
    if (
      token.length > 0 &&
      (publications === null || (publications && publications.length === 0))
    ) {
      showUser(token, uid)
        .then((res) => {
          console.log("userInfo", res);
          if (res.status === 200) {
            setPublications(res.data.userPapers);
          } else {
            setOpenSnackBar(true);
            setSnackBarMessage({
              type: "error",
              message:
                "There was an error while fetching your publications. Please try again in a while...",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
          setOpenSnackBar(true);
          setSnackBarMessage({
            type: "error",
            message:
              "There was an error while fetching your publications. Please try again in a while...",
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (publications && publications.length > 0) {
      const visible = publications.filter((item) => item.hidden === false);
      const hidden = publications.filter((item) => item.hidden === true);
      setVisiblePub([...visible]);
      setHiddenPub([...hidden]);
    } else {
      setVisiblePub([]);
      setHiddenPub([]);
    }
  }, [publications]);

  if (publications === null) {
    return (
      <div className="publications-loading">
        <ReactLoading
          type="bubbles"
          color={"#009688"}
          height={"200px"}
          width={"200px"}
        />
      </div>
    );
  }

  if (publications !== null && publications && publications.length === 0) {
    return (
      <div className="publications-error">
        There are no publications added for you, at the moment.
      </div>
    );
  }

  return (
    <div className="publications-container">
      <div className="publications-pageTitle">
        <span>My publications</span>
      </div>
      <Divider />
      <div className="publications-listContainer">
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
          }}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Publications" {...a11yProps(0)} />
          <Tab label="Hidden" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <PublicationList
            publications={visiblePub}
            pubVisible
            setOpenHiddenDialog={setOpenHiddenDialog}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <PublicationList
            publications={hiddenPub}
            setOpenHiddenDialog={setOpenHiddenDialog}
          />
        </TabPanel>
      </div>
    </div>
  );
};

export default Publications;
