import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import useIsMobile from "../../hooks/useIsMobile";

type BadgeItem = {
  imgUrls: string[];
  title: string;
  text: string;
  buttonLink?: string;
  buttonText?: string;
};

function BadgeDesktop({
  imgUrls,
  title,
  text,
  buttonLink,
  buttonText,
}: BadgeItem): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          textAlign: "left",
          paddingRight: "1%",
        }}
      >
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        {buttonLink ? (
          <div>
            <a href={buttonLink} className="button button--primary">
              {buttonText}
            </a>
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flex: "1",
          paddingLeft: "1%",
        }}
      >
        <Carousel
          showArrows={true}
          autoPlay={true}
          showIndicators={false}
          swipeable={false}
          infiniteLoop={true}
        >
          {imgUrls.map((src, idx) => (
            <img key={idx} style={{ objectFit: "fill" }} src={src} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

function BadgeMobile({
  imgUrls,
  title,
  text,
  buttonLink,
  buttonText,
}: BadgeItem): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: "var(--floating-card-background)",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <Carousel
          showArrows={true}
          autoPlay={true}
          showIndicators={false}
          swipeable={false}
          infiniteLoop={true}
        >
          {imgUrls.map((src, idx) => (
            <img
              key={idx}
              style={{ objectFit: "fill", borderRadius: "20px 20px 0 0" }}
              src={src}
            />
          ))}
        </Carousel>
        <h3
          style={{
            position: "absolute",
            left: "5%",
            top: "5%",
            width: "100%",
            textAlign: "left",
            textShadow: "var(--ifm-color-emphasis-0) 1px 0 10px",
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          backgroundColor: "var(--floating-card-background)",
          padding: "0 3% 3% 3%",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <p style={{ margin: "0" }}>{text}</p>
        {buttonLink ? (
          <div
            style={{
              right: "5%",
              bottom: "5%",
              textAlign: "center",
              overflow: "hidden",
              margin: "20px",
            }}
          >
            <a href={buttonLink} className="button button--primary">
              {buttonText}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const badgeItem: BadgeItem = {
  imgUrls: [
    "/img/projectBadgeImgs/neetbox-screenshot.png",
    "/img/projectBadgeImgs/neetbox-screenshot-2.png",
  ],
  title: "NEETBOX",
  text: "NEETBOX is a great tool for Logging/Debugging/Tracing/Managing/Facilitating long-running python code, especially for deep learning training. NEETBOX is a all-in-one python package consists of client, server and frontend. NEETBOX provides easy python APIs and launches a dashboard for monitoring all the connected projects.",
  buttonLink: "https://neetbox.550w.host",
  buttonText: "See the project",
};

function ProjectBadgeMobile(): JSX.Element {
  return (
    <div style={{ margin: "5%" }}>
      <h3 style={{ textAlign: "center" }}>Recently Maintaining</h3>
      <BadgeMobile {...badgeItem} />
    </div>
  );
}

function ProjectBadgeDesktop(): JSX.Element {
  return (
    <div style={{ maxWidth: "1000px", marginTop: "50px" }}>
      <h3 style={{ textAlign: "end" }}>Recently Maintaining</h3>
      <BadgeDesktop {...badgeItem} />
    </div>
  );
}

function CurrentlyMaintaining(): JSX.Element {
  const isTabletOrMobile = useIsMobile();
  return isTabletOrMobile ? ProjectBadgeMobile() : ProjectBadgeDesktop();
}

export default CurrentlyMaintaining;
