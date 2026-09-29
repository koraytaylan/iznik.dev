/** The address the site is published at. Not a canonical alias of another URL. */

export const ORIGINAL_URL = "https://iznik.dev";
export const SOURCE_URL = "https://github.com/koraytaylan/iznik";

export const SITE_NAME = "İznik";
export const SITE_TITLE = "İznik — a remote terminal system";
export const SITE_DESCRIPTION =
  "A remote terminal with a cross-platform GPUI front end. Your SSH, a server on the host, panes that survive a dropped link.";

/** Copyright line of the iznik LICENSE. */
export const SITE_AUTHOR = "Koray Taylan Davgana";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${ORIGINAL_URL}/#website`,
      url: ORIGINAL_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${ORIGINAL_URL}/#author` },
    },
    {
      "@type": "WebPage",
      "@id": `${ORIGINAL_URL}/#webpage`,
      url: ORIGINAL_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${ORIGINAL_URL}/#website` },
      about: { "@id": `${ORIGINAL_URL}/#software` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${ORIGINAL_URL}/og.jpg`,
      },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${ORIGINAL_URL}/#author`,
      name: SITE_AUTHOR,
      url: "https://koraytaylan.com",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${ORIGINAL_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows",
      url: ORIGINAL_URL,
      image: `${ORIGINAL_URL}/og.jpg`,
      description: SITE_DESCRIPTION,
      codeRepository: SOURCE_URL,
      downloadUrl: "https://github.com/koraytaylan/iznik/releases/tag/develop-snapshot",
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@id": `${ORIGINAL_URL}/#author` },
    },
  ],
};

export const SITE_JSON_LD = JSON.stringify(graph).replace(/</g, "\\u003c");
