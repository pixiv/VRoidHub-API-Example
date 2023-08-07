/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgeLimitSerializer } from './AgeLimitSerializer';
import type { CharacterModelBoothItemSerializer } from './CharacterModelBoothItemSerializer';
import type { CharacterModelLicenseSerializer } from './CharacterModelLicenseSerializer';
import type { CharacterModelVersionSerializer } from './CharacterModelVersionSerializer';
import type { CharacterSerializer } from './CharacterSerializer';
import type { FullBodyImageSerializer } from './FullBodyImageSerializer';
import type { PortraitImageSerializer } from './PortraitImageSerializer';
import type { TagSerializer } from './TagSerializer';

export type CharacterModelSerializer = {
  id: string;
  name: string | null;
  is_private: boolean;
  is_downloadable: boolean;
  is_comment_off: boolean;
  is_other_users_available: boolean;
  is_other_users_allow_viewer_preview: boolean;
  is_hearted: boolean;
  portrait_image: PortraitImageSerializer;
  full_body_image: FullBodyImageSerializer;
  license?: CharacterModelLicenseSerializer;
  created_at: string;
  heart_count: number;
  download_count: number;
  usage_count: number;
  view_count: number;
  published_at: string | null;
  tags: Array<TagSerializer>;
  age_limit: AgeLimitSerializer;
  character: CharacterSerializer;
  latest_character_model_version?: CharacterModelVersionSerializer;
  character_model_booth_items: Array<CharacterModelBoothItemSerializer>;
};
