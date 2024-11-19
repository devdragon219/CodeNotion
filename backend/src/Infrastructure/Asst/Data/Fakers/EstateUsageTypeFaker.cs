using Bogus;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class EstateUsageTypeFaker : BaseSeededFaker<EstateUsageType>
{
  public EstateUsageTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var usageType = new EstateUsageType();
      usageType.SetName(GenerateLongString(faker));
      usageType.SetInternalCode(GenerateLongString(faker));

      var (isForEstate, isForEstateUnit, isForEstateSubUnit, isForContracts) = GenerateUsage();
      usageType.SetUsage(isForEstate, isForEstateUnit, isForEstateSubUnit, isForContracts);

      return usageType;
    });
  }


  public static string GenerateLongString(Faker faker) => faker.Lorem.Word();
  public static (bool IsForEstate, bool IsForEstateUnit, bool IsForEstateSubUnit, bool IsForContracts) GenerateUsage() => (true, true, true, true);
}
