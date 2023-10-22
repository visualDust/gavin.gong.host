/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./AkasakiFeatures.module.css";
import { useMediaQuery } from "react-responsive";

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {buttonLink ? (
        <div style={{ textAlign: "center" }}>
          <a
            href={buttonLink}
            className="button button--primary button--outline"
          >
            {buttonText}
          </a>
        </div>
      ) : null}
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
    <div style={{ marginTop:"10px", marginBottom:"10px", display: 'flex', flexDirection: 'row', alignItems: "center"}}>
      <div className="text--left">
        <h3>{title}</h3>
        <p>{description}</p>
        {buttonLink ? (
          <div style={{ textAlign: "left" }}>
            <a
              href={buttonLink}
              className="button button--primary button--outline"
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

function AkasakFeaturesMobile(): JSX.Element {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", margin: "5%"}}>
        {FeatureList.map((props, idx) => (
          <FeatureMobile key={idx} {...props} />
        ))}
      </div>
    </>
  )
}

function AkasakFeaturesDesktop(): JSX.Element {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", margin: "5%", gap:"30px" }}>
        {FeatureList.map((props, idx) => (
          <FeatureDesktop key={idx} {...props} />
        ))}
      </div>
    </>
  )
}

export function AkasakiFeatures(): JSX.Element {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 800 });
  return isTabletOrMobile ? AkasakFeaturesMobile() : AkasakFeaturesDesktop()
}
