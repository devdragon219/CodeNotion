using HotChocolate.Data.Filters;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.Web.Prop.Queries.Filters;

public class RegistrationOfficeFilterType : FilterInputType<RegistrationOffice>
{
  protected override void Configure(IFilterInputTypeDescriptor<RegistrationOffice> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
