using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class CadastralLandCategorySortInputType : SortInputType<CadastralLandCategory>
{
  protected override void Configure(ISortInputTypeDescriptor<CadastralLandCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}

