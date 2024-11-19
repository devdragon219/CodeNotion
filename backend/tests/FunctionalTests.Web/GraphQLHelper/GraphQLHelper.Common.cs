using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Common
  {
    public static string AddressFragment() => """
      id
      cityName
      cityReference
      countyName
      countyReference
      regionName
      regionReference
      countryName
      countryISO
      toponymy
      numbering
      localPostCode
      notes
      """;

    public static string VATRateFragment() => """
      id
      internalCode
      description
      type
      ratePercent
      """;

    public static string InterestRateFragment() => """
      id
      rate
      since
      until
      """;

    public static string BillItemTypeFragment() => """
      id
      description
      internalCode
      isForContractFee
      isForContractCosts
      isForAdministration
      isPositive
      activeSubjectVR {
        id
      }
      activeExemptVR {
        id
      }
      activeNonTaxableVR {
        id
      }
      passiveSubjectVR {
        id
      }
      passiveExemptVR {
        id
      }
      passiveNonTaxableVR {
        id
      }
      """;

    public static string AccountingItemFragment() => """
      id
      description
      internalCode
      externalCode
      """;

    public static string NotificationFragment() => $$"""
      username
      timestamp
      status
      id
      ... on {{nameof(EstatePortfolioExportIsReadyNotification)}} {
        downloadGuid
        isSuccess
      }
      ... on {{nameof(DocumentExpiredNotification)}} {
        documentCmisId
        entityId
      }
      ... on {{nameof(ContractsExpirationNotification)}} {
        contractIds
        isActiveContracts
        daysToExpiration
      }
      ... on {{nameof(CostChargesExpirationNotification)}} {
        costChargeIds
        daysToExpiration
      }
      ... on {{nameof(CatalogueItemDocumentExpiredNotification)}} {
        estateId
        catalogueTypeId
      }
      ... on {{nameof(ContractDocumentExpiredNotification)}} {
        isContractActive
        isContractSublocated
      }
      ... on {{nameof(PasswordExpirationNotification)}} {
        passwordExpirationDate
      }
      """;

    public static string ContactFragment() => """
      id
      contactType
      contactInfo
      contactInfoType
      notes
      """;

    public static string CityFragment() => """
      id
      name
      name2
      name3
      guid
      cityProvider
      countyName
      countyGuid
      regionName
      regionGuid
      countryName
      countryISO
      cadastralCode
      cityExternalCode
      countyExternalCode
      regionExternalCode
      countyShortCode
      isCountyMainCity
      climateZoneCode
      """;

    public static string RevaluationDataFragment() => """
      id
      year
      month
      dataProvider
      countryISO3
      baseYear
      revaluationIndex
      """;
  }
}
