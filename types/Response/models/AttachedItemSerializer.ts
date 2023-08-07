/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttachedItemCoinSerializer } from './AttachedItemCoinSerializer';

export type AttachedItemSerializer = {
  item_display_name: string;
  category_type:
    | 'skin'
    | 'eyebrow'
    | 'nose'
    | 'mouth'
    | 'ear'
    | 'face_shape'
    | 'lip'
    | 'eye_surrounding'
    | 'eyeline'
    | 'eyelash'
    | 'iris'
    | 'eye_white'
    | 'eye_highlight'
    | 'base_hair'
    | 'all_hair'
    | 'hair_front'
    | 'hair_back'
    | 'whole_body'
    | 'head'
    | 'neck'
    | 'shoulder'
    | 'arm'
    | 'hand'
    | 'chest'
    | 'torso'
    | 'waist'
    | 'leg'
    | 'tops'
    | 'bottoms'
    | 'onepiece'
    | 'shoes'
    | 'inner'
    | 'socks'
    | 'neck_accessory'
    | 'arm_accessory'
    | 'safety'
    | 'cheek';
  downloadable: boolean;
  take_free: boolean;
  id: string;
  attached_item_coins: Array<AttachedItemCoinSerializer>;
};
