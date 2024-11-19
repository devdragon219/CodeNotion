using RealGimm.Core.Econ.TaxCreditAggregate.Specifications;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Web.Econ.Queries.Filters;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Econ.Models;
using RealGimm.Web.Econ.Queries.Sorting;

namespace RealGimm.Web.Econ.Queries;

public class TaxCreditQueries
{
  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Read)]
  public async Task<TaxCredit?> Get(
    int id,
    [Service] IReadRepository<TaxCredit> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new EntityNonDeletedSpec<TaxCredit>(), new TaxCreditIncludeAllSpec(), new GetByIdSpec<TaxCredit>(id))
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(TaxCreditFilterType))]
  [UseSorting(typeof(TaxCreditSortInputType))]
  public IQueryable<TaxCredit> ListTaxCredits([Service] IRepository<TaxCredit> repository)
    => repository.AsQueryable(new EntityNonDeletedSpec<TaxCredit>(), new TaxCreditIncludeForListSpec());

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(OperationGroupOutputFilterType))]
  [UseSorting(typeof(OperationGroupOutputSortInputType))]
  public async Task<IEnumerable<OperationGroupOutput>> ListGroupedOperations(
    int taxCreditId,
    [Service] IRepository<TaxCredit> repository,
    CancellationToken cancellationToken)
  {
    var operations = await repository
      .AsQueryable(new EntityNonDeletedSpec<TaxCredit>(), new GetByIdSpec<TaxCredit>(taxCreditId))
      .SelectMany(credit => credit.Operations)
      .ToListAsync(cancellationToken);

    var operationsWithTaxPayments = operations
      .Where(operation => operation.AssetTaxPaymentId != null)
      .GroupBy(operation => operation.Date)
      .Select(group => new OperationGroupOutput
      {
        Ids = group.Select(operation => operation.Id).ToArray(),
        Date = group.Key,
        Amount = group.Sum(operation => operation.Amount),
        Notes = group.Count() == 1 ? group.First().Notes : null
      });

    var operationsWithoutTaxPayments = operations
      .Where(operation => operation.AssetTaxPaymentId == null)
      .Select(group => new OperationGroupOutput
      {
        Ids = [group.Id],
        Date = group.Date,
        Amount = group.Amount,
        Notes = group.Notes
      });

    return operationsWithTaxPayments.Concat(operationsWithoutTaxPayments);
  }
}
