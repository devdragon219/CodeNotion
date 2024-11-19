using HotChocolate.Data.Sorting;
using RealGimm.Core.Econ.TaxCreditAggregate;

namespace RealGimm.Web.Econ.Queries.Sorting;

public class TaxCreditSortInputType : SortInputType<TaxCredit>
{
  protected override void Configure(ISortInputTypeDescriptor<TaxCredit> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
