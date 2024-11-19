using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.ImportTests.Prop.Fakers;

public sealed class ContractTypeDTOFaker : BaseSeededFaker<ContractTypeDTO>
{
  private int _generatedDtosCount = 0;

  public required IEnumerable<EstateUsageType> EstateUsageTypes { get; init; }

  public ContractTypeDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var contractTypeDto = new ContractTypeDTO
      {
        Id = (_generatedDtosCount + 1).ToString(),
        InternalCode = $"CT{(_generatedDtosCount + 1).ToString().PadLeft(5, '0')}",
        Description = faker.Lorem.Sentence(3, 2),
        IsActive = _generatedDtosCount % 2 == 0,
        IsRentChargeApplicable = faker.Random.Bool(),
        UsageTypeId = faker.PickRandom(EstateUsageTypes).Id
      };

      return contractTypeDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
