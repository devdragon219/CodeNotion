using HotChocolate.Data.Sorting;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Web.Nrgy.Queries.Sorting;

public class UtilityTypeSortInputType : SortInputType<UtilityType>
{
  protected override void Configure(ISortInputTypeDescriptor<UtilityType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

