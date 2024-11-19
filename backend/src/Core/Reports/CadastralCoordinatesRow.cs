using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Core.Reports;
public sealed record CadastralCoordinatesRow(
    string? EstateInternalCode, 
    string EstateUnitInternalCode,
    string? EstateUnitUsageTypeName,
    string? EstateUnitAddress,
    CadastralUnit CadastralUnit
  );