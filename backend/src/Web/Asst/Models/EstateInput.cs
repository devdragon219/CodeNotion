using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Web.Asst.Models;

public record EstateInput(
  string? Name,
  string InternalCode,
  string? ExternalCode,
  string? Notes,
  EstateStatus Status,
  EstateType Type,
  EstateOwnership Ownership,
  int ManagementSubjectId,
  int? ManagementOrgUnitId,
  int MainUsageTypeId,
  int UsageTypeId,
  int? SurfaceAreaSqM,
  int? BuildYear,
  DateOnly? DecommissioningDate,
  AddressInput[] Addresses,
  StairInput[] Stairs,
  FloorInput[] Floors,
  EstateTotalMarketValueInput? MarketValue,
  EstateValuationInput[] Valuations,
  RefactoringInput[] Refactorings);
