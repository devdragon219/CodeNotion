using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CatalogueItemFilterType : FilterInputType<CatalogueItem>
{
  protected override void Configure(IFilterInputTypeDescriptor<CatalogueItem> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
