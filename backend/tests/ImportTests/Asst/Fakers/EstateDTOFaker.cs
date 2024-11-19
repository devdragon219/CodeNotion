using System.Linq;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.ImportTests.Asst.Fakers;

public sealed class EstateDTOFaker : BaseSeededFaker<EstateDTO>
{
  private int _generatedDtosCount = 0;

  public required IEnumerable<City> Cities { get; init; }
  public required IEnumerable<CustomCode> CitiesCustomCodes { get; init; }
  public required IEnumerable<ManagementSubject> OwnerManagementSubjects { get; init; }
  public required IEnumerable<SimpleCodeDTO> EstateMainUsageTypes { get; init; }
  public required IEnumerable<SimpleCodeDTO> EstateUsageTypes { get; init; }

  public EstateDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var city = faker.PickRandom(Cities);

      var estateDto = new EstateDTO
      {
        Id = (_generatedDtosCount + 1).ToString(),
        InternalCode = $"U{(_generatedDtosCount + 1).ToString().PadLeft(7, '0')}",
        ManagementOwnerCode = faker.PickRandom(OwnerManagementSubjects!).InternalCode,
        Notes = faker.Lorem.Sentence(3, 2),
        EstateNotes = faker.Lorem.Sentence(3, 2),
        CityId = CitiesCustomCodes!.Single(code => code.ExternalCode == city.Id.ToString()).InternalCode,
        Latitude = faker.Random.Double(-90, 90),
        Longitude = faker.Random.Double(-180, 180),
        PostCode = faker.Address.ZipCode(),
        BuildYear = faker.Random.Int(1980, 2024),
        EstateTypeId = faker.PickRandom("TT1", "TT2", "TT3", "TT4", "TT5", "TT6", "TT7"),
        OwnershipTypeId = faker.PickRandom("TT1", "TT2", "TT3", "TT4", "TT5"),
        UsageMacroTypeId = faker.PickRandom(EstateMainUsageTypes).Id,
        UsageTypeId = faker.PickRandom(EstateUsageTypes).Id
      };

      var address = faker.Address.StreetAddress(true);
      if (int.TryParse(address.Split()[0], out var _))
      {
        address = string.Join(" ", address.Split().Skip(1));
      }

      estateDto.Address = address;

      return estateDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
