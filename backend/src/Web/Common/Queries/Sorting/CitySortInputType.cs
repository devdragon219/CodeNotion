using RealGimm.Core.Common.CityAggregate;
using HotChocolate.Data.Sorting;

namespace RealGimm.Web.Common.Queries.Sorting;

public class CitySortInputType : SortInputType<City>
{
  protected override void Configure(ISortInputTypeDescriptor<City> descriptor)
  {
    descriptor.BindFieldsExplicitly();
    descriptor.Field(c => c.Id);
    descriptor.Field(c => c.Name);
    descriptor.Field(c => c.RegionName);
    descriptor.Field(c => c.CountyName);
    descriptor.Field(c => c.CountryName);
  }
}
