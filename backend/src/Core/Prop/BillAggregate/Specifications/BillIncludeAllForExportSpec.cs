using Ardalis.Specification;

namespace RealGimm.Core.Prop.BillAggregate.Specifications;

public sealed class BillIncludeAllForExportSpec : Specification<Bill>
{
  public BillIncludeAllForExportSpec()
  {
    Query
      .Include(bill => bill.BillRows)
        .ThenInclude(br => br.ItemType)
      .Include(bill => bill.Contract!)
        .ThenInclude(contract => contract.Type);
  }
}
