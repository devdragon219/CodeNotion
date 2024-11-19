using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Filters;

public class AdministrationTermFilterType : FilterInputType<AdministrationTerm>
{
  protected override void Configure(IFilterInputTypeDescriptor<AdministrationTerm> descriptor) => descriptor.BindFieldsImplicitly();
}
