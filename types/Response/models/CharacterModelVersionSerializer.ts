/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttachedItemSerializer } from './AttachedItemSerializer';
import type { ModelBasisConversionStateSerializer } from './ModelBasisConversionStateSerializer';
import type { VendorSpecifiedLicenseSerializer } from './VendorSpecifiedLicenseSerializer';

export type CharacterModelVersionSerializer = {
  id: string;
  created_at: string;
  spec_version: string | null;
  exporter_version: string | null;
  triangle_count: number;
  mesh_count: number;
  mesh_primitive_count: number;
  mesh_primitive_morph_count: number;
  material_count: number;
  texture_count: number;
  joint_count: number;
  is_vendor_forbidden_use_by_others: boolean;
  is_vendor_protected_download: boolean;
  is_vendor_forbidden_other_users_preview: boolean;
  original_file_size: number | null;
  vrm_meta: any;
  original_compressed_file_size: number | null;
  conversion_state?: ModelBasisConversionStateSerializer;
  vendor_specified_license?: VendorSpecifiedLicenseSerializer;
  attached_items?: Array<AttachedItemSerializer>;
};
