using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class CatalogueItemFieldMapper : IMapper<CatalogueItemFieldInput, CatalogueItemField>
{
  public CatalogueItemField? Map(CatalogueItemFieldInput? from, CatalogueItemField? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var itemField = into ?? new CatalogueItemField();
    itemField.SetValue(from.Value);
    itemField.SetName(from.Name);
    itemField.SetIsMandatory(from.IsMandatory);
    itemField.SetTemplateTypeId(from.TemplateTypeId);
    itemField.SetType(from.Type);

    return itemField;
  }

  Task<CatalogueItemField?> IMapper<CatalogueItemFieldInput, CatalogueItemField>.MapAsync(
    CatalogueItemFieldInput? from,
    CatalogueItemField? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
