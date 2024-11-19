using RealGimm.Core.Asst.EstateSubUnitAggregate;

namespace RealGimm.Web.Asst.Models;

public record EstateSubUnitInput(
  int? Id,
  string InternalCode,
  int EstateUnitId,
  int? OccupantId,
  int? OccupancyPercent,
  int? SurfaceSqM,
  int? OrgUnitId,
  OccupantType? OccupantType,
  int? UsageTypeId,
  DateOnly? Since,
  DateOnly? Until,
  string? Note
  );
