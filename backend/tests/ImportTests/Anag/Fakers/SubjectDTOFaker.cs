using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.ImportTests.Anag.Fakers;

public sealed class SubjectDTOFaker : BaseSeededFaker<SubjectDTO>
{
  private int _generatedDtosCount = 0;

  public required IEnumerable<City> Cities { get; init; }
  public required IEnumerable<CustomCode> CitiesCustomCodes { get; init; }
  public IEnumerable<SubjectDTO> ParentSubjects { get; set; } = [];

  public SubjectDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var subjectType = ParentSubjects!.Any()
        ? faker.PickRandom("F", "G", "C")
        : "G";

      var subjectDto = new SubjectDTO
      {
        InternalCode = $"S{(_generatedDtosCount + 1).ToString().PadLeft(7, '0')}",
        ExternalCode = faker.Random.AlphaNumeric(12).ToUpperInvariant(),
        SubjectType = subjectType,
        IsMgmtSubject = subjectType == "G",
        BaseCountryTaxIdCode = faker.Random.AlphaNumeric(12).ToUpperInvariant(),
        AdditionalTaxIdCode = faker.Random.AlphaNumeric(12).ToUpperInvariant(),
      };

      var city = faker.PickRandom(Cities);
      var cityId = CitiesCustomCodes!.Single(code => code.ExternalCode == city.Id.ToString()).InternalCode;

      if (subjectType == "F")
      {
        subjectDto.PhysicalFirstName = faker.Name.FirstName();
        subjectDto.PhysicalLastName = faker.Name.LastName();
        subjectDto.PhysicalBirthSex = faker.Random.Bool() ? "M" : "W";
        subjectDto.PhysicalBirthDate = faker.Date.Past(refDate: new DateTime(2000, 01, 01));
        subjectDto.PhysicalBirthCityId = cityId;
      }
      else
      {
        subjectDto.Name = subjectDto.IsMgmtSubject
          ? faker.Company.CompanyName()
          : faker.Name.FullName();
        
        subjectDto.MainAddrCityId = cityId;
        subjectDto.MainAddrToponymy = faker.Address.StreetAddress(true);
        subjectDto.MainAddrPostCode = faker.Address.ZipCode();
      }

      if (subjectDto.IsMgmtSubject && (!ParentSubjects.Any() || faker.Random.Bool()))
      {
        subjectDto.ParentMgmtSubjectId = subjectDto.InternalCode;
      }
      else
      {
        subjectDto.ParentMgmtSubjectId = faker.PickRandom(ParentSubjects).InternalCode;
      }

      return subjectDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
