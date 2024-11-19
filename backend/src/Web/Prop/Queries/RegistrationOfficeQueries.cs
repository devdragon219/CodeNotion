using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;

namespace RealGimm.Web.Prop.Queries;

public class RegistrationOfficeQueries
{
  [BackOfficePermission(Features.PROP_REGISTRATION_OFFICES, Permission.Read)]
  public async Task<RegistrationOffice?> Get(int id,
    [Service] IReadRepository<RegistrationOffice> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistrationOffice>(id), cancellationToken);

  [BackOfficePermission(Features.PROP_REGISTRATION_OFFICES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(RegistrationOfficeFilterType))]
  [UseSorting(typeof(RegistrationOfficeSortInputType))]
  public IQueryable<RegistrationOffice> ListRegistrationOffices([Service] IReadRepository<RegistrationOffice> repository)
    => repository.AsQueryable();
}
