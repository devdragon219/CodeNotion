using Bogus;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class CadastralUnitFaker : BaseSeededFaker<CadastralUnit>
{
  private int _generatedCadastralUnitsCount = 0;

  public required IEnumerable<EstateUnit> EstateUnits { get; init; }
  public required Faker<Address> AddressFaker { get; init; }

  public CadastralUnitFaker()
  {
    CustomInstantiator(faker =>
    {
      var estateUnit = faker.PickRandom<EstateUnit>(EstateUnits);

      var cadastralUnit = new CadastralUnit();
      cadastralUnit.SetInternalCode(faker.Random.AlphaNumeric(10));
      cadastralUnit.SetType(faker.PickRandom<EstateUnitType>());
      cadastralUnit.SetStatus(faker.PickRandom<CadastralUnitStatus>());
      cadastralUnit.SetDates(estateUnit.OwnershipStartDate, estateUnit.OwnershipEndDate ?? estateUnit.DisusedDate);
      cadastralUnit.SetHistoryTags(new Guid[] { Guid.NewGuid() });

      var income = new CadastralUnitIncome();
      income.SetCategories(faker.Random.AlphaNumeric(10), faker.Random.AlphaNumeric(10));
      income.SetRegisteredSurface(decimal.Round(faker.Random.Decimal(100, 10000), 2));
      income.SetType(faker.PickRandom<IncomeType>());
      
      income.SetMetricsAmounts(
        faker.PickRandom<IncomeMetric>(),
        decimal.Round(faker.Random.Decimal(100, 10000), 2),
        decimal.Round(faker.Random.Decimal(100, 10000), 2),
        decimal.Round(faker.Random.Decimal(100, 10000), 2));

      cadastralUnit.SetIncome(income);

      cadastralUnit.SetNotes(
        cadastral: faker.Lorem.Sentence(15),
        fiscal: faker.Lorem.Sentence(15),
        consortium: faker.Lorem.Sentence(15));

      cadastralUnit.SetEstateUnit(estateUnit);

      var estateUnitAddress = cadastralUnit.EstateUnit!.Address!;
      var cadastralUnitAddress = AddressFaker!.Generate();
      cadastralUnitAddress.SetCountry(estateUnitAddress.CountryISO, estateUnitAddress.CountryName);
      cadastralUnitAddress.SetRegion(estateUnitAddress.RegionName, estateUnitAddress.RegionReference);
      cadastralUnitAddress.SetCounty(estateUnitAddress.CountyName, estateUnitAddress.CountyReference);

      cadastralUnit.SetAddress(cadastralUnitAddress);

      var coordinates = new CadastralCoordinates();
      if (cadastralUnit.Address?.CountryISO == CountryISO3.ITA.ToLower())
      {
        coordinates.SetData(
          CoordinateType.ItalianOrdinary,
          faker.Lorem.Sentence(15).OrNull(faker),
          faker.Random.AlphaNumeric(10).OrNull(faker, nullWeight: 0.1f),
          faker.Random.AlphaNumeric(10).OrNull(faker, nullWeight: 0.1f),
          faker.Random.AlphaNumeric(10).OrNull(faker, nullWeight: 0.1f),
          faker.Random.AlphaNumeric(10).OrNull(faker, nullWeight: 0.1f),
          faker.Random.AlphaNumeric(10).OrNull(faker, nullWeight: 0.1f),
          null);

        if (faker.Random.Bool(weight: 0.8f))
        {
          coordinates.SetITTavData(
            faker.Random.AlphaNumeric(10),
            faker.Random.AlphaNumeric(10),
            faker.Random.AlphaNumeric(10));
        }
      }
      else
      {
        coordinates.SetData(
          CoordinateType.Generic_Override,
          null,
          null,
          null,
          null,
          null,
          null,
          faker.Lorem.Sentence(10));
      }

      cadastralUnit.Coordinates.Add(coordinates);

      return cadastralUnit;
    });

    FinishWith((_, cadastralUnit) =>
    {
      var validationErrors = cadastralUnit.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(CadastralUnit)} entity! Errors: {errorMessages}");
      }

      _generatedCadastralUnitsCount++;
    });
  }
}
