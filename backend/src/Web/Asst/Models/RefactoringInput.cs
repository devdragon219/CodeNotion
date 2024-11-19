using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record RefactoringInput(
  int? Id,
  int ReferenceYear,
  int? BuildingPermitYear,
  UnitCondition Condition,
  double? AgeCoefficient,
  int[] EstateUnitIds) : IMaybeIdentifiable;
