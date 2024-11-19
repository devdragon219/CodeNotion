using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class FunctionAreaMapper : IMapper<FunctionAreaInput, FunctionArea>
{
  public FunctionArea? Map(FunctionAreaInput? from, FunctionArea? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var functionalArea = into ?? new FunctionArea();
    functionalArea.SetName(from.Name);
    functionalArea.SetInternalCode(from.InternalCode);
    functionalArea.SetSurfaceType(from.SurfaceType);

    return functionalArea;
  }

  Task<FunctionArea?> IMapper<FunctionAreaInput, FunctionArea>.MapAsync(
    FunctionAreaInput? from,
    FunctionArea? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
