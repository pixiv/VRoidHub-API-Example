/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CharacterModelSerializer } from './CharacterModelSerializer';

export type HeartSerializer = {
  id: string;
  character_model: CharacterModelSerializer;
  created_at: string;
};
