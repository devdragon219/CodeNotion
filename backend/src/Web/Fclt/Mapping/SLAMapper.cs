using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class SLAMapper : IMapper<SLAInput, SLA>
{
  private readonly IMapper _mapper;

  public SLAMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<SLA?> MapAsync(SLAInput? from, SLA? into = null, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var sla = into ?? new SLA() { Id = from.Id.GetValueOrDefault() };
    sla.SetDescription(from.Description);
    sla.SetInternalCode(from.InternalCode);
    sla.SetIfCondition((await _mapper.MapAsync(from.IfCondition, sla.IfCondition, cancellationToken))!);
    sla.SetThenCondition((await _mapper.MapAsync(from.ThenCondition, sla.ThenCondition, cancellationToken))!);

    return sla;
  }
}
