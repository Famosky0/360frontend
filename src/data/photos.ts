import FakeImage from "../../public/shoot1.jpeg";
import { StaticImageData } from "next/image";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashPhotos = [
  { id: "8gVv6nxq6gY", width: 1080, height: 800 },
  { id: "Dhmn6ete6g8", width: 1080, height: 1620 },
  { id: "RkBTPqPEGDo", width: 1080, height: 720 },
  { id: "Yizrl9N_eDA", width: 1080, height: 721 },
  { id: "KG3TyFi0iTU", width: 1080, height: 1620 },
  { id: "Jztmx9yqjBw", width: 1080, height: 607 },
  { id: "-heLWtuAN3c", width: 1080, height: 608 },
  { id: "xOigCUcFdA8", width: 1080, height: 720 },
  { id: "1azAjl8FTnU", width: 1080, height: 1549 },
  { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
  { id: "twukN12EN7c", width: 1080, height: 694 },
  { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
  { id: "sEXGgun3ZiE", width: 1080, height: 720 },
  { id: "S-cdwrx-YuQ", width: 1080, height: 1440 },
  { id: "q-motCAvPBM", width: 1080, height: 1620 },
  { id: "Xn4L310ztMU", width: 1080, height: 810 },
  { id: "iMchCC-3_fE", width: 1080, height: 610 },
  { id: "X48pUOPKf7A", width: 1080, height: 160 },
  { id: "GbLS6YVXj0U", width: 1080, height: 810 },
  { id: "9CRd1J1rEOM", width: 1080, height: 720 },
  { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
];

const unsplashLink = (id: string, width: number, height: number) =>
  `https://source.unsplash.com/${id}/${width}x${height}`;

export const PortfolioArrayPictures = [
  {
    id: 1,
    picture: FakeImage,
    category: "wedding",
    width: 1080,
    height: 800,
    src: unsplashLink(
      unsplashPhotos[0].id,
      unsplashPhotos[0].width,
      unsplashPhotos[0].height
    ),
  },
  {
    id: 2,
    picture: FakeImage,
    category: "wedding",
    width: 1080,
    height: 1620,
    src: unsplashLink(
      unsplashPhotos[1].id,
      unsplashPhotos[1].width,
      unsplashPhotos[1].height
    ),
  },
  {
    id: 3,
    picture: FakeImage,
    category: "events",
    width: 1080,
    height: 720,
    src: unsplashLink(
      unsplashPhotos[2].id,
      unsplashPhotos[2].width,
      unsplashPhotos[2].height
    ),
  },
  {
    id: 4,
    picture: FakeImage,
    category: "portraits",
    width: 1080,
    height: 721,
    src: unsplashLink(
      unsplashPhotos[3].id,
      unsplashPhotos[3].width,
      unsplashPhotos[3].height
    ),
  },
  {
    id: 5,
    picture: FakeImage,
    category: "portraits",
    width: 1080,
    height: 720,
    src: unsplashLink(
      unsplashPhotos[4].id,
      unsplashPhotos[4].width,
      unsplashPhotos[4].height
    ),
  },
  {
    id: 6,
    picture: FakeImage,
    category: "events",
    width: 1080,
    height: 1620,
    src: unsplashLink(
      unsplashPhotos[5].id,
      unsplashPhotos[5].width,
      unsplashPhotos[5].height
    )
  },
  {
    id: 7,
    picture: FakeImage,
    category: "family",
    width: 1080,
    height: 607,
    src: unsplashLink(
      unsplashPhotos[6].id,
      unsplashPhotos[6].width,
      unsplashPhotos[6].height
    ),
  },
];

const photos = PortfolioArrayPictures.map((photo) => ({
  src: photo.picture,
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: photo.picture,
      width: breakpoint,
      height,
    };
  }),
}));

export default photos;
