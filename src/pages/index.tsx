import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import Typical from "react-typical";

function HomepageBackground() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8" style={{ alignSelf: "center", marginBottom: "50px" }}>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">
              <Typical
                steps={[
                  'Rubbish CVer、Poor LaTex speaker、Half stack developer',
                  2000,
                  'VusualDust',
                  1000,
                ]}
                loop={Infinity}
                wrapper="span"
              />
            </p>
            <div>
              <a className="button button--outline" href="/docs">Blogs</a>
            </div>
          </div>
          <div className="col col--4">
            <img src="/img/programmer.svg" alt="Programmer" />
          </div>
        </div>
      </div>
    </header>
  );
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
