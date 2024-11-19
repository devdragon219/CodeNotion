using HotChocolate.Data.Filters;
using RealGimm.Core.Common.AccountingItemAggregate;

namespace RealGimm.Web.Common.Queries.Filters;

public class AccountingItemFilterType : FilterInputType<AccountingItem>
{
    protected override void Configure(IFilterInputTypeDescriptor<AccountingItem> descriptor)
    {
        descriptor.BindFieldsImplicitly();
    }
}
