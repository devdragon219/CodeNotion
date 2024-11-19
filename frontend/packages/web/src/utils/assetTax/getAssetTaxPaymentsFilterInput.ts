import { AssetTaxDetailRowFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { AssetTaxPaymentFormInput } from '../../interfaces/FormInputs/AssetTax';

export const getAssetTaxPaymentsFilterInput = (
  { id: columnId }: TableColumn<AssetTaxPaymentFormInput>,
  value: unknown,
): AssetTaxDetailRowFilterInput => {
  const getAddressFilterInput = () => ({
    address: {
      or: ['toponymy', 'numbering', 'localPostCode', 'cityName', 'countryName'].map((key) => ({
        [key]: {
          contains: value,
        },
      })),
    },
  });

  switch (columnId) {
    case 'estate':
      return {
        subRows: {
          some: {
            estateInternalCode: {
              contains: value as string,
            },
          },
        },
      };
    case 'estateUnit':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                estateUnitInternalCode: {
                  contains: value as string,
                },
              },
            },
          },
        },
      };
    case 'address':
      return {
        or: [
          getAddressFilterInput(),
          {
            subRows: {
              some: getAddressFilterInput(),
            },
          },
          {
            subRows: {
              some: {
                subRows: {
                  some: getAddressFilterInput(),
                },
              },
            },
          },
        ],
      };
    case 'cadastralCoordinates':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                cadastralCoordinates: {
                  some: {
                    or: ['level1', 'level2', 'level3', 'level4', 'unmanagedOverride'].map((key) => ({
                      [key]: {
                        contains: value,
                      },
                    })),
                  },
                },
              },
            },
          },
        },
      };
    case 'cadastralUnitIncome.macroCategory':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                cadastralUnitIncome: {
                  macroCategory: {
                    contains: value as string,
                  },
                },
              },
            },
          },
        },
      };
    case 'cadastralUnitIncome.microCategory':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                cadastralUnitIncome: {
                  microCategory: {
                    contains: value as string,
                  },
                },
              },
            },
          },
        },
      };
    case 'cadastralUnitIncome.metricAmount':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                cadastralUnitIncome: getTableRangeFilter('metricAmount', value),
              },
            },
          },
        },
      };
    case 'actualizedCadastralIncome':
      return {
        or: [
          {
            subRows: {
              some: getTableRangeFilter('totalActualizedCadastralIncome', value),
            },
          },
          {
            subRows: {
              some: {
                subRows: {
                  some: getTableRangeFilter('actualizedCadastralIncome', value),
                },
              },
            },
          },
        ],
      };
    case 'grossCadastralIncome':
      return {
        or: [
          {
            subRows: {
              some: getTableRangeFilter('totalGrossCadastralIncome', value),
            },
          },
          {
            subRows: {
              some: {
                subRows: {
                  some: getTableRangeFilter('grossCadastralIncome', value),
                },
              },
            },
          },
        ],
      };
    case 'cadastralUnitIncome.type':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                cadastralUnitIncome: createObjectFromKey('type', {
                  in: value,
                }),
              },
            },
          },
        },
      };
    case 'estateUnitOwnershipPercent':
      return {
        subRows: {
          some: {
            subRows: {
              some: getTableRangeFilter('estateUnitOwnershipPercent', value),
            },
          },
        },
      };
    case 'baseTaxableAmount':
      return {
        or: [
          {
            subRows: {
              some: getTableRangeFilter('totalBaseTaxableAmount', value),
            },
          },
          {
            subRows: {
              some: {
                subRows: {
                  some: getTableRangeFilter('baseTaxableAmount', value),
                },
              },
            },
          },
        ],
      };
    case 'cadastralUnitTaxConfig.value':
      return {
        subRows: {
          some: {
            subRows: {
              some: {
                cadastralUnitTaxConfig: {
                  value: {
                    contains: value as string,
                  },
                },
              },
            },
          },
        },
      };
    case 'amountPaid':
      return {
        or: [
          {
            subRows: {
              some: getTableRangeFilter('totalAmountPaid', value),
            },
          },
          {
            subRows: {
              some: {
                subRows: {
                  some: getTableRangeFilter('amountPaid', value),
                },
              },
            },
          },
        ],
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
