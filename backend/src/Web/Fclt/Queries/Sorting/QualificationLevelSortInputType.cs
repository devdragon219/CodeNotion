using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.QualificationLevelAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class QualificationLevelSortInputType : SortInputType<QualificationLevel>
{
  protected override void Configure(ISortInputTypeDescriptor<QualificationLevel> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
