/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CharacterModelLicenseSerializer = {
  /**
   * v3から廃止
   * @deprecated
   */
  allow_modification?: boolean;
  /**
   * v3から廃止
   * @deprecated
   */
  allow_redistribution?: boolean;
  /**
   * v3から廃止
   * @deprecated
   */
  allow_sexual_expression?: boolean;
  /**
   * v3から廃止
   * @deprecated
   */
  allow_violent_expression?: boolean;
  /**
   * v3から廃止
   * @deprecated
   */
  allow_corporate_commercial_use?: boolean;
  modification: 'default' | 'disallow' | 'allow';
  redistribution: 'default' | 'disallow' | 'allow';
  /**
   * v3からdefaultが追加
   */
  credit: 'default' | 'necessary' | 'unnecessary';
  /**
   * v3からdefaultが追加
   */
  characterization_allowed_user: 'default' | 'author' | 'everyone';
  sexual_expression: 'default' | 'disallow' | 'allow';
  violent_expression: 'default' | 'disallow' | 'allow';
  corporate_commercial_use: 'default' | 'disallow' | 'allow';
  /**
   * v3からdefaultが追加
   */
  personal_commercial_use: 'default' | 'disallow' | 'profit' | 'nonprofit';
};
