using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class ContactMapper : IMapper<ContactInput, Contact>
{
  public Task<Contact?> MapAsync(ContactInput? from, Contact? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static Contact? Map(ContactInput? from, Contact? into)
  {
    if (from is null)
    {
      return null;
    }

    var contact = into ?? new Contact();
    contact.SetContactType(from.ContactType);
    contact.SetContactInfo(from.ContactInfoType, from.ContactInfo);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      contact.Id = from.Id!.Value;
    }

    contact.SetNotes(from.Notes);

    return contact;
  }
}
