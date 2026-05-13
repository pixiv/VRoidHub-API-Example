/* istanbul ignore file */

import type { HeartSerializer } from './HeartSerializer';
import type { ResponseSerializer } from './ResponseSerializer';
export type HeartCollectionResponse = {
  data: Array<HeartSerializer>;
} & ResponseSerializer;
