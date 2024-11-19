using Bogus;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.Infrastructure.Common.Data.Fakers;

public sealed class VATRateFaker : BaseSeededFaker<VATRate>
{
  private int _generatedVATRatesCount = 0;

  public VATRateFaker()
  {
    CustomInstantiator(faker =>
    {
      var vatRate = new VATRate();
      vatRate.SetInternalCode(GenerateInternalCode(faker, number: _generatedVATRatesCount + 1));
      vatRate.SetDescription(GenerateDescription(faker));

      var (type, ratePercent) = GenerateTypeAndRatePercent(faker);
      vatRate.SetType(type);
      vatRate.SetRatePercent(ratePercent);

      return vatRate;
    });

    FinishWith((_, vatRate) =>
    {
      var validationErrors = vatRate.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(ContractType)} entity! Errors: {errorMessages}");
      }

      _generatedVATRatesCount++;
    });
  }

  public static string GenerateInternalCode(Faker faker, int number) => number.ToString().PadLeft(3, '0');
  
  public static string GenerateDescription(Faker faker) => faker.Lorem.Sentence(2, 3)[..^1];
  
  public static (VATRateType, double) GenerateTypeAndRatePercent(Faker faker)
  {
    if (faker.Random.Bool(0.05f))
    {
      return (VATRateType.Exempt, 0d);
    }

    if (faker.Random.Bool(0.05f))
    {
      return (VATRateType.NonTaxable, 0d);
    }

    return (VATRateType.Rate, double.Round(faker.Random.Double(), 2));
  }
}
