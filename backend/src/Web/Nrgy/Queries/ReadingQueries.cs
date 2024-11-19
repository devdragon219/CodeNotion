using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.Web.Nrgy.Queries.Filters;
using RealGimm.Web.Nrgy.Queries.Sorting;
using RealGimm.WebCommons;

namespace RealGimm.Web.Nrgy.Queries;

public class ReadingQueries : QueriesBase
{
  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ReadingFilterType))]
  [UseSorting(typeof(ReadingSortInputType))]
  public IQueryable<Reading> ListReadings([Service] IRepository<Reading> repository)
    => repository.AsQueryable();
}
