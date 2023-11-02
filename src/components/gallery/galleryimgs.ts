import { Image } from "react-grid-gallery";
import GalleryData from "./galleryData.json"

export interface CustomImage extends Image {
  original: string;
  title: string;
}

export const images: CustomImage[] = GalleryData.map(x => ({
  src: "/img/gallery/" + x.thumbnial,
  original: "/img/gallery/" + x.file,
  width: x.width,
  height: x.height,
  title: x.title,
  caption: x.caption,
  tags: x.tags?.map(t => ({
    value: t,
    title: t,
  }))
}))