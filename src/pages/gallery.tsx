import React from "react";
import Layout from "@theme/Layout";
import GalleryComponent from "../components/gallery/gallery";

export default function GalleryPage(): React.JSX.Element {
  return (
    <Layout title="Gallery">
      <div
        className="hero hero--primary"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <h1>The Monument Valley</h1>
          <p>
            Here you can find people and things around me that I think are worth
            remembering. Since I never take selfies, the photos that include me
            are all taken by others. Click on thumbnails below to view
            high-resolution images and their descriptions.The order of the
            images is random and will be rearranged every time you refresh the
            page.
          </p>
        </div>
      </div>
      <GalleryComponent />
      <div
        className="hero"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <p>
            Note that these photos are either used with permission from the
            photographer or were taken by me. Since I never take selfies, the
            photos that include me are all taken by others.
          </p>
        </div>
      </div>
    </Layout>
  );
}
