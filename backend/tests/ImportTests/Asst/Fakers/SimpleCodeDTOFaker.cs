using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.ImportTests.Asst.Fakers;

public sealed class SimpleCodeDTOFaker : BaseSeededFaker<SimpleCodeDTO>
{
  private int _generatedDtosCount = 0;

  public SimpleCodeDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var simpleCodeDto = new SimpleCodeDTO
      {
        Id = (_generatedDtosCount + 1).ToString(),
        Code = faker.Random.AlphaNumeric(10),
        Description = faker.Lorem.Word()
      };

      return simpleCodeDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
