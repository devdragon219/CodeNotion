using RealGimm.Core;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Queries.Filters;

namespace RealGimm.Web.Asst.Queries;

public class FloorTemplateQueries
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UseFiltering(typeof(FloorFilterType))]
  [UseSorting]
  public IQueryable<FloorTemplate> ListFloorTemplates([Service] IReadRepository<FloorTemplate> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<FloorTemplate> ListFloorTemplatesPaginated([Service] IReadRepository<FloorTemplate> repository)
    => repository.AsQueryable();


  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Read)]
  public async Task<FloorTemplate?> GetFloorTemplate(int Id, [Service] IReadRepository<FloorTemplate> repository)
    => await repository.FirstOrDefaultAsync(new GetByIdSpec<FloorTemplate>(Id));
}
