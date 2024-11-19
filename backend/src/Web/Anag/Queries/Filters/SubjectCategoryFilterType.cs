using RealGimm.Core.Anag.SubjectCategoryAggregate;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using HotChocolate.Configuration;
using HotChocolate.Types.Descriptors.Definitions;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Anag.Queries.Filters;

public class SubjectCategoryFilterType : FilterInputType<SubjectCategory>
{
  protected override void Configure(IFilterInputTypeDescriptor<SubjectCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Ignore(subcat => subcat.Subjects);
  }
}
