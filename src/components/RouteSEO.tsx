import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE = "https://sahilportfolio27.lovable.app";

type Meta = { title: string; description: string; image: string };

const DEFAULT_IMG = "https://i.postimg.cc/wTrb3qQ6/Dev.webp";

export const ROUTE_META: Record<string, Meta> = {
  "/": {
    title: "Sahil Wadhwani — Android Developer, Creator & Gamer",
    description: "Portfolio of Sahil Wadhwani: Android engineer building with Kotlin and Jetpack Compose, plus music, films, photos and games.",
    image: DEFAULT_IMG,
  },
  "/developer": {
    title: "Developer — Sahil Wadhwani | Kotlin & Jetpack Compose",
    description: "4 years of Android development and 7+ apps shipped. Explore projects like Utilix and Dopamine Bar, skills and tools.",
    image: DEFAULT_IMG,
  },
  "/friend": {
    title: "About Me — Sahil Wadhwani",
    description: "The quieter side of Sahil: music on loop, films worth remembering, photos, favourites and a guestbook to say hi.",
    image: "https://i.postimg.cc/ncWMwFGJ/Friend.webp",
  },
  "/gamer": {
    title: "Gamer — S A A H O | Sahil Wadhwani",
    description: "Weekend squad drops in BGMI, open-world drives and quick races. Sahil's player card and game library.",
    image: "https://i.postimg.cc/TYshHdqH/Gamer.webp",
  },
  "/gaming": {
    title: "Game Library — Sahil Wadhwani",
    description: "The games Sahil plays to reset between builds — BGMI, racing and open-world favourites.",
    image: "https://i.postimg.cc/TYshHdqH/Gamer.webp",
  },
  "/gallery": {
    title: "Photo Gallery — Sahil Wadhwani",
    description: "Frames worth keeping — a personal photo wall by Sahil Wadhwani.",
    image: "https://i.postimg.cc/HnxHJTX9/1000325079.jpg",
  },
  "/skills": {
    title: "Skills & Tools — Sahil Wadhwani",
    description: "Kotlin, Android SDK, Jetpack Compose, Firebase and the tools Sahil uses every day.",
    image: DEFAULT_IMG,
  },
  "/youtube": {
    title: "YouTube — Sahil Wadhwani",
    description: "Videos and resources from Sahil Wadhwani's YouTube channel.",
    image: DEFAULT_IMG,
  },
};

const RouteSEO = () => {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];
  const url = `${SITE}${pathname === "/" ? "/" : pathname}`;
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  );
};

export default RouteSEO;
