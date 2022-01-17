import React from "react";
import Header from "next/head";
import { NextPage } from "next";
export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Never loose contact with your friends again",
  owner,
  additionalKeywords = [],
  embed,
}) => {
  return (
    <Header>
      {title ? (
        <title>{title} - Frogact</title>
      ) : (
        <title>Frogact - Never forget</title>
      )}
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`Frogact - Never loose contact with your friends again, Frogact${additionalKeywords?.map(
          (k) => `, ${k}`
        )}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#449DD1"} />
      {embed ? (
        <>
          <meta
            name="og:title"
            content={
              title || "Frogact - Never loose contact with your friends again"
            }
          />
          <meta
            name="og:type"
            content={owner ? "article.radio_station" : "website"}
          />
          {owner ? <meta name="article:author" content={owner} /> : ""}
          <meta name="og:description" content={description} />
          <meta
            name="og:site_name"
            content="Frogact - Never loose contact with your friends again"
          />
          {embed?.image ? (
            <meta name="og:image" content={`${embed?.image}`} />
          ) : (
            <meta name="og:image" content={`/frogact.png`} />
          )}
        </>
      ) : (
        ""
      )}
    </Header>
  );
};
