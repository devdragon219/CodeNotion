using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CatalogueCategoryFilterType : FilterInputType<CatalogueCategory>
{
  protected override void Configure(IFilterInputTypeDescriptor<CatalogueCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
