using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CatalogueTypeFilterType : FilterInputType<CatalogueType>
{
  protected override void Configure(IFilterInputTypeDescriptor<CatalogueType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
