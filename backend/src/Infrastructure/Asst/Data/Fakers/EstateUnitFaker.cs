using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class EstateUnitFaker : BaseSeededFaker<EstateUnit>
{
  private int _generatedEstateUnitsCount = 0;

  public required IEnumerable<Estate> Estates { get; init; }
  public required IEnumerable<EstateUsageType> UsageTypes { get; init; }

  public EstateUnitFaker()
  {
    CustomInstantiator(faker =>
    {
      var estate = faker.PickRandom(Estates);

      var estateUnit = new EstateUnit();
      estateUnit.SetName(faker.Company.CompanyName());
      estateUnit.SetInternalCode($"{estate.InternalCode}U{(_generatedEstateUnitsCount + 1).ToString().PadLeft(3, '0')}");
      estateUnit.SetType(faker.PickRandom<EstateUnitType>());
      estateUnit.SetStatus(faker.PickRandom<EstateUnitStatus>());
      estateUnit.SetUsageType(faker.PickRandom(UsageTypes));
      estateUnit.SetExternalCode(faker.Random.AlphaNumeric(10));
      estateUnit.SetNotes(faker.Lorem.Sentence(50));

      var ownershipType = faker.PickRandom(EstateUnit.AllowedOwnershipTypes[estate.Ownership]);
      var ownershipPercentage = (ownershipType is EstateUnitOwnershipType.Property) ? faker.Random.Number(1, 100) : (int?)null;

      estateUnit.SetOwnership(
        ownershipType,
        faker.Date.RecentDateOnly(30, refDate: new DateOnly(2024, 01, 01)),
        ownershipPercentage,
        null);

      estateUnit.SetEstate(estate);
      estateUnit.SetManagementSubject(estate.ManagementSubjectId);
      estateUnit.SetAddress(faker.PickRandom<Address>(estate.Addresses), faker.Random.Number(1, 23).ToString());
      estateUnit.SetStair(faker.PickRandom<Stair>(estate.Stairs));
      estateUnit.AddFloor(faker.PickRandom<Floor>(estate.Floors));

      return estateUnit;
    });

    FinishWith((_, estateUnit) =>
    {
      var validationErrors = estateUnit.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(EstateUnit)} entity! Errors: {errorMessages}");
      }

      _generatedEstateUnitsCount++;
    });
  }
}
