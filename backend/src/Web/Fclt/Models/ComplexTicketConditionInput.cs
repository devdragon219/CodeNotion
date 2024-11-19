using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record ComplexTicketConditionInput : TicketConditionInput
{
  public BooleanOperator Operator { get; set; }
  public OneOfTicketConditionInput[] InternalConditions { get; set; } = [];
}
