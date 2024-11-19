using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;
using HotChocolate.Resolvers;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate.Specification;
using RealGimm.WebCommons.Models;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Web.Prop.Queries;

public class RegistrationPaymentQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Read)]
  public Task<RegistrationPayment?> Get(
    int id,
    [Service] IReadRepository<RegistrationPayment> repository,
    CancellationToken cancellationToken = default)
    => repository.AsQueryable(new RegistrationPaymentIncludeAllSpec(), new GetByIdSpec<RegistrationPayment>(id)).SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(RegistrationPaymentFilterType))]
  [UseSorting(typeof(RegistrationPaymentSortInputType))]
  public Task<IQueryable<RegistrationPayment>> ListRegistrationPayments(
    [Service] RepositoryWebWrapper<RegistrationPayment> repository,
    [SchemaService] IResolverContext? resolverContext)
    => repository.ListAllAsync(resolverContext, new RegistrationPaymentIncludeAllSpec());

  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Read)]
  [UseFiltering(typeof(RegistrationPaymentFilterType))]
  [UseSorting(typeof(RegistrationPaymentSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<RegistrationPayment> repository,
    [Service] IExportService<RegistrationPayment> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
    {
      var registrationPayments = (await repository.ListAllAsync(resolverContext, new RegistrationPaymentIncludeAllSpec())).ToArray();
      return await ExportToExcelAsync(registrationPayments, distributedCache, exportService, cancellationToken);
    }
}
