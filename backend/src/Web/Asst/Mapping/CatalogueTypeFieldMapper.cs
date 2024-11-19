using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueTypeFieldMapper : IMapper<CatalogueTypeFieldInput, CatalogueTypeField>
{
  public CatalogueTypeField? Map(CatalogueTypeFieldInput? from, CatalogueTypeField? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var typeField = into ?? new CatalogueTypeField();
    typeField.SetName(from.Name);
    typeField.SetMandatory(from.IsMandatory);
    typeField.SetType(from.Type);
    typeField.SetValidValues(from.ValidValues);

    if (from.Id is not null)
    {
      typeField.Id = from.Id.Value;
    }

    return typeField;
  }

  Task<CatalogueTypeField?> IMapper<CatalogueTypeFieldInput, CatalogueTypeField>.MapAsync(
    CatalogueTypeFieldInput? from,
    CatalogueTypeField? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
