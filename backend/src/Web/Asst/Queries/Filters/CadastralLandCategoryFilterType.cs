using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CadastralLandCategoryFilterType : FilterInputType<CadastralLandCategory>
{
  protected override void Configure(IFilterInputTypeDescriptor<CadastralLandCategory> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
