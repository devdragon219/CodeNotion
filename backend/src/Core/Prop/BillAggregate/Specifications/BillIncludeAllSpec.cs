using Ardalis.Specification;

namespace RealGimm.Core.Prop.BillAggregate.Specifications;

public sealed class BillIncludeAllSpec : Specification<Bill>
{
  public BillIncludeAllSpec()
  {
    Query
      .Include(bill => bill.Contract)
        .ThenInclude(c => c!.Type)
      .Include(bill => bill.Contract)
        .ThenInclude(c => c!.LocatedUnits)
      .Include(bill => bill.Contract)
        .ThenInclude(c => c!.Counterparts)
      .Include(bill => bill.BillRows.OrderBy(br => br.Id))
        .ThenInclude(br => br.ItemType);
  }
}
