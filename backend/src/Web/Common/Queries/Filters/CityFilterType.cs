using RealGimm.Core.Common.CityAggregate;
using HotChocolate.Data.Filters;

namespace RealGimm.Web.Common.Queries.Filters;

public class CityFilterType : FilterInputType<City>
{
    protected override void Configure(IFilterInputTypeDescriptor<City> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(f => f.Name);
        descriptor.Field(f => f.Name2);
        descriptor.Field(f => f.Name3);
        descriptor.Field(f => f.CountryISO);
        descriptor.Field(f => f.CountryName);
        descriptor.Field(f => f.CountyName);
        descriptor.Field(f => f.RegionName);
        descriptor.Field(f => f.CreationDate);
    }
}
