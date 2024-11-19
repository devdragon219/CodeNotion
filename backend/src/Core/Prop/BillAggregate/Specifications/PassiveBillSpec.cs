using Ardalis.Specification;

namespace RealGimm.Core.Prop.BillAggregate.Specifications;

public sealed class PassiveBillSpec : Specification<Bill>
{
  public PassiveBillSpec() => Query.Where(bill => !bill.Contract!.Type.IsActive);
}
