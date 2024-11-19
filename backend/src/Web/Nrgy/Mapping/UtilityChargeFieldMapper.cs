using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Web.Nrgy.Mapping;

public class UtilityChargeFieldMapper : IMapper<UtilityChargeFieldInput, UtilityChargeField>
{
  public UtilityChargeField? Map(UtilityChargeFieldInput? from, UtilityChargeField? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var field = into ?? new UtilityChargeField();
    field.SetName(from.Name);
    field.SetMandatory(from.IsMandatory);
    field.SetType(from.Type);
    field.SetValidValues(from.ValidValues);

    if (from.Id is not null)
    {
      field.Id = from.Id.Value;
    }

    return field;
  }

  public Task<UtilityChargeField?> MapAsync(
    UtilityChargeFieldInput? from,
    UtilityChargeField? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
