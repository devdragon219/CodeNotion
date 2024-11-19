using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Plugin.Import.Asst;

public class CustomEstateEnumMapper : ICustomEstateEnumMapper
{
  public Task<EstateType> MapEstateType(string? estateTypeId)
    => Task.FromResult(
    estateTypeId switch
    {
      "TT1" => EstateType.Building,
      "TT2" => EstateType.LandPlotUndeveloped,
      "TT3" => EstateType.UrbanPlot,
      "TT4" => EstateType.LandPlotBuildable,
      "TT5" => EstateType.Undefined,
      "TT6" => EstateType.Mixed,
      "TT7" => EstateType.Undefined,
      _ => EstateType.Mixed
    });

  public Task<EstateOwnership> MapOwnership(string? ownershipTypeId)
    => Task.FromResult(
    ownershipTypeId switch
    {
      "TP1" => EstateOwnership.Freehold,
      "TP2" => EstateOwnership.ThirdParty,
      "TP3" => EstateOwnership.Easement,
      "TP4" => EstateOwnership.Leasing,
      "TP5" => EstateOwnership.OvergroundOnly,
      "TP6" => EstateOwnership.Mixed,
      _ => EstateOwnership.Mixed
    });

  public Task<EstateUnitOwnershipType> MapUnitOwnership(string? ownershipTypeId)
    => Task.FromResult(
    ownershipTypeId switch
    {
      "TP1" => EstateUnitOwnershipType.Property,
      "TP2" => EstateUnitOwnershipType.ThirdParties,
      "TP3" => EstateUnitOwnershipType.RightOfUse,
      "TP4" => EstateUnitOwnershipType.Leasing,
      "TP5" => EstateUnitOwnershipType.SurfaceRights,
      "TP6" => EstateUnitOwnershipType.ThirdParties,
      _ => EstateUnitOwnershipType.ThirdParties
    });

  public Task<EstateUnitType> MapEstateUnitType(string? value)
    => Task.FromResult(value switch
    {
      "TT1" => EstateUnitType.Building,
      "TT2" => EstateUnitType.Ground,
      "TT3" => EstateUnitType.UrbanArea,
      "TT4" => EstateUnitType.BuildingArea,
      "TT5" => EstateUnitType.Other,
      "TT6" => EstateUnitType.Other,
      "TT7" => EstateUnitType.Other,
      _ => EstateUnitType.Other
    });

  public Task<IncomeMetric?> MapIncomeMetric(string? incomeMetric)
    => Task.FromResult<IncomeMetric?>(incomeMetric switch
    {
      "TC1" => IncomeMetric.CubicMetres,
      "TC2" => IncomeMetric.SquareMetres,
      "TC3" => IncomeMetric.Rooms,
      "TC4" => IncomeMetric.Ares,
      _ => null
    });
}
