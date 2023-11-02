import { Image } from "react-grid-gallery";
import GalleryData from "./gallery.json"

export interface CustomImage extends Image {
  original: string;
  title: string;
}

// {
//   "file": "original_images/0AE51A327BFD29342C6227998C26D1EC.jpg",
//   "thumbnial": "thumbnails/0AE51A327BFD29342C6227998C26D1EC.jpg",
//   "title": "0AE51A327BFD29342C6227998C26D1EC",
//   "caption": null,
//   "tags": null,
//   "width": 246,
//   "height": 300
// },

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