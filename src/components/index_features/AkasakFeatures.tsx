/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./AkasakiFeatures.module.css";
import useIsMobile from "../../hooks/useIsMobile";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
  buttonLink?: string;
  buttonText?: string;
};

export const FeatureList: FeatureItem[] = [
  {
    title: "As a CV Learner",
    image: "/img/illustrations/teaching.svg",

    description: (
      <>
        Self taught learning materials by me and my friends. Focusing on Deep learning technique for Computer Vision.
      </>
    ),
    buttonLink: "https://ml.akasaki.space/",
    buttonText: "Join Together",
  },
  {
    title: "As a Programmer",
    image: "/img/illustrations/startup_life.svg",

    description: (
      <>
        Random notes about developing, programming or argorithm related theory. Also some useless anecdotes.
      </>
    ),
    buttonLink: "/blog/",
    buttonText: "Random Blogs",
  },
  {
    title: "As a researcher",
    image: "/img/illustrations/researching.svg",
    description: (
      <>
        Random paper reading, where some interesting papers about Computer Vision were recapitulated and analyzed.
      </>
    ),
    buttonLink: "https://ml.akasaki.space/blog",
    buttonText: "Paper Reading Blogs",
  },
];

export function FeatureDesktop({
  title,
  image,
  description,
  buttonLink,
  buttonText,
}: FeatureItem) {
  return (
    <div className="feature-card" style={{ display: 'flex', flexDirection: 'row', alignItems: "stretch" }}>
      <div style={{
        display: "flex",
        margin: "30px",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div className="text--center">
          <img className={styles.featureSvg} alt={title} src={image} />
        </div>
        <div className="text--center feature-card-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {buttonLink ? (
          <div style={{ textAlign: "center" }}>
            <a
              href={buttonLink}
              className="button button--secondary"
            >
              {buttonText}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function FeatureMobile({
  title,
  image,
  description,
  buttonLink,
  buttonText,
}: FeatureItem) {
  return (
    <div style={{ marginTop: "10px", marginBottom: "10px", display: 'flex', flexDirection: 'row', alignItems: "center" }}>
      <div className="text--left">
        <h3>{title}</h3>
        <p>{description}</p>
        {buttonLink ? (
          <div>
            <a
              href={buttonLink}
              className="button button--secondary"
            >
              {buttonText}
            </a>
          </div>
        ) : null}
      </div>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
    </div>
  );
}

export function AkasakFeaturesMobile(): JSX.Element {
  return (
    <div className="hero hero--primary" style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
      <div style={{
        display: "flex",
        marginLeft: "5%",
        marginRight: "5%",
        gap: "10px",
        flexDirection: "column",
      }}>
        {FeatureList.map((props, idx) => (
          <FeatureMobile key={idx} {...props} />
        ))}
      </div></div>
  )
}

export function AkasakFeaturesDesktop(): JSX.Element {
  return (
    <div className="hero hero--primary" style={{ display: "flex", alignItems: "center", flexDirection: "column",width:"100%" }}>
      <div style={{
        display: "flex",
        margin: "1%",
        maxWidth: "1000px",
        gap: "30px",
        flexDirection: "row",
      }}>
        {FeatureList.map((props, idx) => (
          <FeatureDesktop key={idx} {...props} />
        ))}
      </div>

    </div>
  )
}
