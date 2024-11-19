using Bogus;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Common.Models;

namespace RealGimm.ImportTests.Common.Fakers;

public sealed class VATRateDTOFaker : BaseSeededFaker<VATRateDTO>
{
  private int _generatedDtosCount = 0;

  public VATRateDTOFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var (type, rateFactor) = GenerateTypeAndRatePercent(faker);

      var vatRateDto = new VATRateDTO
      {
        InternalCode = $"VR{(_generatedDtosCount + 1).ToString().PadLeft(3, '0')}",
        Description = faker.Lorem.Sentence(2, 3)[..^1],
        Type = type,
        RateFactor = rateFactor,
        LastUpdated = new DateTime(2020, 01, 01),
      };

      return vatRateDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }

  private (string? Type, decimal RatePercent) GenerateTypeAndRatePercent(Faker faker)
    => _generatedDtosCount switch
    {
      0 => ("E", 0m),
      1 => (null, 0m),
      _ => ("A", decimal.Round(faker.Random.Decimal(), 2))
    };
}
