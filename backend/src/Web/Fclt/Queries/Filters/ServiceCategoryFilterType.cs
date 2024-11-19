using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class ServiceCategoryFilterType : FilterInputType<ServiceCategory>
{
  protected override void Configure(IFilterInputTypeDescriptor<ServiceCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
