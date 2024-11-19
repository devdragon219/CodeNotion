using Ardalis.Specification;

namespace RealGimm.Core.Prop.BillAggregate.Specifications;

public sealed class ActiveBillSpec : Specification<Bill>
{
  public ActiveBillSpec() => Query.Where(bill => bill.Contract!.Type.IsActive);
}
