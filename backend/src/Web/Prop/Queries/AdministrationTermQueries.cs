using RealGimm.Core.IAM;
using RealGimm.WebCommons;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate.Specifications;
using RealGimm.Core.Prop.Interfaces;

namespace RealGimm.Web.Prop.Queries;

public class AdministrationTermQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Read)]
  public async Task<AdministrationTerm?> Get(
    int id,
    [Service] IReadRepository<AdministrationTerm> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<AdministrationTerm>(id), new AdministrationTermIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Read)]
  public async Task<IEnumerable<TermGroupedInstallmentPayment>> GetGroupedPayments(
    int administrationTermId,
    [Service] IAdministrationTermService termService,
    CancellationToken cancellationToken = default
    ) => await termService.GetInstallmentPaymentsGroupedByBill(administrationTermId, cancellationToken);
}
