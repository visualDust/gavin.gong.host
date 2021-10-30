import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/AkasakFeatures";
import Typical from "react-typical";
import * as config from "./_index.config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";

function HomepageBackground() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div
            className={clsx("col", "col--" + config.title_width, styles.centerChild)}
            style={{ alignSelf: "center", marginBottom: "50px", minHeight: "20em" }}
          >
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">
              <Typical
                steps={config.subtitles_and_delays.flatMap((x) => [
                  x.text,
                  x.delay,
                ])}
                loop={Infinity}
                wrapper="span"
              />
            </p>
            <div>
              <a className="button button--outline"
                style={{ border: 'solid 1px' }}
                href="/docs"
              >
                Blogs
              </a>
            </div>
          </div>
          <div className={clsx("col", "col--" + (12 - config.title_width), styles.centerChild)}>
            {/* <img
              src={
                config.illustrations[
                  Math.floor(Math.random() * config.illustrations.length)
                ]
              }
              alt="Programmer"
            /> */}
            <BrowserOnly>
              {carousel}
            </BrowserOnly>
          </div>
        </div>
      </div>
    </header>
  );
}

function carousel() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 997 });
  return (
    <Carousel
      axis={isTabletOrMobile ? "horizontal" : "vertical"}
      autoPlay
      infiniteLoop
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      swipeable={false}
    >
      {config.illustrations.map((item) => (
        <img src={item} />
      ))}
    </Carousel>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageBackground />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
