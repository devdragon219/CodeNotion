using RealGimm.Web.Nrgy.Models;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static class Nrgy
  {
    public static void UtilityTypeEqual(UtilityTypeInput input, UtilityType utilityType)
    {
      Assert.Equal(input.Category, utilityType.Category);
      Assert.Equal(input.Description, utilityType.Description);
      Assert.Equal(input.InternalCode, utilityType.InternalCode);
      Assert.Equal(input.ExternalCode, utilityType.ExternalCode);
      Assert.Equal(input.ExpenseClass, utilityType.ExpenseClass);
      Assert.Equal(input.MeasurementUnit, utilityType.MeasurementUnit);
      Assert.Equal(input.MeasurementUnitDescription, utilityType.MeasurementUnitDescription);
      Assert.Equal(input.TimeOfUseRateCount, utilityType.TimeOfUseRateCount);
      Assert.Equal(input.MeteringType, utilityType.MeteringType);
      Assert.Equal(input.HasHeatingAccountingSystem, utilityType.HasHeatingAccountingSystem);
    }

    public static void UtilityServiceEqual(UtilityServiceInput input, UtilityService utilityService)
    {
      Assert.Equal(input.InternalCode, utilityService.InternalCode);
      Assert.Equal(input.UtilityTypeId, utilityService.UtilityType.Id);
      Assert.Equal(input.EstateIds, utilityService.EstateIds);
      Assert.Equal(input.EstateUnitIds, utilityService.EstateUnitIds);
      Assert.Equal(input.ProviderSubjectId, utilityService.ProviderSubjectId);
      Assert.Equal(input.ReferenceSubjectId, utilityService.ReferenceSubjectId);
      Assert.Equal(input.OrgUnitId, utilityService.OrgUnitId);
      Assert.Equal(input.AccountingItemId, utilityService.AccountingItemId);
      Assert.Equal(input.Description, utilityService.Description);
      Assert.Equal(input.UtilityUserCode, utilityService.UtilityUserCode);
      Assert.Equal(input.UtilityContractCode, utilityService.UtilityContractCode);
      Assert.Equal(input.UtilityMeterSerial, utilityService.UtilityMeterSerial);
      Assert.Equal(input.UtilityDeliveryPointCode, utilityService.UtilityDeliveryPointCode);
      Assert.Equal(input.IsFreeMarket, utilityService.IsFreeMarket);
      Assert.Equal(input.Deposit, utilityService.Deposit);
      Assert.Equal(input.Status, utilityService.Status);
      Assert.Equal(input.ActivationDate, utilityService.ActivationDate);
      Assert.Equal(input.ContractPowerMaximum, utilityService.ContractPowerMaximum);
      Assert.Equal(input.ContractPowerNominal, utilityService.ContractPowerNominal);
      Assert.Equal(input.ContractNominalTension, utilityService.ContractNominalTension);
      Assert.Equal(input.Notes, utilityService.Notes);
    }

    public static void CostChargeEqual(CostChargeInput input, CostCharge costCharge)
    {
      Assert.Equal(input.ServiceId, costCharge.Service.Id);
      Assert.Equal(input.PeriodStart, costCharge.PeriodStart);
      Assert.Equal(input.PeriodEnd, costCharge.PeriodEnd);
      Assert.Equal(input.TotalAmount, costCharge.TotalAmount);
      Assert.Equal(input.ReferenceDate, costCharge.ReferenceDate);
      Assert.Equal(input.DueDate, costCharge.DueDate);
      Assert.Equal(input.InvoiceNumber, costCharge.InvoiceNumber);
      Assert.Equal(input.TotalVATAmount, costCharge.TotalVATAmount);
      Assert.Equal(input.InvoicedConsumptionAmount, costCharge.InvoicedConsumptionAmount);
      Equal(input.ActualConsumption, costCharge.ActualConsumption, CostChargeConsumptionEqual);
      Equal(input.ExpectedConsumption, costCharge.ExpectedConsumption, CostChargeConsumptionEqual);
      CollectionsEqual(input.Fields, costCharge.Fields, CostChargeFieldEqual);
    }

    public static void ReadingEqual(ReadingInput input, Reading reading)
    {
      Assert.Equal(input.UtilityServiceId, reading.UtilityService.Id);
      Assert.Equal(input.Notes, reading.Notes);
      Assert.Equal(input.ReadingTimestamp.WithZeroMilliseconds(), reading.ReadingTimestamp.WithZeroMilliseconds());
      Assert.Equal(input.IsEstimated, reading.IsEstimated);
      CollectionsEqual(input.Values, reading.Values, ReadingValueEqual);
    }

    private static void ReadingValueEqual(ReadingValueInput input, ReadingValue readingValue)
    {
      if (input.Id.HasValue)
      {
        Assert.Equal(input.Id, readingValue.Id);
      }

      Assert.Equal(input.Value, readingValue.Value);
      Assert.Equal(input.TOURateIndex, readingValue.TOURateIndex);
    }

    private static void CostChargeConsumptionEqual(CostChargeConsumptionInput input, CostChargeConsumption costChargeConsumption)
    {
      Assert.Equal(input.Since, costChargeConsumption.Since);
      Assert.Equal(input.Until, costChargeConsumption.Until);
      CollectionsEqual(input.Values, costChargeConsumption.Values, ReadingValueEqual);
    }

    private static void CostChargeFieldEqual(CostChargeFieldInput input, CostChargeField costChargeField)
    {
      Assert.Equal(input.Name, costChargeField.Name);
      Assert.Equal(input.IsMandatory, costChargeField.IsMandatory);
      Assert.Equal(input.TemplateTypeId, costChargeField.TemplateTypeId);
      Assert.Equal(input.Type, costChargeField.Type);
      Assert.Equal(input.Value, costChargeField.Value);
    }
  }
}
