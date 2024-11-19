import { FEATURES, UNUSED_RAW_FEATURES } from '../configs/features';

export type UnusedRawFeature = (typeof UNUSED_RAW_FEATURES)[number];

export type Feature = Exclude<(typeof FEATURES)[number], UnusedRawFeature>;
