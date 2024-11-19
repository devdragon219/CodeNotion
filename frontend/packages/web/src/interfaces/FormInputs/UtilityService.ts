import { EntryStatus, EstateStatus, EstateType, EstateUnitType } from '@realgimm5/frontend-common/gql/types';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';
import { UtilityTypeFragment } from '../../gql/RealGimm.Web.UtilityType.fragment';
import { AccountingItemFieldValue } from '../FieldValues/AccountingItem';
import { OrgUnitFieldValue } from '../FieldValues/OrgUnit';
import { SubjectFieldValue } from '../FieldValues/Subject';

export interface UtilityServiceFormInput {
  accountingItem: AccountingItemFieldValue | null;
  activationDate: Date | null;
  contractNominalTension: string;
  contractPowerMaximum: string;
  contractPowerNominal: string;
  deactivationDate: Date | null;
  deactivationRequestDate: Date | null;
  deposit: number | null;
  description: string;
  estates: {
    addresses: AsstAddressFragment[];
    id: number;
    internalCode: string;
    managementSubjectName: string;
    name: string;
    status: EstateStatus;
    type: EstateType;
    usageTypeName: string;
  }[];
  estateUnits: {
    address: AsstAddressFragment;
    cadastralUnitCoordinates: string;
    estateId: number;
    id: number;
    internalCode: string;
    name: string;
    subNumbering: string;
    type: EstateUnitType;
    usageTypeName: string;
  }[];
  internalCode: string;
  isFreeMarket: boolean;
  notes: string;
  orgUnit: OrgUnitFieldValue | null;
  providerSubject: SubjectFieldValue | null;
  referenceSubject: SubjectFieldValue | null;
  status: EntryStatus | null;
  utilityContractCode: string;
  utilityDeliveryPointCode: string;
  utilityMeterSerial: string;
  utilityServiceId: number | null;
  utilityType: UtilityTypeFragment | null;
  utilityUserCode: string;
}
