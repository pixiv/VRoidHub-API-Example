/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HeartSerializer } from './HeartSerializer';
import type { ResponseSerializer } from './ResponseSerializer';
export type HeartCollectionResponse = {
  data: Array<HeartSerializer>;
} & ResponseSerializer;
