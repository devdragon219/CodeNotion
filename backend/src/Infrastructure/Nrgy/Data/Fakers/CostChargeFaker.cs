using Bogus;
using Bogus.Extensions;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class CostChargeFaker : BaseSeededFaker<CostCharge>
{
  public required IEnumerable<UtilityService> UtilityServices { get; init; }

  public CostChargeFaker()
  {
    CustomInstantiator(faker =>
    {
      var utilityService = PickRandomUtilityService(faker, UtilityServices!);

      var costCharge = new CostCharge();
      costCharge.SetService(utilityService);
      costCharge.SetInvoiceNumber(GenerateInvoiceNumber(faker));
      
      var (amount, vatAmount) = GenerateTotalAmounts(faker);
      costCharge.SetTotalAmount(amount);
      costCharge.SetTotalVATAmount(vatAmount);

      var (referenceDate, dueDate, periodStart, periodEnd) = GenerateDateRange(faker);
      costCharge.SetReferenceDate(referenceDate);
      costCharge.SetDueDate(dueDate);
      costCharge.SetPeriod(periodStart, periodEnd);

      var actualConsumptionFaker = new CostChargeConsumptionFaker
      {
        Since = periodStart,
        Until = periodEnd,
        TOURateCount = utilityService.UtilityType.TimeOfUseRateCount
      };

      var expectedConsumptionFaker = new CostChargeConsumptionFaker
      {
        Since = periodEnd.AddDays(1),
        Until = referenceDate,
        TOURateCount = utilityService.UtilityType.TimeOfUseRateCount
      };

      if (faker.Random.Bool())
      {
        costCharge.SetActualConsumption(actualConsumptionFaker.Generate());
        costCharge.SetExpectedConsumption(expectedConsumptionFaker.Generate());
        
        costCharge.SetInvoicedConsumptionAmount(
          costCharge.ActualConsumption!.Values.Sum(value => value.Value!.Value) +
          costCharge.ExpectedConsumption!.Values.Sum(value => value.Value!.Value));
      }
      else
      {
        costCharge.SetInvoicedConsumptionAmount(decimal.Round(faker.Random.Decimal(200, 1000), 2));
      }

      var fields = new List<CostChargeField>();
      foreach (var row in utilityService.UtilityType.ChargeFields ?? Array.Empty<UtilityChargeField[]>())
      {
        foreach (var utilityChargeField in row)
        {
          var fieldFaker = new CostChargeFieldFaker { UtilityChargeField = utilityChargeField };
          var field = fieldFaker.Generate();
          fields.Add(field);
        }
      }

      costCharge.SetFields(fields.ToArray());

      return costCharge;
    });

    FinishWith((faker, utilityService) =>
    {
      var validationErrors = utilityService.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CostCharge)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static UtilityService PickRandomUtilityService(Faker faker, IEnumerable<UtilityService> utilityServices)
    => faker.PickRandom(utilityServices);

  public static string GenerateInvoiceNumber(Faker faker) => faker.Random.Int(1, 300).ToString();

  public static (decimal Amount, decimal VATAmount) GenerateTotalAmounts(Faker faker)
  {
    var amount = decimal.Round(faker.Finance.Amount(50, 1000), 2);
    var vatAmount = decimal.Round(amount * 0.2m, 2);

    return (amount, vatAmount);
  }

  public static (DateOnly ReferenceDate, DateOnly DueDate, DateOnly PeriodStart, DateOnly PeriodEnd) GenerateDateRange(Faker faker)
  {
    var periodStart = new DateOnly(faker.Random.Int(2022, 2024), faker.Random.Int(1, 12), 1);
    var periodEnd = periodStart.AddMonths(faker.Random.Int(1, 2)).AddDays(-1);
    var referenceDate = periodEnd.AddDays(10);
    var dueDate = new DateOnly(referenceDate.Year, referenceDate.Month, 1).AddMonths(1).AddDays(-1);

    return (referenceDate, dueDate, periodStart, periodEnd);
  }
}
