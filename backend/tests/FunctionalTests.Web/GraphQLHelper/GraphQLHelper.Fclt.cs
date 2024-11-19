using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Fclt
  {
    public static string QualificationLevelFragment() => """
      id
      internalCode
      name
      ordering
      """;

    public static string InterventionTypeFragment() => """
      id
      internalCode
      name
      """;

    public static string TicketTypeFragment() => """
      id
      internalCode
      description
      ordering
      """;

    public static string CraftFragment() => """
      id
      internalCode
      name
      ordering
      """;

    public static string PriceListMeasurementUnitFragment() => """
      id
      internalCode
      name
      ordering
      """;

    public static string ContractTypeFragment() => """
      id
      internalCode
      name
      ordering
      """;

    public static string WorkerFragment(bool includeCraft = false, bool includeQualificationLevel = false)
      => """
          id
          firstName
          lastName
          since
          until
          """
          .AppendLineIfTrue(includeCraft, new(() => $$"""
            craft {
              {{CraftFragment()}}
            }
            """))
          .AppendLineIfTrue(includeQualificationLevel, new(() => $$"""
            qualificationLevel {
              {{QualificationLevelFragment()}}
            }
            """));

    public static string WorkTeamFragment(bool includeWorkers = false)
      => """
          id
          internalCode
          description
          providerSubject {
            id
            name
          }
          leaderUser {
            id
            firstName
            lastName
          }
          insertionDate
          """
          .AppendLineIfTrue(includeWorkers, new(() => $$"""
            workers {
              {{WorkerFragment(includeCraft: true, includeQualificationLevel: true)}}
            }
            """));

    public static string CalendarDayFragment() => """
      id
      dayOfWeek
      timeRanges {
        since
        until
      }
      """;

    public static string CalendarFragment(bool includeDays = false, bool includeHolidays = false)
      => """
          id
          name
          timeZoneId
          """
          .AppendLineIfTrue(includeDays, new(() => $$"""
            sunday {
              {{CalendarDayFragment()}}
            }
            monday {
              {{CalendarDayFragment()}}
            }
            tuesday {
              {{CalendarDayFragment()}}
            }
            wednesday {
              {{CalendarDayFragment()}}
            }
            thursday {
              {{CalendarDayFragment()}}
            }
            friday {
              {{CalendarDayFragment()}}
            }
            saturday {
              {{CalendarDayFragment()}}
            }
            """))
          .AppendLineIfTrue(includeHolidays, new(() => $$"""
            holidays {
              id
              date
              periodicity
            }
            """));

    public static string PenaltyValueFragment() => """
      type
      amount
      """;

    public static string PenaltyFragment(bool includeConditions = false, bool includePenalties = false)
      => $$"""
        id
        internalCode
        description
        """
        .AppendLineIfTrue(includeConditions, new(() => $$"""
          ifCondition {
            id
          }
          flatIfConditions {
            {{TicketConditionFragment()}}
          }
          """))
        .AppendLineIfTrue(includePenalties, new(() => $$"""
          thenOperator
          thenPenalties {
            {{PenaltyValueFragment()}}
          }
          """));

    public static string SLAFragment(bool includeConditions = false)
      => $$"""
        id
        internalCode
        description
        """
        .AppendLineIfTrue(includeConditions, new(() => $$"""
          ifCondition {
            id
          }
          flatIfConditions {
            {{TicketConditionFragment()}}
          }
          thenCondition {
            id
          }
          flatThenConditions {
            {{TicketConditionFragment()}}
          }
          """));

    public static string TicketConditionFragment() => $$"""
      id
      ... on {{nameof(ComplexTicketCondition)}} {
        complextConditionOperator: operator
        internalConditions {
          id
        }
      }
      ... on {{nameof(TicketTypeEqualityCondition)}} {
        ticketTypeEqualityOperator: operator
        targetTicketType {
          {{TicketTypeFragment()}}
        }
      }
      ... on {{nameof(TicketMasterStatusCondition)}} {
        targetMasterStatus
        calendar {
          {{CalendarFragment()}}
        }
        timeComparisonOperator
        minTimePeriodInMinutes
        maxTimePeriodInMinutes
      }
      ... on {{nameof(TicketCatalogueCategoryEqualityCondition)}} {
        operator
        targetCatalogueCategory {
          id
          name
        }
      }
      ... on {{nameof(TicketCatalogueSubCategoryEqualityCondition)}} {
        operator
        targetCatalogueSubCategory {
          id
          name
        }
      }
      ... on {{nameof(TicketCatalogueTypeEqualityCondition)}} {
        operator
        targetCatalogueType {
          id
          name
        }
      }
      ... on {{nameof(TicketPriorityEqualityCondition)}} {
        operator
        targetPriority
      }
      """;

    public static string TicketChecklistTemplateFragment(
      bool includePreventativeData = false,
      bool includeOnTriggerData = false)
      => $$"""
          id
          internalCode
          name
          catalogueType {
            name
            category {
              name
            }
            subCategory {
              name
            }
          }
          type
          rawWorkCost
          safetyCost
          costBaseFactor          
          """
          .AppendLineIfTrue(includePreventativeData, new(() => $$"""
            preventativePlannedPeriod
            preventativeDaysOfWeek
            preventativeToleranceDays
            preventativeActivities {
              {{Asst.CatalogueTypeActivityFragment()}}
            }
            preventativeInterventionType {
              {{InterventionTypeFragment()}}
            }
            preventativeCraft {
              {{CraftFragment()}}
            }
            """))
          .AppendLineIfTrue(includeOnTriggerData, new(() => $$"""
            onTriggerActivities {
              {{Asst.CatalogueTypeActivityFragment()}}
            }
            onTriggerInterventionType {
              {{InterventionTypeFragment()}}
            }
            onTriggerCraft {
              {{CraftFragment()}}
            }
            """));

    public static string TicketChecklistFragment(
      bool includePreventativeData = false,
      bool includeOnTriggerData = false)
      => $$"""
          id
          internalCode
          name
          estateUnit {
            id
            name
          }
          catalogueType {
            name
            category {
              name
            }
            subCategory {
              name
            }
          }
          type
          rawWorkCost
          safetyCost
          costBaseFactor          
          """
          .AppendLineIfTrue(includePreventativeData, new(() => $$"""
            preventativePlannedPeriod
            preventativeDaysOfWeek
            preventativeToleranceDays
            preventativeActivities {
              {{Asst.CatalogueTypeActivityFragment()}}
            }
            preventativeInterventionType {
              {{InterventionTypeFragment()}}
            }
            preventativeCraft {
              {{CraftFragment()}}
            }
            """))
          .AppendLineIfTrue(includeOnTriggerData, new(() => $$"""
            onTriggerActivities {
              {{Asst.CatalogueTypeActivityFragment()}}
            }
            onTriggerInterventionType {
              {{InterventionTypeFragment()}}
            }
            onTriggerCraft {
              {{CraftFragment()}}
            }
            """));


    public static string ContractTemplateFragment(bool includeSLAs = false, bool includePenalties = false)
      => $$"""
          id
          internalCode
          description
          contractType {
            {{ContractTypeFragment()}}
          }
          catalogueTypeIds    
          """
          .AppendLineIfTrue(includeSLAs, new(() => $$"""
            slas {
              {{SLAFragment(includeConditions: true)}}
            }
            """))
          .AppendLineIfTrue(includePenalties, new(() => $$"""
            penalties {
              {{PenaltyFragment(includeConditions: true, includePenalties: true)}}
            }
            """));

    public static string PriceListFragment() => """
      id
      internalCode
      name
      ordering
      isDefault
      """;

    public static string PriceListArticleFragment() => $$"""
      id
      internalCode
      name
      measurementUnit {
        {{PriceListMeasurementUnitFragment()}}
      }
      priceList {
        name
      }
      pricePeriods {
        since
        until
        price
      }
      catalogueTypes {
        id
        name
        category {
          id
          name
        }
        subCategory {
          id
          name
        }
      }
      actualPrice
      actualPriceSince
      actualPriceUntil
      """;

    public static string ContractFragment(bool includeDetails = false)
      => $$"""
          id
          internalCode
          externalCode
          description
          type {
            {{ContractTypeFragment()}}
          }
          entryStatus
          agreementDate
          effectiveDate
          expirationDate
          cancellationNoticeDaysCount
          renewalNoticeDaysCount
          maximumRenewalDaysCount
          """
          .AppendLineIfTrue(includeDetails, new(() => $$"""
            slas {
              {{SLAFragment(includeConditions: true)}}
            }
            penalties {
              {{PenaltyFragment(includeConditions: true, includePenalties: true)}}
            }
            originalTemplate {
              id
              description
            }
            providerSubject {
              id
              name
            }
            frameworkAgreements {
              id
              externalCode
              notes
            }
            originalEstateUnitGroup {
              id
              name
            }
            estateUnits {
              {{Asst.EstateUnitFragment()}}
            }
            catalogueTypes {
              {{Asst.CatalogueTypeFragment()}}
            }
            ticketChecklists {
              {{TicketChecklistFragment(includePreventativeData: true, includeOnTriggerData: true)}}
            }
            billingInfo {
              billingPeriod
              vatPercentage
              purchaseFeeWithoutVAT
              fixedRateFee
              discountPercentage            
            }
            priceLists {
              {{PriceListFragment()}}
            }
            termExtensions {
              id
              daysCount
              feeDifference
              notes            
            }
            """));
    public static string ServiceFragment()
      => $$"""
          id
          name
          internalCode
          category {
            {{ServiceCategoryFragment()}}
          }
          subCategory {
            {{ServiceSubCategoryFragment()}}
          }
          activities {
            {{ServiceActivityFragment()}}
          }
          """;

    public static string ServiceCategoryFragment() => """
      id
      name
      internalCode
      """;
          
    public static string ServiceSubCategoryFragment() => """
      id
      name
      internalCode
      """;
          
    public static string ServiceActivityFragment() => """
      id
      name
      activityType
      isMandatoryByLaw
      """;
  }
}
