/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorField } from './ErrorField';
import type { LinksField } from './LinksField';

export type ResponseSerializer = {
  error: ErrorField;
  _links: LinksField;
  rand: string;
};
