using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class ServiceFilterType : FilterInputType<Service>
{
  protected override void Configure(IFilterInputTypeDescriptor<Service> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
