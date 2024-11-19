using HotChocolate.Data.Sorting;
using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class AdministrationTermSortInputType : SortInputType<AdministrationTerm>
{
  protected override void Configure(ISortInputTypeDescriptor<AdministrationTerm> descriptor) => descriptor.BindFieldsImplicitly();
}
