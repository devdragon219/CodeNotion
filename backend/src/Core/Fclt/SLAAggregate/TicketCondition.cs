using Ardalis.Result;
using HotChocolate;
using HotChocolate.Types;

namespace RealGimm.Core.Fclt.SLAAggregate;

[InterfaceType]
public abstract class TicketCondition : EntityBase
{
  [GraphQLIgnore]
  public abstract IEnumerable<ValidationError> Validate();
}
