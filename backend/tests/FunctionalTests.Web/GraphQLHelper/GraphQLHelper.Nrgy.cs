using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class GraphQLHelper
{
  public static class Nrgy
  {
    public static string UtilityTypeFragment() => $$"""
      id
      internalCode
      category
      description
      externalCode
      expenseClass
      meteringType
      measurementUnit
      timeOfUseRateCount
      measurementUnitDescription
      hasHeatingAccountingSystem
      chargeFields {
        {{UtilityChargeFieldFragment()}}
      }
      """;

    public static string UtilityChargeFieldFragment() => """
      name
      isMandatory
      id
      type
      validValues
      """;

    public static string UtilityServiceFragment() => $$"""
      id
      internalCode
      estateIds
      estateUnitIds
      providerSubjectId
      referenceSubjectId
      orgUnitId
      accountingItemId
      description
      utilityUserCode
      utilityContractCode
      utilityMeterSerial
      utilityDeliveryPointCode
      isFreeMarket
      deposit
      status
      activationDate
      deactivationRequestDate
      deactivationDate
      contractPowerMaximum
      contractPowerNominal
      contractNominalTension
      utilityType {
        {{UtilityTypeFragment()}}
      }
      """;

    public static string ReadingFragment() => $$"""
      id
      notes
      readingTimestamp
      isEstimated
      values {
        {{ReadingValueFragment()}}
      }
      """;

    public static string ReadingValueFragment() => """
      id
      touRateIndex
      value
      """;

    public static string CostChargeFragment(
      bool includeFields = false,
      bool includeConsumption = false,
      bool includeService = false)
      => $$"""
          id
          totalAmount
          referenceDate
          dueDate
          invoiceNumber
          totalVATAmount
          invoicedConsumptionAmount
          totalAmount
          referenceDate
          dueDate
          invoiceNumber
          totalVATAmount
          invoicedConsumptionAmount
          """
          .AppendLineIfTrue(includeConsumption, new($$"""
          actualConsumption {
            {{CostChargeConsumptionFragment()}}
          }
          expectedConsumption {
            {{CostChargeConsumptionFragment()}}
          }
          """))
          .AppendLineIfTrue(includeFields, new($$"""
          fields {
            {{CostChargeFieldFragment()}}
          }
          """))
          .AppendLineIfTrue(includeService, new($$"""
          service {
            {{UtilityServiceFragment()}}
          }
          """));

    public static string CostChargeConsumptionFragment() => $$"""
      since
      until
      values {
        {{ReadingValueFragment()}}
      }
      """;

    public static string CostChargeFieldFragment() => $$"""
      name
      isMandatory
      templateTypeId
      type
      value
      """;

    public static string CostChargeAnalysisFragment() => $$"""
      key
      value {
        measurementUnit
        surface {
          currentYear {
            area
            date
          }
          previousYear {
            area
            date
          }
        }
        consumption {
          currentYearValue
          previousYearValue
          difference
          differencePercentage
        }
        cost {
          currentYearValue
          previousYearValue
          difference
          differencePercentage
        }
        perYear {
          key
          value {
            value {
              {{CostChargeAnalysisValueFragment()}}
            }
            perMonth {
              key
              value {
                {{CostChargeAnalysisValueFragment()}}
              }
            }
          }
        }
      }
      """;

    public static string CostChargeAnalysisValueFragment() => $$"""
      totalConsumption
      consumptionPerGrossSurface
      consumptionPerHeatingCoolingSurface
      totalCost
      costPerGrossSurface
      costPerHeatingCoolingSurface
      """;
  }
}
