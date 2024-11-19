using RealGimm.Core.Anag.SubjectCategoryAggregate;
using HotChocolate.Data.Sorting;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.WebFrontOffice.Anag.Queries.Sorting;

public class SubjectCategorySortInputType : SortInputType<SubjectCategory>
{
  protected override void Configure(ISortInputTypeDescriptor<SubjectCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Ignore(subcat => subcat.Subjects);
  }
}
