using Bogus;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class EstateMainUsageTypeFaker : BaseSeededFaker<EstateMainUsageType>
{
  public EstateMainUsageTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var mainUsageType = new EstateMainUsageType();
      mainUsageType.SetName(faker.Lorem.Word());
      mainUsageType.SetInternalCode(faker.Lorem.Word());
      
      return mainUsageType;
    });
  }

  public static string GenerateLongString(Faker faker) => faker.Lorem.Word();
}
