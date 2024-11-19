using RealGimm.Core.Anag.SubjectAggregate;
using HotChocolate.Data.Filters;

namespace RealGimm.Web.Anag.Queries.Filters;

public class SubjectRelationFilterType : FilterInputType<SubjectRelation>
{
  protected override void Configure(IFilterInputTypeDescriptor<SubjectRelation> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Field(f => f.Main).Type<SubjectFilterType>();
    descriptor.Field(f => f.Subordinate).Type<SubjectFilterType>();
  }
}
