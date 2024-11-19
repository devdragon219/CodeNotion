using RealGimm.Core.Fclt.ContractTypeAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ContractTypeFaker : BaseSeededFaker<ContractType>
{
  private int _generatedObjectsCount = 0;

  public ContractTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var contractType = new ContractType();
      
      contractType.SetData(
        name: faker.Company.CompanyName(),
        internalCode: $"TCM{(_generatedObjectsCount + 1).ToString().PadLeft(3, '0')}",
        ordering: _generatedObjectsCount + 1);

      return contractType;
    });

    FinishWith((faker, contractType) =>
    {
      EnsureValid(contractType);
      _generatedObjectsCount++;
    });
  }
}
