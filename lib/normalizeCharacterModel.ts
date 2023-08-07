import { CharacterModelSerializer } from '../types/Response';

export const normalizeCharacterModel = (model: CharacterModelSerializer) => {
  const format = model.latest_character_model_version.spec_version;
  const license = {
    characterization: false,
    violentExpression: false,
    sexualExpression: false,
    corporateCommercialUse: false,
    personalCommercialUse: false,
    personalNonCommercialUse: false,
    credit: false,
    redistribution: false,
    modification: false,
  };

  if (format == '1.0') {
    license.characterization =
      model.latest_character_model_version.vrm_meta.avatarPermission == 'everyone' ? true : false;
    license.violentExpression = model.latest_character_model_version.vrm_meta.allowExcessivelyViolentUsage;
    license.sexualExpression = model.latest_character_model_version.vrm_meta.allowExcessivelySexualUsage;
    license.corporateCommercialUse =
      model.latest_character_model_version.vrm_meta.commercialUsage == 'corporation' ? true : false;
    license.personalCommercialUse =
      model.latest_character_model_version.vrm_meta.commercialUsage == 'personalProfit' ||
      license.corporateCommercialUse
        ? true
        : false;
    license.personalNonCommercialUse =
      model.latest_character_model_version.vrm_meta.commercialUsage == 'personalNonProfit' ||
      license.personalCommercialUse
        ? true
        : false;
    license.credit = model.latest_character_model_version.vrm_meta.creditNotation == 'unnecessary' ? true : false;
    license.redistribution = model.latest_character_model_version.vrm_meta.allowRedistribution;
    license.modification =
      model.latest_character_model_version.vrm_meta.modification == 'allowModificationRedistribution' ? true : false;
  } else {
    license.characterization = model.license.characterization_allowed_user == 'everyone' ? true : false;
    license.violentExpression = model.license.violent_expression == 'allow' ? true : false;
    license.sexualExpression = model.license.sexual_expression == 'allow' ? true : false;
    license.corporateCommercialUse = model.license.corporate_commercial_use == 'allow' ? true : false;
    license.personalCommercialUse = model.license.personal_commercial_use == 'profit' ? true : false;
    license.personalNonCommercialUse = model.license.personal_commercial_use == 'nonprofit' || 'profit' ? true : false;
    license.credit = model.license.credit == 'unnecessary' ? true : false;
    license.redistribution = model.license.redistribution == 'allow' ? true : false;
    license.modification = model.license.modification == 'allow' ? true : false;
  }

  return {
    id: model.id,
    characterName: model.character.name,
    modelName: model.name,
    portraitImageUrl: model.portrait_image.w600.url,
    fullBodyImageUrl: model.full_body_image.w600.url,
    iconSquareImageUrl: model.portrait_image.sq300.url,
    license: license,
    format: format ? `VRM${format}` : 'VRM0.0',
    user: {
      name: model.character.user.name,
      iconUrl: model.character.user.icon.sq50.url,
    },
    createdAt: model.character.created_at,
    originalFileSize: model.latest_character_model_version.original_file_size,
  };
};
