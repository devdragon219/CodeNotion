import { ParseKeys } from 'i18next';

export const getAssetTaxTabLabel = (calculator: string) => `asset_tax.calculator.${calculator}.tab` as ParseKeys;

export const getAssetTaxSubtitleLabel = (calculator: string) =>
  `asset_tax.calculator.${calculator}.subtitle` as ParseKeys;
