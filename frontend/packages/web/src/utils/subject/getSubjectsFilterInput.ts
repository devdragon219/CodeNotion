import {
  CompanyGroup,
  ContactInfoType,
  EntryStatus,
  LegalSubjectType,
  PersonType,
  SubjectFilterInput,
  SubjectRelationType,
  TaxStatusType,
} from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, parseDateToString } from '@realgimm5/frontend-common/utils';

import { LegalNature } from '../../enums/LegalNature';
import { SubjectType } from '../../enums/SubjectType';
import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';

export const getSubjectsFilterInput = (
  { id: columnId }: TableColumn<SubjectFragment>,
  value: unknown,
): SubjectFilterInput => {
  switch (columnId) {
    case 'subjectType': {
      switch (value as SubjectType) {
        case SubjectType.ManagementSubject:
          return {
            personType: {
              eq: PersonType.ManagementSubject,
            },
          };
        case SubjectType.Other:
          return {
            personType: {
              in: [PersonType.LegalPerson, PersonType.PhysicalPerson],
            },
          };
      }
      break;
    }
    case 'legalNature': {
      switch (value as LegalNature) {
        case LegalNature.LegalPerson:
          return {
            or: [
              {
                personType: {
                  eq: PersonType.ManagementSubject,
                },
              },
              {
                personType: {
                  eq: PersonType.LegalPerson,
                },
                legalSubjectType: {
                  eq: LegalSubjectType.ActualLegalSubject,
                },
              },
            ],
          };
        case LegalNature.PhysicalPerson:
          return {
            personType: {
              eq: PersonType.PhysicalPerson,
            },
          };
        case LegalNature.Other:
          return {
            personType: {
              eq: PersonType.LegalPerson,
            },
            legalSubjectType: {
              in: [LegalSubjectType.UnrecognizedBusinessSociety, LegalSubjectType.UnrecognizedNonbusinessSociety],
            },
          };
      }
      break;
    }
    case 'entryStatus':
      return {
        entryStatus: {
          in: value as EntryStatus[],
        },
      };
    case 'vatNumber':
      return {
        or: [
          {
            baseCountryTaxIdCode: {
              contains: value as string,
            },
          },
          {
            professionalTaxIdCode: {
              contains: value as string,
            },
          },
        ],
      };
    case 'taxIdCode':
      return {
        or: [
          {
            additionalTaxIdCode: {
              contains: value as string,
            },
          },
          {
            birthCountryTaxIdCode: {
              contains: value as string,
            },
          },
        ],
      };
    case 'legalResidentialAddress.countryISO':
      return {
        legalResidentialAddress: {
          countryISO: {
            or: (value as string[]).map((value) => ({
              eq: value,
            })),
          },
        },
      };
    case 'legalResidentialAddress.toponymy':
      return {
        legalResidentialAddress: {
          or: [
            {
              toponymy: {
                contains: value as string,
              },
            },
            {
              numbering: {
                contains: value as string,
              },
            },
          ],
        },
      };
    case 'owningMgmtSubjects':
      return {
        relationSubordinates: {
          some: {
            relationType: {
              eq: SubjectRelationType.ManagementEntityOwned,
            },
            main: {
              name: {
                contains: value as string,
              },
            },
          },
        },
      };
    case 'category':
      return {
        categories: {
          some: {
            id: {
              in: value as number[],
            },
          },
        },
      };
    case 'companyGroupParent.main.name':
      return {
        relationSubordinates: {
          some: {
            relationType: {
              eq: SubjectRelationType.CompanyGroup,
            },
            main: {
              name: {
                contains: value as string,
              },
            },
          },
        },
      };
    case 'companyGroupParent.groupRelationType':
      return value
        ? {
            relationSubordinates: {
              some: {
                relationType: {
                  eq: SubjectRelationType.CompanyGroup,
                },
                groupRelationType: {
                  eq: CompanyGroup.Leader,
                },
              },
            },
          }
        : {
            personType: {
              in: [PersonType.LegalPerson, PersonType.ManagementSubject],
            },
            relationSubordinates: {
              all: {
                or: [
                  {
                    relationType: {
                      neq: SubjectRelationType.CompanyGroup,
                    },
                  },
                  {
                    groupRelationType: {
                      eq: CompanyGroup.Member,
                    },
                  },
                ],
              },
            },
          };
    case 'splitPayment':
      return value
        ? {
            taxStatuses: {
              some: {
                taxStatusType: {
                  eq: TaxStatusType.ApplySplitPayment,
                },
                or: [
                  {
                    until: {
                      eq: null,
                    },
                  },
                  {
                    until: {
                      gt: parseDateToString(new Date()),
                    },
                  },
                ],
              },
            },
          }
        : {
            taxStatuses: {
              all: {
                or: [
                  {
                    taxStatusType: {
                      neq: TaxStatusType.ApplySplitPayment,
                    },
                  },
                  {
                    until: {
                      neq: null,
                      lt: parseDateToString(new Date()),
                    },
                  },
                ],
              },
            },
          };
    case 'email':
      return {
        contacts: {
          some: {
            contactInfoType: {
              eq: ContactInfoType.EMail,
            },
            contactInfo: {
              contains: value as string,
            },
          },
        },
      };
    case 'registeredEmail':
      return {
        contacts: {
          some: {
            contactInfoType: {
              eq: ContactInfoType.RegisteredEmail,
            },
            contactInfo: {
              contains: value as string,
            },
          },
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
