using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.QualificationLevelAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class QualificationLevelFilterType : FilterInputType<QualificationLevel>
{
  protected override void Configure(IFilterInputTypeDescriptor<QualificationLevel> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
