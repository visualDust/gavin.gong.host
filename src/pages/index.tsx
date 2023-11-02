import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import Layout from "@theme/Layout";
import ProjectBadge from "../components/project_badge/ProjectBadge";
import Gallery from "../components/gallery/gallery";
import GitHubCalendar from "react-github-calendar";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from "@docusaurus/theme-common";
import {
  AkasakFeaturesDesktop,
  AkasakFeaturesMobile,
} from "../components/index_features/AkasakFeatures";
import { inject } from "@vercel/analytics";
inject();

import useIsMobile from "../hooks/useIsMobile";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Zoom,
  EffectCreative,
} from "swiper";

SwiperCore.use([
  Zoom,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  EffectCreative,
]);

function ComponentPersonalInfo(): JSX.Element {
  return (
    <div // personal information
      style={{
        textAlign: "justify",
      }}
    >
      <p style={{ marginBottom: "5px" }}>
        I'm currently a
        <strong> final year B.E. in Computer Science and Technology</strong>, at
        School of Computer and Information Security, Guilin University of
        Electronic Technology in China. I taught myself computer vision related
        content during my undergraduate studies.
      </p>
      <p style={{ marginBottom: "5px" }}>
        My research interests span the broad area of computer vision, especially
        in dence prediction(i.e. semantic segmentation), Point clouds and 3D
        reconstruction, as well as fine tuning and optimizing deep learning
        models into software systems. I enjoy doing research, experiments, and
        building highly performant systems via software approaches. I'm also
        interested in generative models(i.e. diffusion models), and few shot
        learning(i.e. AutoEncoders).
      </p>
      <p style={{ marginBottom: "5px" }}>
        I'm
        <strong>
          {" "}
          looking for PhD AI/ML, MS CS and other opportunities.
        </strong>{" "}
        You can find my full CV
        <a href="/404">
          {" "}
          //todo
          <strong> HERE</strong>
        </a>
        .
      </p>
    </div>
  );
}

type LinkProps = {
  url: string;
  text: string;
  icon?: JSX.Element;
  alt?: string;
};

import { IoLogoGithub } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";
import Link from "@docusaurus/Link";

const MyLinks: LinkProps[] = [
  {
    url: "mailto:gavin@gong.host",
    text: "Email",
    icon: <IoMail />,
  },
  {
    url: "https://t.me/VisualDust",
    text: "Telegram",
    icon: <BsTelegram />,
  },
  {
    url: "https://github.com/visualDust",
    text: "GitHub",
    icon: <IoLogoGithub />,
  },
  {
    url: "http://gavin.gong.host/about",
    text: "Friends",
    icon: <FaLink />,
  },
];

function ComponentLinkMobile(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "5%",
      }}
    >
      {MyLinks.map((props, idx) => (
        <div style={{ textAlign: "center", margin: "5px" }}>
          <Button
            style={{ whiteSpace: "nowrap" }}
            variant="outlined"
            href={props.url}
          >
            {props.icon && (
              <>
                {props.icon}
                <span style={{ marginLeft: "5px" }}></span>
              </>
            )}
            {props.text}
          </Button>
        </div>
      ))}
    </div>
  );
}

function ComponentLinkDesktop(): JSX.Element {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {MyLinks.map((props, idx) => (
        <div style={{ textAlign: "center", margin: "5px" }}>
          <Button
            style={{ whiteSpace: "nowrap" }}
            variant="outlined"
            href={props.url}
          >
            {props.icon && (
              <>
                {props.icon}
                <span style={{ marginLeft: "5px" }}></span>
              </>
            )}
            {props.text}
          </Button>
        </div>
      ))}
    </div>
  );
}

function ComponentPersonalInfoAndLinksDesktop(): JSX.Element {
  return (
    <div // personal information and links
      style={{
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "row",
        margin: "5%",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          // picture and links
          display: "flex",
          flexDirection: "column",
          flex: "0 0 30%",
          marginRight: "5%",
        }}
      >
        <img
          style={{
            maxWidth: "250px",
            borderRadius: "10px 10px 10px 10px",
          }}
          src="/img/VisualDust.jpg"
        ></img>
        <h1
          style={{
            marginTop: "25px",
          }}
        >
          Gavin Gong
        </h1>
        <div>
          <ComponentLinkDesktop></ComponentLinkDesktop>
        </div>
      </div>
      <div
        style={{
          // personal information and github recent activities
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ComponentPersonalInfo></ComponentPersonalInfo>
        <BrowserOnly>
          {() => (
            <GitHubCalendar
              colorScheme={useColorMode().colorMode}
              username="VisualDust"
            />
          )}
        </BrowserOnly>
      </div>
    </div>
  );
}

function ComponentPersonalInfoAndLinksMobile(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "0 0 30%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              maxWidth: "200px",
              marginTop: "10%",
              borderRadius: "10px 10px 10px 10px",
            }}
            src="/img/VisualDust.jpg"
          ></img>
          <h1
            style={{
              marginTop: "25px",
            }}
          >
            Gavin Gong
          </h1>
        </div>
      </div>
      <ComponentPersonalInfo></ComponentPersonalInfo>
      <ComponentLinkMobile></ComponentLinkMobile>
    </div>
  );
}

function GotoGalleryBanner(): JSX.Element {
  return (
    <Link
      className="goto-banner"
      href="/gallery"
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          textAlign: "right",
          fontSize: "var(--ifm-h3-font-size)",
        }}
      >
        <strong>Gallery</strong>
      </div>
      <div>
        <div style={{ height: "50%" }} className="goto-arrow">
          <span />
          <span />
          <span />
        </div>
      </div>
    </Link>
  );
}

function HomePageMobile(): JSX.Element {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <ComponentPersonalInfoAndLinksMobile />
      <BrowserOnly>
        {() => (
          <GitHubCalendar
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "5%",
              marginBottom: "10%",
            }}
            colorScheme={useColorMode().colorMode}
            username="VisualDust"
          />
        )}
      </BrowserOnly>
      <AkasakFeaturesMobile />
      <ProjectBadge />
    </div>
  );
}

function HomePageDesktop(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ComponentPersonalInfoAndLinksDesktop />
      </div>
      <AkasakFeaturesDesktop />
      <ProjectBadge />
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const isMobile = useIsMobile();
  const [_, update] = useState(0);
  useLayoutEffect(() => {
    update((state) => state + 1);
  }, []);
  console.info({ isTabletOrMobile: isMobile });
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Gavin Gong (aka VisualDust) and his coding life"
    >
      <main
        id="functionals"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - var(--ifm-navbar-height))",
          lineHeight: "1.5",
        }}
      >
        {isMobile ? HomePageMobile() : HomePageDesktop()}
        <GotoGalleryBanner />
      </main>
    </Layout>
  );
}
