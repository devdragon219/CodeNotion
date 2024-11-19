using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class CostChargeConsumptionMapper : IMapper<CostChargeConsumptionInput, CostChargeConsumption>
{
  private readonly IMapper _mapper;

  public CostChargeConsumptionMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<CostChargeConsumption?> MapAsync(
    CostChargeConsumptionInput? from,
    CostChargeConsumption? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var costCharge = into ?? new CostChargeConsumption();
    costCharge.SetSince(from.Since);
    costCharge.SetUntil(from.Until);
    
    await _mapper.UpdateCollectionAsync(from.Values, costCharge.Values, cancellationToken);

    return costCharge;
  }
}
