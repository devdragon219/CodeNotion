import { UserType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getUserConfigSchema = (t: TFunction) =>
  object().shape({
    officeAccess: string().required(getRequiredTranslation('user.field.office_access', t)),
    supplierSubject: object()
      .nullable()
      .when('userType', {
        is: UserType.ExternalSupplier,
        then: (schema) => schema.required(getRequiredTranslation('user.field.supplier_subject', t)),
      }),
    groups: array().min(1, getRequiredTranslation('user.field.groups', t)),
  });
