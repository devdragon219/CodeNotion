using Bogus;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class EstateFaker : BaseSeededFaker<Estate>
{
  private int _generatedEstatesCount = 0;

  public required IEnumerable<int> ManagementSubjectIds { get; init; }
  public required IEnumerable<EstateUsageType> UsageTypes { get; init; }
  public required IEnumerable<EstateMainUsageType> MainUsageTypes { get; init; }
  public required Faker<Address> AddressFaker { get; init; }
  public required Faker<Stair> StairFaker { get; init; }
  public required Func<Faker<Floor>> FloorFakerFactory { get; init; }

  public EstateFaker()
  {
    CustomInstantiator(faker =>
    {
      var estate = new Estate();
      estate.SetName(faker.Company.CompanyName());
      estate.SetType(faker.PickRandom<EstateType>());
      estate.SetOwnership(faker.PickRandom<EstateOwnership>());
      estate.SetMainUsageType(faker.PickRandom(MainUsageTypes));
      estate.SetUsageType(faker.PickRandom(UsageTypes));
      estate.SetInternalCode($"I{(_generatedEstatesCount + 1).ToString().PadLeft(5, '0')}");
      estate.SetExternalCode(faker.Random.AlphaNumeric(10));
      estate.SetStatus(faker.PickRandom<EstateStatus>());
      estate.SetSurfaceArea(faker.Random.Int(100, 10000));
      estate.SetBuildYear(faker.Random.Int(1900, 2021));
      estate.SetNotes(faker.Lorem.Sentence(50));

      var managementSubjectId = faker.PickRandom(ManagementSubjectIds);
      estate.SetManagement(managementSubjectId, null);

      if (estate.Status is EstateStatus.Decommissioned)
      {
        estate.SetDecommissioningDate(faker.Date.PastDateOnly(refDate: new DateOnly(2023, 01, 01)));
      }

      estate.AddAddress(AddressFaker!.Generate());
      estate.AddStairs(StairFaker!.Generate());

      var floorFaker = FloorFakerFactory!();
      foreach (var floor in floorFaker!.Generate(faker.Random.Int(5, 12)))
      {
        estate.AddFloor(floor);
      }

      return estate;
    });

    FinishWith((_, estate) =>
    {
      var validationErrors = estate.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Estate)} entity! Errors: {errorMessages}");
      }

      _generatedEstatesCount++;
    });
  }
}
