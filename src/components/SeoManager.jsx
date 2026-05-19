import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { services } from "../data/services";
import { blogPosts, siteInfo } from "../data/team";

const SITE_URL = siteInfo.url;
const DEFAULT_TITLE = "Rohan Dsouza | AI, GTM, Product Strategy and Growth Systems";
const DEFAULT_DESCRIPTION =
  "Rohan Dsouza helps founders and leadership teams build revenue, deploy GenAI agents, sharpen product strategy, and create brands that compound.";
const DEFAULT_IMAGE = `${SITE_URL}/images/Rohan-Dsouza-Monogram-1024x503.png`;

function setMeta(selector, attribute, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) {
      tag.setAttribute(match[1], match[2]);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, value);
}

function setLink(selector, rel, href) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function pageMeta(pathname) {
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const blogSlug = cleanPath.startsWith("/blog/") ? cleanPath.replace("/blog/", "") : null;
  const post = blogPosts.find((item) => item.slug === blogSlug);
  const serviceSlug = cleanPath.replace("/", "");
  const service = services.find((item) => item.slug === serviceSlug);

  if (post) {
    return {
      title: `${post.title} | Rohan Dsouza Blog`,
      description: post.excerpt,
      path: post.link,
      type: "article",
    };
  }

  if (service) {
    return {
      title: `${service.title} | Rohan Dsouza`,
      description: service.body,
      path: `/${service.slug}`,
      type: "website",
    };
  }

  if (cleanPath === "/about-me" || cleanPath === "/about") {
    return {
      title: "About Rohan Dsouza | AI Strategy and Growth Advisory",
      description:
        "Learn about Rohan Dsouza, a digital AI agency founder helping serious businesses combine strategy, AI systems, product thinking, and execution.",
      path: "/about-me",
      type: "website",
    };
  }

  if (cleanPath === "/services") {
    return {
      title: "AI, GTM, Product and Growth Services | Rohan Dsouza",
      description:
        "Explore services across go-to-market strategy, GenAI agents, influence and inbound growth, product design, alliances, and fractional leadership.",
      path: "/services",
      type: "website",
    };
  }

  if (cleanPath === "/projects") {
    return {
      title: "Completed Work and Case Studies | Rohan Dsouza",
      description:
        "View detailed case studies across GTM strategy, healthcare growth, global brand systems, B2B positioning, and revenue-focused website work.",
      path: "/projects",
      type: "website",
    };
  }

  if (cleanPath === "/contact-us") {
    return {
      title: "Work With Rohan Dsouza | Strategy Call",
      description:
        "Book a strategy conversation with Rohan Dsouza for AI systems, GTM strategy, product direction, growth, and brand execution.",
      path: "/contact-us",
      type: "website",
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
    type: "website",
  };
}

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = pageMeta(location.pathname);
    const url = `${SITE_URL}${meta.path}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[name="robots"]', "content", "index, follow, max-image-preview:large");
    setLink('link[rel="canonical"]', "canonical", url);

    setMeta('meta[property="og:type"]', "content", meta.type);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", DEFAULT_IMAGE);
    setMeta('meta[property="og:image:secure_url"]', "content", DEFAULT_IMAGE);

    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
    setMeta('meta[name="twitter:image"]', "content", DEFAULT_IMAGE);
  }, [location.pathname]);

  return null;
}
