using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.PenaltyAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class PenaltyFilterType : FilterInputType<Penalty>
{
  protected override void Configure(IFilterInputTypeDescriptor<Penalty> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(penalty => penalty.Contract != null)
      .Name("isAttachedToContract");
  }
}
