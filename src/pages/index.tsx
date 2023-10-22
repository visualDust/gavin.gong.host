import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import ProjectBadge from "../components/ProjectBadge";
import BrowserOnly from "@docusaurus/BrowserOnly";
import GitHubCalendar from 'react-github-calendar';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { Parallax, Background } from "react-parallax";
import { AkasakiFeatures } from "../components/AkasakFeatures";
import { inject } from '@vercel/analytics';
inject();
import {
  useThemeConfig,
  useColorMode,
  useWindowSize,

} from '@docusaurus/theme-common';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useMediaQuery } from "react-responsive";
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
        marginBottom: "25px",
        marginTop: "25px"
      }}
    >
      Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing Page Testing
    </div>
  )
}

function ComponentLink(): JSX.Element {
  return (
    <>
      <h3>Links</h3>
      <a href="https://github.com/VisualDust"> Github</a>
    </>
  )
}

function HomePageMobile(): JSX.Element {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto"
      }}
    >
      <div // personal information and links
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5%"
        }}>
        <div style={{ // picture and links
          display: "flex",
          flexDirection: "column",
          flex: "0 0 30%",
          marginRight: "5%"
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              style={{
                maxWidth: "150px"
              }}
              src="/img/VisualDust.jpg"></img>
            <h1 style={{
              marginTop: "25px"
            }}>Gavin Gong</h1>
          </div>
        </div>
        <ComponentPersonalInfo></ComponentPersonalInfo>
        <ComponentLink></ComponentLink>
        <GitHubCalendar style={{marginTop:"10px",marginBottom:"10px"}} colorScheme="light" username="VisualDust" />
      </div>
      <ProjectBadge></ProjectBadge>
      <AkasakiFeatures />
    </div>
  )
}

function HomePageDesktop(): JSX.Element {

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto"
      }}
    >
      <div // personal information and links
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "5%"
        }}>
        <div style={{ // picture and links
          display: "flex",
          flexDirection: "column",
          flex: "0 0 30%",
          marginRight: "5%"
        }}>
          <img
            style={{
              maxWidth: "250px"
            }}
            src="/img/VisualDust.jpg"></img>
          <h1 style={{
            marginTop: "25px"
          }}>Gavin Gong</h1>
          <div>
            <ComponentLink></ComponentLink>
          </div>
        </div>
        <div style={{ // personal information and github recent activities
          display: "flex",
          flexDirection: "column"
        }}>
          <ComponentPersonalInfo></ComponentPersonalInfo>
          <GitHubCalendar colorScheme="light" username="VisualDust" />
        </div>
      </div>
      <ProjectBadge></ProjectBadge>
      <AkasakiFeatures />
    </div>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 800 });
  // useForceRerender();
  return (
    <Layout
      noFooter={true}
      title={`${siteConfig.title}`}
      description="Gavin Gong (aka VisualDust) and his coding life"
    >
      <main
        id="functionals"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - var(--ifm-navbar-height))",
          lineHeight: "1.5"
        }}
      >
        {isTabletOrMobile ? HomePageMobile() : HomePageDesktop()}
      </main>
    </Layout>
  );
}