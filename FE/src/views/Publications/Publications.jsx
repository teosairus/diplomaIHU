import React from "react";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import "./publications-styles.scss";

const Publications = (props) => {
  const { publications, setOpenDeleteDialog } = props;

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
            // console.log("item", item);
            return (
              <div key={item.title} className="publications-itemContainer">
                <div className="publications-itemTitle">
                  <span>{item.title}</span>
                  <button
                    type="button"
                    className="publications-deleteButton"
                    onClick={() => {
                      setOpenDeleteDialog([true, index]);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <div className="publications-itemAuthors">{item.authors}</div>

                <div className="publications-detailsContainer">
                  <div className="publications-detailsTitle">
                    Publication Details:
                  </div>
                  <div className="publications-details">
                    <span className="publications-detailsPubTitle">
                      {item.publicationName}
                    </span>
                    <div className="publications-tiles">
                      <div className="publications-tilesDate">
                        <span className="publications-tilesTitle">
                          Published Date
                        </span>

                        <span>{item.publishedDate || "-"}</span>
                      </div>
                      <div className="publications-tilesPubType">
                        <span className="publications-tilesTitle">
                          Publication Type
                        </span>

                        <span>{item.publicationType || "-"}</span>
                      </div>

                      <div className="publications-tilesPageRange">
                        <span className="publications-tilesTitle">
                          Page Range
                        </span>

                        <span>{item.pageRange || "-"}</span>
                      </div>
                      <div className="publications-tilesVolume">
                        <span className="publications-tilesTitle">Volume</span>

                        <span>{item.volume || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="publications-actionContainer">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="publications-actionButton"
                    >
                      Check Publication
                    </a>
                  )}
                  {item.doi && (
                    <a
                      href={`https://www.doi.org/${item.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="publications-actionButton"
                    >
                      Check DOI
                    </a>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Publications;
