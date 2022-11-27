import React from "react";
import { CSVLink } from "react-csv";
import LinkIcon from "@mui/icons-material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

import "./publicationList-styles.scss";

const Publications = (props) => {
  const { setOpenHiddenDialog, publications, pubVisible } = props;

  if (publications === null || (publications && publications.length === 0)) {
    return (
      <div className="publicationList-error">
        {`There are no ${
          pubVisible ? " " : "hidden "
        }publications, at the moment.`}
      </div>
    );
  }

  return (
    <div className="publicationList-container">
      <CSVLink
        data={publications}
        filename={pubVisible ? "publications.csv" : "hidden-publications.csv"}
        className="publicationList-download"
        target="_blank"
      >
        Export as CSV
      </CSVLink>
      {publications &&
        publications.length > 0 &&
        publications.map((item, index) => {
          return (
            <Grid
              container
              key={item.title}
              className="publicationList-itemContainer"
            >
              <Grid item xs={1} className="publicationList-itemLinkContainer">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="publicationList-itemLink"
                  >
                    <LinkIcon />
                  </a>
                )}
                {item.doi && (
                  <a
                    href={`https://www.doi.org/${item.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="publicationList-itemLink"
                  >
                    <LinkIcon />
                  </a>
                )}
              </Grid>
              <Grid
                item
                xs={4}
                className="publicationList-itemMainInfoContainer"
              >
                <div className="publicationList-itemTitle">{item.title}</div>
                <div className="publicationList-itemAuthors">
                  {item.authors}
                </div>
              </Grid>
              <Grid
                item
                xs={6.5}
                className="publicationList-itemPublicationContainer"
              >
                <div className="publicationList-itemPubContainer">
                  <div className="publicationList-itemPubDate">
                    {item.publishedDate
                      ? `${
                          item.publishedDate &&
                          item.publishedDate.substring(0, 4)
                        },`
                      : ""}
                  </div>
                  <div className="publicationList-itemPubName">
                    {`${item.publicationName},`}
                  </div>
                </div>
                <div className="publicationList-itemPubContainer">
                  <div className="publicationList-itemPubType">
                    {`${item.publicationType},`}
                  </div>
                  <div className="publicationList-itemPubRange">
                    {item.pageRange &&
                      `Page Range: ${item.pageRange.replaceAll("--", "-")}`}
                  </div>
                  <div className="publicationList-itemPubVolume">
                    {item.volume && `Volume: ${item.volume}`}
                  </div>
                </div>
              </Grid>
              <Grid item xs={0.5} className="publicationList-deleteContainer">
                <button
                  type="button"
                  className="publicationList-deleteButton"
                  onClick={(e) => {
                    setOpenHiddenDialog([
                      true,
                      publications[index].id,
                      pubVisible ? "hide" : "unhide",
                    ]);
                  }}
                >
                  {pubVisible ? <DeleteIcon /> : <VisibilityIcon />}
                </button>
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
};

export default Publications;
