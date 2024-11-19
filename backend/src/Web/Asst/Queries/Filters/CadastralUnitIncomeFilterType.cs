using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CadastralUnitIncomeFilterType : FilterInputType<CadastralUnitIncome>
{
  protected override void Configure(IFilterInputTypeDescriptor<CadastralUnitIncome> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Ignore(e => e.CadastralCategory);
    descriptor.Ignore(e => e.CadastralLandCategory);
  }
}
