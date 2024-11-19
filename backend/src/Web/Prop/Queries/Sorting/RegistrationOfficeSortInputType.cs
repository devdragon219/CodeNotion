using HotChocolate.Data.Sorting;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class RegistrationOfficeSortInputType : SortInputType<RegistrationOffice>
{
  protected override void Configure(ISortInputTypeDescriptor<RegistrationOffice> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

