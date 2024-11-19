using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static partial class Prop
  {
    public static string ContractTypeFragment() => """
      id
      description
      internalCode
      isActive
      isStampTax
      isRegistrationTax
      nature
      usageTypeId
      isRentChargeApplicable
      isAbsoluteRevaluation
      isRevaluationApplicable
      revaluationRatePercent
      revaluationCalculationMonth
      revaluationIndexMonth
      registrationTaxPercent
      registrationTaxTenantPercent
      registrationTaxIncomeType
      """;

    public static string RegistrationOfficeFragment() => """
      id
      description
      externalCode
      cityId
      """;

    public static string RegistrationPaymentFragment(bool includeContract = false)
      => $$"""
        id
        paymentType
        paymentYear
        paymentCode
        valueDate
        taxAmount
        sanctionAmount
        totalAmount
        """
      .AppendLineIfTrue(includeContract, new(() => $$"""
        contract {
          {{Contract.Fragment()}}
        }
        """));

    public static string BillFragment(bool includeContract = false)
      => $$"""
        id
        billRows {
          {{BillRowFragment()}}
        }
        internalCode
        isTemporary
        year
        transactorSubjectId
        mainCounterpartSubjectId
        estateUnitId
        isOccupiedWithoutRight
        isInvoiced
        transactorPaymentType
        date
        since
        until
        finalDate
        emissionType
        contractBillingPeriod
        totalAmount
        """
      .AppendLineIfTrue(includeContract, new(() => $$"""
        contract {
          {{Contract.Fragment()}}
        }
        """));

    private static string BillRowFragment() => """
      itemType {
        id
      }
      vatRateId
      amount
      since
      until
      notes
      """;

    public static string VATRateFragment() => """
      id
      internalCode
      description
      type
      ratePercent
      """;

    public static string AdministrationFragment(bool includeTerms = false) => """
      id
      estateId
      administrationType
      isPaymentDataIncluded
      administratorSubjectId
      administratorBankAccountId
      paymentType
      since
      until
      notes
      """
      .AppendLineIfTrue(includeTerms, new(() => $$"""
      terms {
        {{AdministrationTermFragment()}}
      }
      """));

    public static string AdministrationTermFragment(bool includeInstallments = false) => $$"""
      id
      termType
      name
      since
      until
      expectedAmount
      """
      .AppendLineIfTrue(includeInstallments, new(() => $$"""
      installments {
        {{TermInstallmentFragment()}}
      }
      """));

    public static string TermInstallmentFragment() => $$"""
      id
      installmentNumber
      dueDate
      amount
      notes
      since
      until
      billItemType {
        id
      }
      """;

    public static string RegistryCommunicationFragment(bool includePayment = false, bool includeContract = false)
      => $$"""
          id
          isSent
          date
          countryISO3
          office {
            {{RegistrationOfficeFragment()}}
          }
          type
          registryNumber
          debtBankAccountId
          debtAmount
          senderSubjectId
          estatesUnits {
            {{CommEstateUnitFragment()}}
          }
          contractCode
          requestingSubjectId
          requestingSubjectLegalRepresentativeId
          contractType
          startDate
          endDate
          contractFee
          isPayingEntireContractFee
          registryFee
          stampFee
          registryFeePenalty
          stampFeePenalty
          registryFeeInterest
          stampFeeInterest
          contractSignatureDate
          numberOfPages
          numberOfCopies
          attachedDocumentId
          """
          .AppendLineIfTrue(includePayment, new(() => $$"""
          payment {
            {{RegistrationPaymentFragment()}}
          }
          """))
          .AppendLineIfTrue(includeContract, new(() => $$"""
          contract {
            {{Contract.Fragment()}}
          }
          """));

    public static string CommEstateUnitFragment()
      => """
          id
          communicationIndex
          estateUnitId
          estateUnitType
          cityId
          cadastreType
          estatePartition
          cadastralCoordinateLevel1
          cadastralCoordinateLevel2
          cadastralCoordinateLevel3
          cadastralCoordinateLevel4
          cadastralCategory
          cadastralAddressToponymy
          cadastralAddressNumbering
          cadastralIncome
          """;
  }
}
