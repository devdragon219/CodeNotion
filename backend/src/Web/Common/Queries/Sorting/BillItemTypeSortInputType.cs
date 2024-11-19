using HotChocolate.Data.Sorting;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Common.Queries.Sorting;

public class BillItemTypeSortInputType : SortInputType<BillItemType>
{
  protected override void Configure(ISortInputTypeDescriptor<BillItemType> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<BillItemType, AccountingItem>(
      "defaultAccountingItemInternalCode",
      accountingItem => accountingItem.InternalCode,
      accountingItemIds => billItemType =>
        billItemType.DefaultAccountingItemId.HasValue
          ? accountingItemIds[billItemType.DefaultAccountingItemId.Value]
          : int.MinValue);
  }
}
