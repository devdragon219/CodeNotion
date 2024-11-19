import {
  EstateUnitMergeFormInput,
  EstateUnitSplitFormInput,
  EstateUnitTransformFormInput,
} from '../../interfaces/FormInputs/EstateUnitActions';
import { getEmptyEstateUnitFormInput } from '../estateUnit/initialValues';

export const getEmptyEstateUnitMergeFormInput = (): EstateUnitMergeFormInput => ({
  fromEstateUnits: [],
  toEstateUnit: getEmptyEstateUnitFormInput(),
});

export const getEmptyEstateUnitSplitFormInput = (): EstateUnitSplitFormInput => ({
  fromEstateUnit: null,
  toEstateUnits: [],
});

export const getEmptyEstateUnitTransformFormInput = (): EstateUnitTransformFormInput => ({
  fromEstateUnit: null,
  toEstateUnit: getEmptyEstateUnitFormInput(),
});
