using HotChocolate.Data.Filters;
using RealGimm.Core.Econ.TaxCreditAggregate;

namespace RealGimm.Web.Econ.Queries.Filters;

public class TaxCreditFilterType : FilterInputType<TaxCredit>
{
  protected override void Configure(IFilterInputTypeDescriptor<TaxCredit> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
