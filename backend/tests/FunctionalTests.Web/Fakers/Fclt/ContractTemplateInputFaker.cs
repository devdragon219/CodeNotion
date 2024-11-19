using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class ContractTemplateInputFaker : BaseSeededFaker<ContractTemplateInput>
{
  private int _generatedInputsCount = 0;

  public required IEnumerable<ContractType> ContractTypes { get; init; }
  public required IEnumerable<SLA> SLAs { get; init; }
  public required IEnumerable<Penalty> Penalties { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public ContractTemplateInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new ContractTemplateInput
      {
        Description = faker.Company.CompanyName(),
        InternalCode = $"MCM{(_generatedInputsCount + 1).ToString().PadLeft(3, '0')}",
        ContractTypeId = faker.PickRandom(ContractTypes).Id,
        SLAIds = faker.PickRandom(SLAs, amountToPick: faker.Random.Int(1, 3)).Select(sla => sla.Id).ToArray(),
        PenaltyIds = faker.PickRandom(Penalties, amountToPick: faker.Random.Int(1, 3)).Select(penalty => penalty.Id).ToArray(),
        CatalogueTypeIds = faker.PickRandom(CatalogueTypes, amountToPick: faker.Random.Int(1, 3)).Select(type => type.Id).ToArray()
      };

      return input;
    });

    FinishWith((faker, input) => _generatedInputsCount++);
  }
}
