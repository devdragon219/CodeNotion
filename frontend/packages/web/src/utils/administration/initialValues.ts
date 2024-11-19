import { AdministrationFormInput, AdministrationsFormInput } from '../../interfaces/FormInputs/Administration';

export const getEmptyAdministrationFormInput = (): AdministrationFormInput => ({
  administrationId: null,
  administrationType: null,
  administratorSubject: null,
  bankAccount: null,
  hasTerms: false,
  estate: null,
  since: null,
  until: null,
  isPaymentDataIncluded: false,
  paymentType: null,
  notes: '',
});

export const getEmptyAdministrationsFormInput = (): AdministrationsFormInput => ({
  estate: null,
  administrations: [getEmptyAdministrationFormInput()],
});
