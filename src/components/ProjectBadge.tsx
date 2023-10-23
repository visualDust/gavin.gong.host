import React, { useState, useEffect } from "react";
import style from "./carousel.module.css";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";
import useIsMobile from "../hooks/useIsMobile";
import { Button } from "@mui/material";

type BadgeItem = {
  imgUrl: string;
  title: string;
  text: string;
  buttonLink?: string;
  buttonText?: string;
};

function BadgeDesktop({
  imgUrl,
  title,
  text,
  buttonLink,
  buttonText,
}: BadgeItem): JSX.Element {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <img
        style={{ objectFit: "contain", objectPosition: "0 0", flex: "1" }}
        src={imgUrl}
      />
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          textAlign: "right",
          paddingLeft: "3%",
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
    </div>
  );
}

function BadgeMobile({
  imgUrl,
  title,
  text,
  buttonLink,
  buttonText,
}: BadgeItem): JSX.Element {
  return (
    <div style={{ position: "relative" }}>
      <img style={{ objectFit: "cover" }} src={imgUrl} />
      <h3
        style={{
          position: "absolute",
          left: "5%",
          top: "5%",
          width: "100%",
          textAlign: "left",
        }}
      >
        {title}
      </h3>
      {buttonLink ? (
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: "5%",
            width: "20%",
            textAlign: "center",
          }}
        >
          <a href={buttonLink} className="button button--primary">
            {buttonText}
          </a>
        </div>
      ) : null}
      <p
        style={{
          position: "absolute",
          left: "5%",
          bottom: "5%",
          width: "75%",
          textAlign: "left",
          margin: "0",
        }}
      >
        {text}
      </p>
    </div>
  );
}

const renderThumbs = (array) => {
  return array.map((x) => <img src={x.props.imgUrl} />);
};

const testText =
  "Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test Text Test";

function ProjectBadgeMobile(): JSX.Element {
  return (
    <div style={{ margin: "5%" }}>
      <h3>Cool Things</h3>
      <Carousel
        showArrows={true}
        autoPlay={true}
        renderThumbs={renderThumbs}
        showIndicators={false}
        swipeable={true}
      >
        <BadgeMobile
          imgUrl="/img/projectBadgeImgs/assets (1).JPG"
          title="assets (1)"
          text={testText}
          buttonLink="#"
          buttonText="Button (1)"
        ></BadgeMobile>
        <BadgeMobile
          imgUrl="/img/projectBadgeImgs/assets (2).JPG"
          title="assets (2)"
          text={testText}
          buttonLink="#"
          buttonText="Button (2)"
        ></BadgeMobile>
        <BadgeMobile
          imgUrl="/img/projectBadgeImgs/assets (3).JPG"
          title="assets (3)"
          text={testText}
          buttonLink="#"
          buttonText="Button (3)"
        ></BadgeMobile>
        <BadgeMobile
          imgUrl="/img/projectBadgeImgs/assets (4).JPG"
          title="assets (4)"
          text={testText}
          buttonLink="#"
          buttonText="Button (4)"
        ></BadgeMobile>
        <BadgeMobile
          imgUrl="/img/projectBadgeImgs/assets (5).JPG"
          title="assets (5)"
          text={testText}
          buttonLink="#"
          buttonText="Button (5)"
        ></BadgeMobile>
      </Carousel>
    </div>
  );
}

function ProjectBadgeDesktop(): JSX.Element {
  return (
    <div style={{ margin: "5%", maxWidth: "1000px" }}>
      <h3>Cool Things</h3>
      <Carousel
        showArrows={false}
        autoPlay={true}
        renderThumbs={renderThumbs}
        showIndicators={false}
      >
        <BadgeDesktop
          imgUrl="/img/projectBadgeImgs/assets (1).JPG"
          title="assets (1)"
          text={testText}
          buttonLink="#"
          buttonText="Button (1)"
        ></BadgeDesktop>
        <BadgeDesktop
          imgUrl="/img/projectBadgeImgs/assets (2).JPG"
          title="assets (2)"
          text={testText}
          buttonLink="#"
          buttonText="Button (2)"
        ></BadgeDesktop>
        <BadgeDesktop
          imgUrl="/img/projectBadgeImgs/assets (3).JPG"
          title="assets (3)"
          text={testText}
          buttonLink="#"
          buttonText="Button (3)"
        ></BadgeDesktop>
        <BadgeDesktop
          imgUrl="/img/projectBadgeImgs/assets (4).JPG"
          title="assets (4)"
          text={testText}
          buttonLink="#"
          buttonText="Button (4)"
        ></BadgeDesktop>
        <BadgeDesktop
          imgUrl="/img/projectBadgeImgs/assets (5).JPG"
          title="assets (5)"
          text={testText}
          buttonLink="#"
          buttonText="Button (5)"
        ></BadgeDesktop>
      </Carousel>
    </div>
  );
}

function ProjectBadge(): JSX.Element {
  const isTabletOrMobile = useIsMobile();
  return isTabletOrMobile ? ProjectBadgeMobile() : ProjectBadgeDesktop();
}

export default ProjectBadge;
