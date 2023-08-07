/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacterModelSerializer } from './CharacterModelSerializer';
import type { ResponseSerializer } from './ResponseSerializer';
export type CharacterModelCollectionResponse = {
  data: Array<CharacterModelSerializer>;
} & ResponseSerializer;
