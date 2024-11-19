using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.ImportTests.Anag.Fakers;

public sealed class ContactDTOFaker : BaseSeededFaker<ContactDTO>
{
  public required IEnumerable<SubjectDTO> Subjects { get; init; }

  public ContactDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var contactDto = new ContactDTO
      {
        SubjectInternalCode = faker.PickRandom(Subjects).InternalCode,
        Notes = faker.Lorem.Sentence(),
        ContactType = faker.PickRandom("TC1", "TC2", "TC3", "TC4"),
      };

      contactDto.ContactInfo = contactDto.ContactType switch
      {
        "TC1" => faker.Phone.PhoneNumber("+### (###) ###-###"),
        "TC2" => faker.Phone.PhoneNumber("+###-##-###-####"),
        "TC3" => faker.Phone.PhoneNumber("+### (###) ###-####"),
        "TC4" => faker.Internet.Email(),
        _ => null
      };

      return contactDto;
    });
  }
}
