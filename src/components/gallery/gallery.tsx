import React, { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";
import arrayShuffle from "array-shuffle";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { images as galleryData, CustomImage } from "./galleryimgs";

export default function GalleryComponent(): JSX.Element {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState(galleryData);
  useEffect(() => {
    setImages(arrayShuffle(images));
  }, []);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: CustomImage) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div>
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
      />
      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage.original}
          imageTitle={
            <h1
              style={{
                margin: "10px",
              }}
            >
              {currentImage.title}
            </h1>
          }
          imageCaption={<p>{currentImage.caption}</p>}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
}
