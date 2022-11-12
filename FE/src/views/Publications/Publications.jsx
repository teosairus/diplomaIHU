import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import ReactLoading from "react-loading";
import showUser from "../../httpRequests/showUser";

import "./publications-styles.scss";

const Publications = (props) => {
  const { token, setOpenDeleteDialog } = props;
  const [publications, setPublications] = useState(null);

  useEffect(() => {
    if (token !== null) {
      showUser(token).then((res) => {
        console.log("userInfo", res);
        if (res.status === 200) {
          setPublications(res.data.userPapers);
        }
      });
    }
  }, []);

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

  if (publications !== null && publications && publications.length > 0) {
    return (
      <div className="publications-error">
        There are no publications added for you, at the moment.
      </div>
    );
  }

  return (
    <div className="publications-container">
      <div className="publications-pageTitle">
        <span>Οι Δημοσιεύσεις μου</span>
      </div>
      <Divider />
      <div className="publications-listContainer">
        {publications &&
          publications.length > 0 &&
          publications.map((item, index) => {
            console.log("item", item);
            return (
              <Grid
                container
                key={item.title}
                className="publications-itemContainer"
              >
                <Grid item xs={1} className="publications-itemLinkContainer">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="publications-itemLink"
                    >
                      <LinkIcon />
                    </a>
                  )}
                  {item.doi && (
                    <a
                      href={`https://www.doi.org/${item.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="publications-itemLink"
                    >
                      <LinkIcon />
                    </a>
                  )}
                </Grid>
                <Grid
                  item
                  xs={4}
                  className="publications-itemMainInfoContainer"
                >
                  <div className="publications-itemTitle">{item.title}</div>
                  <div className="publications-itemAuthors">{item.authors}</div>
                </Grid>
                <Grid
                  item
                  xs={6.5}
                  className="publications-itemPublicationContainer"
                >
                  <div className="publications-itemPubContainer">
                    <div className="publications-itemPubDate">
                      {item.publishedDate
                        ? `${
                            item.publishedDate &&
                            item.publishedDate.substring(0, 4)
                          },`
                        : ""}
                    </div>
                    <div className="publications-itemPubName">
                      {`${item.publicationName},`}
                    </div>
                  </div>
                  <div className="publications-itemPubContainer">
                    <div className="publications-itemPubType">
                      {`${item.publicationType},`}
                    </div>
                    <div className="publications-itemPubRange">
                      {item.pageRange &&
                        `Page Range: ${item.pageRange.replaceAll("--", "-")}`}
                    </div>
                    <div className="publications-itemPubVolume">
                      {item.volume && `Volume: ${item.volume}`}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={0.5} className="publications-deleteContainer">
                  <button
                    type="button"
                    className="publications-deleteButton"
                    onClick={() => {
                      setOpenDeleteDialog([true, index]);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </Grid>
              </Grid>
            );
          })}
      </div>
    </div>
  );
};

export default Publications;
