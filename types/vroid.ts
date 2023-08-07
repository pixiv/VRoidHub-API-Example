export type ModelData = {
  id: string;
  characterName: string;
  modelName: string;
  portraitImageUrl: string;
  fullBodyImageUrl: string;
  iconSquareImageUrl: string;
  license: {
    characterization: boolean;
    violentExpression: boolean;
    sexualExpression: boolean;
    corporateCommercialUse: boolean;
    personalCommercialUse: boolean;
    personalNonCommercialUse: boolean;
    modification: boolean;
    credit: boolean; //不要時にtrue
    redistribution: boolean;
  };
  user: {
    name: string;
    iconUrl: string;
  };
  format: string;
  createdAt: string;
  originalFileSize: number;
};
