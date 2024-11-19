export const calcRegistrationTaxStampAmount = (numberOfPages: number | null, numberOfCopies: number | null) => {
  if (!numberOfPages || !numberOfCopies) {
    return null;
  }

  return numberOfCopies * numberOfPages * 4;
};
