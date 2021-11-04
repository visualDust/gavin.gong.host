import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { AkasakiFeatures, Feature, FeatureList } from "../components/AkasakFeatures";
import Typical from "react-typical";
import * as config from "./_index.config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import { WakatimeEditors, WakatimeFeatures, WakatimeLanguages } from "../components/WakatimeFeatures";
import { GithubFeatures } from "../components/GithubFeatures";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow } from 'swiper';
import { useWakatimeData } from "../hooks/useWakatimeData";

function HomepageBackground() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div
            className={clsx(
              "col",
              "col--" + config.title_width,
              styles.centerChild
            )}
            style={{
              alignSelf: "center",
              marginBottom: "50px",
              minHeight: "20em",
            }}
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
              <a
                className="button button--outline"
                style={{ border: "solid 1px" }}
                href="/docs"
              >
                Blogs
              </a>
            </div>
          </div>
          <div
            className={clsx(
              "col",
              "col--" + (12 - config.title_width),
              styles.centerChild
            )}
          >
            {/* <img
              src={
                config.illustrations[
                  Math.floor(Math.random() * config.illustrations.length)
                ]
              }
              alt="Programmer"
            /> */}
            <BrowserOnly>{carousel}</BrowserOnly>
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
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Akasaki Focusing is where Gavin Gong (aka VisualDust) enjoys coding life"
    >
      <HomepageBackground />
      <main>
        <BrowserOnly>
          {MySwiper}
        </BrowserOnly>
      </main>
    </Layout>
  );
}

function MySwiper(): JSX.Element {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 997 });
  const waka = useWakatimeData();
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      modules={[EffectCoverflow]}
      effect="coverflow"
      autoHeight={true}
    >
      {
        isTabletOrMobile ? (
          <>
            {FeatureList.map((props, idx) => (
              <SwiperSlide style={{ padding: '20px' }}>
                <Feature key={idx} {...props} />
              </SwiperSlide>
            ))}
            <SwiperSlide style={{ padding: '20px' }}>
              <WakatimeLanguages data={waka} />
            </SwiperSlide>
            <SwiperSlide style={{ padding: '20px' }}>
              <WakatimeEditors data={waka} />
            </SwiperSlide>
            <SwiperSlide style={{padding:'100px 20px'}}><GithubFeatures /></SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide><AkasakiFeatures /></SwiperSlide>
            <SwiperSlide><WakatimeFeatures data={waka} /></SwiperSlide>
            <SwiperSlide><GithubFeatures /></SwiperSlide>
          </>
        )
      }
    </Swiper>
  )
}
