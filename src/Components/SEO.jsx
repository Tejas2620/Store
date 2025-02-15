import React from "react";
import { Helmet } from "react-helmet";

export const SEO = ({ title, description, image }) => {
  return (
    <Helmet>
      <title>{title} | SneakPro</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Helmet>
  );
};
