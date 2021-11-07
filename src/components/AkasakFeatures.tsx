/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./AkasakiFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
  buttonLink?: string;
  buttonText?: string;
};

export const FeatureList: FeatureItem[] = [
  {
    title: "Me as CVer",
    image: "/img/illustrations/researching.svg",
    description: (
      <>
        Focusing on Deep learning technique for Computer Vision. Also know me as a poor Latex speaker.
      </>
    ),
    buttonLink: "any",//todo
    buttonText: "See my notes",
  },
  {
    title: "Me as Programmer",
    image: "/img/illustrations/teaching.svg",
    description: (
      <>
        Using Java, Python & C++, Learning .NETcore, TypeScripts and
        ComputerGraphics.
      </>
    ),
    buttonLink: "any",//todo
    buttonText: "aba aba",
  },
  {
    title: "Me",
    image: "/img/illustrations/startup_life.svg",
    description: (
      <>
        An rubbish undergraduate. Coffee and Customize keyboards makes me
        intrested.
      </>
    ),
    buttonLink: "any",//todo
    buttonText: "Something fun",
  },
];

export function Feature({
  title,
  image,
  description,
  buttonLink,
  buttonText,
}: FeatureItem) {
  return (
    <div className={clsx("col col--4")} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {buttonLink ? (
        <div style={{ textAlign: "center", }}>
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

export function AkasakiFeatures(): JSX.Element {
  return (
    <section className={clsx(styles.features,"hero")}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
