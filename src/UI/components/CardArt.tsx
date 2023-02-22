import { Image, ImageProps } from "semantic-ui-react";

import React from "react";
import { siteUrl } from "../../config";

interface CardArtProps extends ImageProps {
  cardID: string;
  resolution?: 256 | 512;
}

const CardArt: React.FC<CardArtProps> = ({ cardID, resolution, ...props }) => (
  // var image_url = `https://site_url/v1/${resolution}x/${cardID}.jpg`;
  <Image
    alt={'Card'}
    src={`${siteUrl}/assets/images/1.png`}
    {...props}
  />
);

CardArt.defaultProps = {
  resolution: 256
} as Partial<CardArtProps>;

export default CardArt;
