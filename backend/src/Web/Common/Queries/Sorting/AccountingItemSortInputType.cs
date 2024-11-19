using HotChocolate.Data.Sorting;
using RealGimm.Core.Common.AccountingItemAggregate;

namespace RealGimm.Web.Common.Queries.Sorting;

public class AccountingItemSortInputType : SortInputType<AccountingItem>
{
  protected override void Configure(ISortInputTypeDescriptor<AccountingItem> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
