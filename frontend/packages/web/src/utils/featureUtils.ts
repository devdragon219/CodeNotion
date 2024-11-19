import { FEATURE_GROUP_NAMES, FEATURE_NAMES } from '../configs/features';
import { Feature } from '../interfaces/Feature';

export const isFeatureGroup = (groupCode: string): boolean => groupCode in FEATURE_GROUP_NAMES;

export const isFeature = (featureCode: string): featureCode is Feature => featureCode in FEATURE_NAMES;

export const getFeatureGroup = (featureCode: string) => `${featureCode.substring(0, featureCode.length - 2)}00`;

export const findGroupFeatures = (groupCode: string) =>
  Object.keys(FEATURE_NAMES).filter((featureCode) =>
    featureCode.match(new RegExp(`^${groupCode.substring(0, featureCode.length - 2)}\\d\\d`)),
  );
