using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Plugin.Import.Asst;

public interface ICustomEstateEnumMapper
{
  Task<EstateOwnership> MapOwnership(string? ownershipTypeId);
  Task<EstateUnitOwnershipType> MapUnitOwnership(string? ownershipTypeId);
  Task<EstateType> MapEstateType(string? estateTypeId);
  Task<EstateUnitType> MapEstateUnitType(string? value);
  Task<IncomeMetric?> MapIncomeMetric(string? metric);
}
