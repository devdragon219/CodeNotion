using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class SLAFilterType : FilterInputType<SLA>
{
  protected override void Configure(IFilterInputTypeDescriptor<SLA> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(sla => sla.Contract != null)
      .Name("isAttachedToContract");
  }
}
