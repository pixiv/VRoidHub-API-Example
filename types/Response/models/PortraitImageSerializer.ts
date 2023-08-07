/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ImageSerializer } from './ImageSerializer';

export type PortraitImageSerializer = {
  is_default_image: boolean;
  original: ImageSerializer;
  w600: ImageSerializer;
  w300: ImageSerializer;
  sq600: ImageSerializer;
  sq300: ImageSerializer;
  sq150: ImageSerializer;
};
