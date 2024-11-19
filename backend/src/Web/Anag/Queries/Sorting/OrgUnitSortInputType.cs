using RealGimm.Core.Anag.OrgUnitAggregate;
using HotChocolate.Data.Sorting;

namespace RealGimm.Web.Anag.Queries.Sorting;

public class OrgUnitSortInputType : SortInputType<OrgUnit>
{
  protected override void Configure(ISortInputTypeDescriptor<OrgUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Ignore(orgUnit => orgUnit.InfluenceArea);
    descriptor.Ignore(orgUnit => orgUnit.Children);
    descriptor.Ignore(orgUnit => orgUnit.OrgUnitType);
    descriptor.Ignore(orgUnit => orgUnit.Contacts);
  }
}
