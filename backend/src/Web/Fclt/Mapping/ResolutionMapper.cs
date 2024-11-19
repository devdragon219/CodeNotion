using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class ResolutionMapper : IMapper<ResolutionInput, Resolution>
{
  public Resolution? MapAsync(ResolutionInput? from, Resolution? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var resolution = into ?? new Resolution();
    
    resolution.SetData(
      from.InterventionStart,
      from.InterventionEnd,
      from.Closure,
      from.OperationsPerformed,
      from.Diagnosis,
      from.ResolutionNotes,
      from.PartsAndSupplies);

    return resolution;
  }

  Task<Resolution?> IMapper<ResolutionInput, Resolution>.MapAsync(
    ResolutionInput? from,
    Resolution? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
