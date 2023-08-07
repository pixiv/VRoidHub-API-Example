/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ImageSerializer } from './ImageSerializer';

export type FullBodyImageSerializer = {
  is_default_image: boolean;
  original: ImageSerializer;
  w600: ImageSerializer;
  w300: ImageSerializer;
};
