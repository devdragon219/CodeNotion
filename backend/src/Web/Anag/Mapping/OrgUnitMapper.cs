using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Web.Anag.Models.OrgUnit;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class OrgUnitMapper : MapperBase, IMapper<OrgUnitInput, OrgUnit>
{
  protected IMapper Mapper { get; }
  
  public OrgUnitMapper(IMapper mapper)
  {
    Mapper = mapper;
  }

  public async Task<OrgUnit?> MapAsync(OrgUnitInput? from, OrgUnit? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var orgUnit = into ?? new OrgUnit();
    orgUnit.SetName(from.Name);
    orgUnit.SetInternalCode(from.InternalCode);
    orgUnit.SetNotes(from.Notes);
    orgUnit.SetEntryStatus(from.EntryStatus);
    orgUnit.SetExternalCode(from.ExternalCode);
    orgUnit.SetClosureDate(from.ClosureDate);

    if(from.Contacts is not null) {
      await UpdateCollectionAsync(from.Contacts,
        Mapper,
        () => orgUnit.Contacts,
        orgUnit.AddContact,
        orgUnit.RemoveContact,
        cancellationToken);
    }

    if (into is null && from.OrgUnitId.GetValueOrDefault() != default)
    {
      orgUnit.Id = from.OrgUnitId!.Value;
    }

    orgUnit.SetNotes(from.Notes);

    return orgUnit;
  }
}
