import React, { useState, useEffect } from "react";
import style from "./carousel.module.css";
import { useMediaQuery } from "react-responsive";
import { Carousel } from 'react-responsive-carousel';
import useIsMobile from "../hooks/useIsMobile";

type BadgeItem = {
    imgUrl: string;
    title: string;
    text: string;
    buttonLink?: string;
};


function HorizontalBadge({ imgUrl, title, text, buttonLink }: BadgeItem): JSX.Element {
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={imgUrl} />
            <div style={{textAlign:"right"}}>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}

function VerticalBadge({ imgUrl, title, text, buttonLink }: BadgeItem): JSX.Element {
    return (
        <div style={{ position: 'relative' }}>
            <img src={imgUrl} />
            <h3 style={{ position: 'absolute', left: "5%", top: "5%", width: '100%', textAlign:"left"}}>{title}</h3>
            <p style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>{text}</p>
        </div>
    )
}

const renderThumbs = (array) => {
    return array.map(x => <img src={x.props.imgUrl} />);
};

function ProjectBadgeMobile(): JSX.Element {
    return (
        <div style={{ margin: "5%" }}>
            <h3>Cool Things</h3>
            <Carousel showArrows={true} autoPlay={true} renderThumbs={renderThumbs} showIndicators={false} swipeable={true}>
                <VerticalBadge imgUrl="/img/projectBadgeImgs/assets (1).JPG" title="assets (1)" text="Test Text Test Text Test Text Test Text Test Text"></VerticalBadge>
                <VerticalBadge imgUrl="/img/projectBadgeImgs/assets (2).JPG" title="assets (2)" text="Test Text Test Text Test Text Test Text Test Text"></VerticalBadge>
                <VerticalBadge imgUrl="/img/projectBadgeImgs/assets (3).JPG" title="assets (3)" text="Test Text Test Text Test Text Test Text Test Text"></VerticalBadge>
                <VerticalBadge imgUrl="/img/projectBadgeImgs/assets (4).JPG" title="assets (4)" text="Test Text Test Text Test Text Test Text Test Text"></VerticalBadge>
                <VerticalBadge imgUrl="/img/projectBadgeImgs/assets (5).JPG" title="assets (5)" text="Test Text Test Text Test Text Test Text Test Text"></VerticalBadge>
                <VerticalBadge imgUrl="/img/projectBadgeImgs/assets (6).JPG" title="assets (6)" text="Test Text Test Text Test Text Test Text Test Text"></VerticalBadge>
            </Carousel>
        </div>
    );
}

function ProjectBadgeDesktop(): JSX.Element {
    return (
        <div style={{ margin: "5%" }}>
            <h3>Cool Things</h3>
            <Carousel showArrows={false} autoPlay={true} renderThumbs={renderThumbs} showIndicators={false}>
                <HorizontalBadge imgUrl="/img/projectBadgeImgs/assets (1).JPG" title="assets (1)" text="Test Text Test Text Test Text Test Text Test Text"></HorizontalBadge>
                <HorizontalBadge imgUrl="/img/projectBadgeImgs/assets (2).JPG" title="assets (2)" text="Test Text Test Text Test Text Test Text Test Text"></HorizontalBadge>
                <HorizontalBadge imgUrl="/img/projectBadgeImgs/assets (3).JPG" title="assets (3)" text="Test Text Test Text Test Text Test Text Test Text"></HorizontalBadge>
                <HorizontalBadge imgUrl="/img/projectBadgeImgs/assets (4).JPG" title="assets (4)" text="Test Text Test Text Test Text Test Text Test Text"></HorizontalBadge>
                <HorizontalBadge imgUrl="/img/projectBadgeImgs/assets (5).JPG" title="assets (5)" text="Test Text Test Text Test Text Test Text Test Text"></HorizontalBadge>
                <HorizontalBadge imgUrl="/img/projectBadgeImgs/assets (6).JPG" title="assets (6)" text="Test Text Test Text Test Text Test Text Test Text"></HorizontalBadge>
            </Carousel>
        </div>
    )
}

function ProjectBadge(): JSX.Element {
    const isTabletOrMobile = useIsMobile();
    return isTabletOrMobile ? ProjectBadgeMobile() : ProjectBadgeDesktop()
}

export default ProjectBadge;