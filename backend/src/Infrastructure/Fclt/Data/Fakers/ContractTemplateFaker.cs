using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ContractTemplateFaker : BaseSeededFaker<ContractTemplate>
{
  private int _generatedObjectsCount = 0;

  public required IEnumerable<ContractType> ContractTypes { get; init; }
  public required IEnumerable<SLA> SLAs { get; init; }
  public required IEnumerable<Penalty> Penalties { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }

  public ContractTemplateFaker()
  {
    CustomInstantiator(faker =>
    {
      var contractTemplate = new ContractTemplate();
      
      contractTemplate.SetData(
        description: faker.Company.CompanyName(),
        internalCode: $"MCM{(_generatedObjectsCount + 1).ToString().PadLeft(3, '0')}",
        contractType: faker.PickRandom(ContractTypes));

      contractTemplate.SLAs.AddRange(faker.PickRandom(SLAs, amountToPick: faker.Random.Int(1, 3)));
      contractTemplate.Penalties.AddRange(faker.PickRandom(Penalties, amountToPick: faker.Random.Int(1, 3)));

      var catalogueTypes = faker.PickRandom(CatalogueTypes, amountToPick: faker.Random.Int(1, 3));
      contractTemplate.SetCatalogueTypeIds(catalogueTypes.Select(type => type.Id).ToArray());

      return contractTemplate;
    });

    FinishWith((faker, contractTemplate) =>
    {
      EnsureValid(contractTemplate);
      _generatedObjectsCount++;
    });
  }
}
