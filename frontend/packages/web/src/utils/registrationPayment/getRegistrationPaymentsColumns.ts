import { AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { RegistrationPaymentFragment } from '../../gql/RealGimm.Web.RegistrationPayment.fragment';

export const getRegistrationPaymentsColumns = (): TableColumn<RegistrationPaymentFragment>[] => {
  const getContractEstate = (row: RegistrationPaymentFragment) =>
    row.contract.locatedUnits.find((it) => it.isMainUnit)?.estateUnit.estate;
  const getContractEstateAddress = (row: RegistrationPaymentFragment) =>
    getContractEstate(row)?.addresses.find((it) => it.addressType === AsstAddressType.Primary);

  return [
    {
      id: 'paymentCode',
      label: 'registration_payment.field.payment_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'contract.managementSubjectName',
      label: 'registration_payment.field.management_subject',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      getRowValue: (row) => row.contract.managementSubject.name,
    },
    {
      id: 'valueDate',
      label: 'registration_payment.field.payment_date',
      type: 'date',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'paymentYear',
      type: 'number',
      label: 'registration_payment.field.payment_year',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'contract.estate',
      label: 'registration_payment.field.contract_code',
      getRowValue: (row) => getContractEstate(row)?.internalCode,
    },
    {
      id: 'contract.address.toponymy',
      label: 'registration_payment.field.address_toponymy',
      getRowValue: (row) =>
        [getContractEstateAddress(row)?.toponymy, getContractEstateAddress(row)?.numbering]
          .filter((it) => !!it)
          .join(', '),
    },
    {
      id: 'contract.address.city',
      label: 'registration_payment.field.address_city',
      getRowValue: (row) => getContractEstateAddress(row)?.cityName,
    },
    {
      id: 'contract.address.county',
      label: 'registration_payment.field.address_county',
      getRowValue: (row) => getContractEstateAddress(row)?.countyName,
    },
  ];
};
