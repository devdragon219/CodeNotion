using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public partial class EstateSubUnitMapper
{
  public required IReadRepository<EstateUsageType> _usageTypeRepository { protected get; init; }

  public async Task<EstateSubUnit> MapEstateSubUnit(EstateSubUnitDTO source,
    EstateUnit parent,
    EstateImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var internalCode = parent.InternalCode + source.SubCode;

    var localESU = parent.EstateSubUnits.FirstOrDefault(su => su.InternalCode == internalCode);

    if (localESU is null)
    {
      localESU = new EstateSubUnit(internalCode);
      localESU.SetEstateUnit(parent);
    }

    if (string.IsNullOrEmpty(source.Notes) && string.IsNullOrEmpty(source.Name))
    {
      localESU.SetNotes(null);
    }
    else
    {
      localESU.SetNotes(
        string.Join("; ", new[]{
        source.Name,
        source.Notes
        }.Where(s => !string.IsNullOrEmpty(s)))
      );
    }

    localESU.SetOccupancyDates(
      source.StartDate.ToDateOnly(),
      source.EndDate.ToDateOnly()
    );

    localESU.SetUsageType(await _usageTypeRepository
      .AsQueryable()
      .FirstOrDefaultAsync(ut => ut.InternalCode == source.UsageTypeId,
        cancellationToken)
      );

    localESU.SetSurface(source.GrossAreaSqM);

    if (source.IsCommonArea)
    {
      localESU.SetOccupancy(OccupantType.CommonArea, null, null);
    }
    else if (source.OccupantSubjectId is not null
      && workspace.SubjectIds.ContainsKey(source.OccupantSubjectId))
    {
      var isCompanyGroupMember = workspace
        .CompanyGroupMembersIds
        .ContainsKey(source.OccupantSubjectId);

      localESU.SetOccupancy(
        isCompanyGroupMember ? OccupantType.CompanyGroupMember : OccupantType.ThirdParties,
        workspace.SubjectIds[source.OccupantSubjectId],
        null
      );
    }

    ImportDataConverter.FixStringLengths(localESU);

    return localESU;
  }
}
