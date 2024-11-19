using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class TermExtensionMapper : IMapper<TermExtensionInput, TermExtension>
{
  public TermExtension? MapAsync(TermExtensionInput? from, TermExtension? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var termExtension = into ?? new TermExtension();
    termExtension.SetDaysCount(from.DaysCount);
    termExtension.SetFeeDifference(from.FeeDifference);
    termExtension.SetNotes(from.Notes);

    return termExtension;
  }

  Task<TermExtension?> IMapper<TermExtensionInput, TermExtension>.MapAsync(
    TermExtensionInput? from,
    TermExtension? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
