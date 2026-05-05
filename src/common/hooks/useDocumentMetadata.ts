import { useEffect } from "react";

import { SITE_DESCRIPTION, SITE_NAME } from "@/common/constants/environment";

type Args = {
  title?: string;
  description?: string;
};

function useDocumentMetadata({ title, description }: Args) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const fullDescription = description ?? SITE_DESCRIPTION;

    const titleMetas = [
      document.querySelector('meta[property="og:title"]'),
      document.querySelector('meta[name="twitter:title"]'),
    ];
    const descriptionMetas = [
      document.querySelector('meta[name="description"]'),
      document.querySelector('meta[property="og:description"]'),
      document.querySelector('meta[name="twitter:description"]'),
    ];

    const previousTitle = document.title;
    const previousTitleContents = titleMetas.map(
      (meta) => meta?.getAttribute("content") ?? null,
    );
    const previousDescriptionContents = descriptionMetas.map(
      (meta) => meta?.getAttribute("content") ?? null,
    );

    document.title = fullTitle;
    titleMetas.forEach((meta) => meta?.setAttribute("content", fullTitle));
    descriptionMetas.forEach((meta) =>
      meta?.setAttribute("content", fullDescription),
    );

    return () => {
      document.title = previousTitle;
      titleMetas.forEach((meta, i) => {
        const previous = previousTitleContents[i];
        if (previous !== null) meta?.setAttribute("content", previous);
      });
      descriptionMetas.forEach((meta, i) => {
        const previous = previousDescriptionContents[i];
        if (previous !== null) meta?.setAttribute("content", previous);
      });
    };
  }, [title, description]);
}

export default useDocumentMetadata;
