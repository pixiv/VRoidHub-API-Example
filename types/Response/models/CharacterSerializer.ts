/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserSerializer } from './UserSerializer';

export type CharacterSerializer = {
  user: UserSerializer;
  id: string;
  name: string;
  is_private: boolean;
  created_at: string;
  published_at: string | null;
};
