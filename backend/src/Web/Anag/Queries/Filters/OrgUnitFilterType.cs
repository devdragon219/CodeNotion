using RealGimm.Core.Anag.OrgUnitAggregate;
using HotChocolate.Data.Filters;

namespace RealGimm.Web.Anag.Queries.Filters;

public class OrgUnitFilterType : FilterInputType<OrgUnit>
{
  protected override void Configure(IFilterInputTypeDescriptor<OrgUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Ignore(orgUnit => orgUnit.InfluenceArea);
    descriptor.Ignore(orgUnit => orgUnit.Children);
    descriptor.Ignore(orgUnit => orgUnit.Contacts);
  }
}
