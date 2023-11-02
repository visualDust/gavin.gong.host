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
        <h1>The Monument Valley</h1>
        <p>text here text here text here text here </p>
      </div>
      <GalleryComponent />
    </Layout>
  );
}
