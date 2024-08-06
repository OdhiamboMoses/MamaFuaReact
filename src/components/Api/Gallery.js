import React, { useState, useEffect } from "react";
import { apiKey } from "./Api.js";
import "./Gallery.css";
import Navbar from "../Navbar.js";

function Gallery() {
  const [galleryResults, setGallery] = useState([]);
  const searchKey = "cleaning";
  useEffect(() => {
    async function fetchData() {
      const headers = {
        Authorization: apiKey,
      };
      const apiResponse = await fetch(
        "https://api.pexels.com/v1/search?query=" + searchKey,
        { headers }
      );
      const apiResponseJSON = await apiResponse.json();
      const photos = apiResponseJSON.photos;
      console.log(photos);
      setGallery([...photos]);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Gallery</h1>
      <div className="display-gr">
        {galleryResults.map((post) => {
          return (
            <div className="container">
              <li key={post.id} className="display-res">
                <div>
                  <div>{post.photographer}</div>
                  <div>{post.alt}</div>
                  <div>
                    <img src={post.src.landscape} />
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Gallery;
