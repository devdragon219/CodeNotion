using HotChocolate.Data.Filters;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Common.Queries.Filters;

public class BillItemTypeFilterType : FilterInputType<BillItemType>
{
  protected override void Configure(IFilterInputTypeDescriptor<BillItemType> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<BillItemType, AccountingItem>(
      "defaultAccountingItemInternalCode",
      query => accountingItem => accountingItem.InternalCode!.Contains(query),
      accountingItemIds => billItemType =>
        billItemType.DefaultAccountingItemId.HasValue
          ? accountingItemIds.Contains(billItemType.DefaultAccountingItemId.Value)
          : false);
  }
}
