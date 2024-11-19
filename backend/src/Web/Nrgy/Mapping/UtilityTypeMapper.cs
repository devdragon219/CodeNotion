using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class UtilityTypeMapper : IMapper<UtilityTypeInput, UtilityType>
{
  private readonly IMapper _mapper;

  public UtilityTypeMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<UtilityType?> MapAsync(UtilityTypeInput? from, UtilityType? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var utilityType = into ?? new UtilityType();
    utilityType.SetExternalCode(from.ExternalCode);
    utilityType.SetData(from.Category, from.Description, from.InternalCode, from.ExpenseClass);
    
    utilityType.SetMeasurement(
      from.MeasurementUnit,
      from.MeasurementUnitDescription,
      from.TimeOfUseRateCount,
      from.MeteringType,
      from.HasHeatingAccountingSystem);
    
    utilityType.SetFields(await MapFieldsAsync(from.ChargeFields, cancellationToken));

    return utilityType;
  }

  private async Task<UtilityChargeField[][]> MapFieldsAsync(
    UtilityChargeFieldInput[][]? from,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return Array.Empty<UtilityChargeField[]>();
    }

    var fields = new UtilityChargeField[from.Length][];

    for (int i = 0; i < from.Length; i++)
    {
      var row = await _mapper.MapAsync<UtilityChargeFieldInput, UtilityChargeField>(from[i], cancellationToken);
      fields[i] = row!.ToArray()!;
    }

    return fields;
  }
}
