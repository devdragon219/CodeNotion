using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.ImportTests.Prop.Fakers;

public sealed class CounterpartDTOFaker : BaseSeededFaker<CounterpartDTO>
{
  private int _generatedDtosCount = 0;

  public required IEnumerable<Subject> Subjects { get; init; }
  public required ContractDTO Contract { get; init; }

  public CounterpartDTOFaker(int expectedTotalCounterpartsCount, bool isActiveContract)
  {
    CustomInstantiator(faker =>
    {
      var counterpartDto = new CounterpartDTO
      {
        ContractInternalCode = Contract!.InternalCode!,
        CounterpartId = faker.PickRandom(Subjects).InternalCode,
        RateFactor = 1d / expectedTotalCounterpartsCount,
        IsLandlord = !isActiveContract,
        IsMainCounterpart = _generatedDtosCount == 0,
        StartDate = faker.Date.Past(yearsToGoBack: 2, new DateTime(2024, 01, 01)),
        TenancyTypeCode = faker.PickRandom("TC1", "TC2", "TC3")
      };

      return counterpartDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
