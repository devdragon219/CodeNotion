using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CadastralUnitTaxConfigFilterType : FilterInputType<CadastralUnitTaxConfig>
{
  protected override void Configure(IFilterInputTypeDescriptor<CadastralUnitTaxConfig> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
