import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import Layout from "@theme/Layout";
import ProjectBadge from "../components/project_badge/ProjectBadge";
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
import styles from "./about.module.css";

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
        <strong>I'm a first year PhD student in Computer Science, {" "}
          <span style={{ color: "var(--ifm-color-primary)" }}>
            NCSU (North Carolina State Uƒniversity)
          </span>
        </strong>, being an apprentice of <a href="https://wenwujie.github.io/">Dr. Wujie Wen</a>.
        I got my bachelors degree from{" "}
        <strong>
          <span style={{ color: "rgb(0, 59, 122)" }}>
            GUET (Guilin University of Electronic Technology)
          </span>
        </strong>{" "}
        in 2024 summer. I taught myself computer vision and large language model things. I consist of Python, C#, C++,
        CUDA, dotnet, PyTorch, Markdown, and LaTeX.
      </p>
      <p style={{ marginBottom: "5px" }}>
        My research topic mainly focuses on Large Language Models and Privacy Preserving AI Computing.
        My research interests span the broad area of Computer Vision, Generative Models and Unsupervised Learning, as well as
        fine-tuning and optimizing deep learning models into software systems.
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
import { TbDeviceDesktopCog } from "react-icons/tb";
import { BiSolidSchool } from "react-icons/bi";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import CurrentlyMaintaining from "../components/project_badge/CurrentlyMaintaining";

const MyLinks: LinkProps[] = [
  {
    url: "mailto:zgong6@ncsu.edu",
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
    url: "https://directory.ncsu.edu/users/zgong6",
    text: "NCSU",
    icon: <BiSolidSchool />,
  },
  {
    url: "https://gavin.gong.host/links",
    text: "Friends",
    icon: <FaLink />,
  },
  {
    url: "https://browser.geekbench.com/user/423425",
    text: "GeekBench",
    icon: <TbDeviceDesktopCog />,
  },
];

function ComponentLinkMobile(): JSX.Element {
  const brightness = useColorMode().colorMode == "dark" ? 70 : 40;
  const [base_color, set_base_color] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      set_base_color((base_color - 3) % 360);
    }, 100);
    return () => clearTimeout(timer);
  }, [base_color]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "5%",
        willChange: "transform",
      }}
    >
      {MyLinks.map((props, idx) => (
        <div key={idx} style={{ textAlign: "center", margin: "0px" }}>
          <Link
            className={clsx("colored-button", "button")}
            style={{
              background:
                "hsl(" +
                ((idx * 15 + base_color) % 360) +
                "," +
                90 +
                "% ," +
                brightness +
                "%)",
            }}
            href={props.url}
          >
            {props.icon && (
              <>
                {props.icon}
                <span style={{ marginLeft: "5px" }}></span>
              </>
            )}
            {props.text}
          </Link>
        </div>
      ))}
    </div>
  );
}

function ComponentLinkDesktop(): JSX.Element {
  const brightness = useColorMode().colorMode == "dark" ? 70 : 40;
  const [base_color, set_base_color] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      set_base_color((base_color - 3) % 360);
    }, 100);
    return () => clearTimeout(timer);
  }, [base_color]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", willChange: "transform" }}>
      {MyLinks.map((props, idx) => (
        <div key={idx} style={{ textAlign: "center", margin: "0px" }}>
          <Link
            className={clsx("colored-button", "button")}
            style={{
              background:
                "hsl(" +
                ((idx * 15 + base_color) % 360) +
                "," +
                90 +
                "% ," +
                brightness +
                "%)",
            }}
            href={props.url}
          >
            {props.icon && (
              <>
                {props.icon}
                <span style={{ marginLeft: "5px" }}></span>
              </>
            )}
            {props.text}
          </Link>
        </div>
      ))}
    </div>
  );
}

function ComponentNameDesktop(): JSX.Element {
  return (
    <div
      style={{
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <h1>Gavin Gong</h1>
      <div>a.k.a. VisualDust</div>
    </div>
  );
}

function ComponentNameMobile(): JSX.Element {
  return (
    <div
      style={{
        marginTop: "25px",
        marginBottom: "25px",
        textAlign: "center",
      }}
    >
      <h1>Gavin Gong</h1>
      <div>a.k.a. VisualDust</div>
    </div>
  );
}

function MyGitHubCalendarBrowserOnly() {
  return <BrowserOnly>{() => <MyGitHubCalendar />}</BrowserOnly>;
}

function MyGitHubCalendar() {
  const colorMode = useColorMode().colorMode;
  return <GitHubCalendar colorScheme={colorMode} username="VisualDust" />;
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
        justifyContent: "space-around",
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
          src="/img/visualdust.jpg"
        ></img>
        <ComponentNameDesktop />
        <div style={{ display: "flex", justifyContent: "left" }}>
          <img
            style={{ width: "30%", paddingRight: "5%" }}
            src="/img/logo-ncsu.svg"
          />
          <img
            style={{ width: "30%", paddingRight: "5%" }}
            src="/img/logo-guet.svg"
          />
        </div>
      </div>
      <div
        style={{
          // personal information and github recent activities
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <ComponentPersonalInfo />
        <ComponentLinkDesktop />
        <MyGitHubCalendarBrowserOnly />
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
            src="/img/visualdust.jpg"
          ></img>
          <ComponentNameMobile />
        </div>
      </div>
      <ComponentPersonalInfo></ComponentPersonalInfo>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ width: "30%", paddingRight: "3%" }}
          src="/img/logo-ncsu.svg"
        />
        <img
          style={{ width: "30%", paddingLeft: "3%" }}
          src="/img/logo-guet.svg"
        />
      </div>
      <ComponentLinkMobile></ComponentLinkMobile>
    </div>
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
      <div
        style={{
          marginLeft: "5%",
          marginRight: "5%",
          marginTop: "5%",
          marginBottom: "10%",
        }}
      >
        <MyGitHubCalendarBrowserOnly />
      </div>
      <AkasakFeaturesMobile />
      <CurrentlyMaintaining />
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
      <CurrentlyMaintaining />
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
      </main>
    </Layout>
  );
}