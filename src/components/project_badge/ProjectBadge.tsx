import React from "react";
import { Carousel } from "react-responsive-carousel";
import useIsMobile from "../../hooks/useIsMobile";

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
    <div>
      <div style={{ position: "relative" }}>
        <img
          style={{ objectFit: "cover", borderRadius: "20px 20px 0 0" }}
          src={imgUrl}
        />
        <h3
          style={{
            position: "absolute",
            left: "5%",
            top: "5%",
            width: "100%",
            textAlign: "left",
            textShadow: 'var(--ifm-color-emphasis-0) 1px 0 10px',
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
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <a href={buttonLink} className="button button--primary">
              {buttonText}
            </a>
          </div>
        ) : null}
      </div>
      <div
        style={{
          backgroundColor: "var(--floating-card-background)",
          padding: "3%",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <p style={{ margin: "0" }}>{text}</p>
      </div>
    </div>
  );
}

const BadgeList: BadgeItem[] = [
  {
    imgUrl: "/img/projectBadgeImgs/depth_estimation.gif",
    title: "Vehicle Distance Detection",
    text: "Vehicle distance detection while driving built from target detection and depth estimation ensures driving security. The composite model allows inputs from both monodepth estimation models and phisical sensors such as lidar. The model is optimized for edge computing devices with fast inference speed with our visualization UI support.",
    buttonLink: "https://github.com/akasaki-is-a-rubbish",
    buttonText: "See the project",
  },
  {
    imgUrl: "/img/projectBadgeImgs/lidar_visualization.gif",
    title: "Blind Spot Visualization",
    text: "Visualization on blind spots keeps the surroundings safe. The proposed approach allows lidar data and input from ultrasonic sensors. Both hardware and software are implemented from scratch. The system read sensor values within a optimized latency to to ensure real-time speed. We tried a more intuitive visualization method and corresponding UI design.",
    buttonLink: "https://github.com/akasaki-is-a-rubbish",
    buttonText: "See the project",
  },
  {
    imgUrl: "/img/projectBadgeImgs/illegal_driving_behavior_detection.gif",
    title: "Illegal Driving Behavior Detection",
    text: "A set of integration for detecting illegal driving behaviors from edge computing devices, cloud services to mobile apps developed by us. The driver's facial key point features are used to judge dangerous driving behavior. Results are recorded on server and delivered to user's phone app that users can correct their behaviors on their own.",
    buttonLink: "https://github.com/akasaki-is-a-rubbish",
    buttonText: "See the project",
  },
  {
    imgUrl: "/img/projectBadgeImgs/light_weight_semantic_segmentation.gif",
    title: "Road scene seg on embedded device",
    text: "Light weight yet accurate semantic segmentation model designed and trained for road scence. The proposed model is applied for scene understanding and drivable area detection. The proposed model achieved smooth floating-point precision inference on edge computing device NVIDIA Jetson NX with the speed of 25FPS.",
    buttonLink: "https://github.com/akasaki-is-a-rubbish",
    buttonText: "See the project",
  },
  {
    imgUrl: "/img/projectBadgeImgs/network_based_inference.gif",
    title: "Network based inference",
    text: "The inference results and images of the assisted driving system are distributed through the network and are compatible with various platforms through web technology. This allows assisted driving edge computing devices to be deployed outside of existing vehicle-mounted terminals. Use a tablet instead when you don't have a screen on car.",
    buttonLink: "https://github.com/akasaki-is-a-rubbish",
    buttonText: "See the project",
  },
];

const renderThumbs = (array) => {
  return array.map((x, idx) => <img key={idx} src={x.props.imgUrl} />);
};

function ProjectBadgeMobile(): JSX.Element {
  return (
    <div style={{ margin: "5%" }}>
      <h3 style={{textAlign:"center"}}>Cool Things</h3>
      <Carousel
        showArrows={true}
        autoPlay={true}
        renderThumbs={renderThumbs}
        showIndicators={false}
        swipeable={false}
        infiniteLoop={true}
      >
        {BadgeList.map((props, idx) => (
          <BadgeMobile key={idx} {...props} />
        ))}
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
        infiniteLoop={true}
      >
        {BadgeList.map((props, idx) => (
          <BadgeDesktop key={idx} {...props} />
        ))}
      </Carousel>
    </div>
  );
}

function ProjectBadge(): JSX.Element {
  const isTabletOrMobile = useIsMobile();
  return isTabletOrMobile ? ProjectBadgeMobile() : ProjectBadgeDesktop();
}

export default ProjectBadge;
