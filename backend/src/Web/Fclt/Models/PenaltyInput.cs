using RealGimm.Core.Shared;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record PenaltyInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public string InternalCode { get; set; } = default!;
  public string Description { get; set; } = default!;
  public ComplexTicketConditionInput IfCondition { get; set; } = default!;
  public BooleanOperator ThenOperator { get; set; }
  public PenaltyValueInput[] ThenPenalties { get; set; } = [];
}
