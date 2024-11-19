using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class CadastralUnitInspectionMapper : IMapper<CadastralUnitInspectionInput, CadastralUnitInspection>
{
  public Task<CadastralUnitInspection?> MapAsync(CadastralUnitInspectionInput? from, CadastralUnitInspection? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static CadastralUnitInspection? Map(CadastralUnitInspectionInput? from, CadastralUnitInspection? into)
  {
    if (from is null)
    {
      return null;
    }

    var inspection = into ?? new CadastralUnitInspection();
    inspection.SetMacroZone(from.MacroZone);
    inspection.SetMicroZone(from.MicroZone);
    inspection.SetIsHistoricalEstate(from.IsHistoricalEstate);
    inspection.SetIsDirectRestriction(from.IsDirectRestriction);
    inspection.SetProtocolDate(from.ProtocolDate);
    inspection.SetDate(from.Date);
    inspection.SetProtocolNumber(from.ProtocolNumber);
    inspection.SetHeading(from.Heading);

    return inspection;
  }
}
