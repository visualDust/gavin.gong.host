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
            remembering. These photos are either authorized by me or taken by
            me. Since I never take selfies, the photos that include me are all
            taken by others.
          </p>
        </div>
      </div>
      <GalleryComponent />
    </Layout>
  );
}
