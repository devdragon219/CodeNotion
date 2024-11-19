using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class TicketsPerEstateUnitSortInputType : SortInputType<TicketsPerEstateUnit>
{
  protected override void Configure(ISortInputTypeDescriptor<TicketsPerEstateUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<TicketsPerEstateUnit, EstateUnit>(
      "locationEstateUnitInternalCode",
      estateUnit => estateUnit.InternalCode,
      estateUnitsPerId => ticketsPerEstateUnit => estateUnitsPerId[ticketsPerEstateUnit.LocationEstateUnitId]);
  }
}
