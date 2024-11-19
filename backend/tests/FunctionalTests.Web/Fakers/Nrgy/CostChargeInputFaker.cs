using Bogus;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public sealed class CostChargeInputFaker : BaseSeededFaker<CostChargeInput>
{
  public required IEnumerable<UtilityService> UtilityServices { get; init; }

  public CostChargeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var utilityService = CostChargeFaker.PickRandomUtilityService(faker, UtilityServices!);

      var input = new CostChargeInput
      {
        ServiceId = utilityService.Id,
        InvoiceNumber = CostChargeFaker.GenerateInvoiceNumber(faker)
      };

      (input.TotalAmount, input.TotalVATAmount) = CostChargeFaker.GenerateTotalAmounts(faker);
      (input.ReferenceDate, input.DueDate, input.PeriodStart, input.PeriodEnd) = CostChargeFaker.GenerateDateRange(faker);

      var actualConsumptionInputFaker = new CostChargeConsumptionInputFaker()
      {
        Since = input.PeriodStart,
        Until = input.PeriodEnd,
        TOURateCount = utilityService.UtilityType.TimeOfUseRateCount
      };
      
      var expectedConsumptionInputFaker = new CostChargeConsumptionInputFaker
      {
        Since = input.PeriodEnd.AddDays(1),
        Until = input.ReferenceDate,
        TOURateCount = utilityService.UtilityType.TimeOfUseRateCount
      };

      if (faker.Random.Bool())
      {
        input.ActualConsumption = actualConsumptionInputFaker.Generate();
        input.ExpectedConsumption = expectedConsumptionInputFaker.Generate();

        input.InvoicedConsumptionAmount =
          input.ActualConsumption.Values.Sum(value => value.Value!.Value) +
          input.ExpectedConsumption.Values.Sum(value => value.Value!.Value);
      }
      else
      {
        input.InvoicedConsumptionAmount = decimal.Round(faker.Random.Decimal(200, 1000), 2);
      }

      var fields = new List<CostChargeFieldInput>();
      foreach (var row in utilityService.UtilityType.ChargeFields ?? Array.Empty<UtilityChargeField[]>())
      {
        foreach (var utilityChargeField in row)
        {
          var fieldInputFaker = new CostChargeFieldInputFaker { UtilityChargeField = utilityChargeField };
          var fieldInput = fieldInputFaker.Generate();
          fields.Add(fieldInput);
        }
      }

      input.Fields = fields.ToArray();

      return input;
    });
  }
}
