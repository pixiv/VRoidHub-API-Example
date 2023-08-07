/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserIconSerializer } from './UserIconSerializer';

export type UserSerializer = {
  id: string;
  pixiv_user_id: string;
  name: string;
  icon: UserIconSerializer;
};
