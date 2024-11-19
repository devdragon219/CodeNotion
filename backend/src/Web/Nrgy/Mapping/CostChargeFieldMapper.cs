using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.CostChargeAggregate;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class CostChargeFieldMapper : IMapper<CostChargeFieldInput, CostChargeField>
{
  public CostChargeField? Map(CostChargeFieldInput? from, CostChargeField? into)
  {
    if (from is null)
    {
      return null;
    }

    var field = into ?? new CostChargeField();
    field.SetValue(from.Value);
    field.SetName(from.Name);
    field.SetIsMandatory(from.IsMandatory);
    field.SetTemplateTypeId(from.TemplateTypeId);
    field.SetType(from.Type);

    return field;
  }

  Task<CostChargeField?> IMapper<CostChargeFieldInput, CostChargeField>.MapAsync(
    CostChargeFieldInput? from,
    CostChargeField? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
