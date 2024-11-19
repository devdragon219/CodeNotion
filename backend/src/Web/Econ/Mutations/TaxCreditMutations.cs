using RealGimm.Core.IAM;
using RealGimm.Core;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Econ.TaxCreditAggregate;
using Ardalis.Result;
using RealGimm.WebCommons;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Econ.Models;
using RealGimm.WebCommons.Extensions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Econ.TaxCreditAggregate.Specifications;

namespace RealGimm.Web.Econ.Mutations;

public class TaxCreditMutations : MutationsBase
{
  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Create)]
  public async Task<Result<TaxCredit>> Add(
    AddTaxCreditInput input,
    [Service] IRepository<TaxCredit> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    TaxCredit? taxCredit;

    try
    {
      taxCredit = await mapper.MapAsync<AddTaxCreditInput, TaxCredit>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<TaxCredit>.Invalid(exception.ValidationErrors.ToList());
    }

    if (taxCredit is null)
    {
      return Result<TaxCredit>.Error();
    }

    var validationErrors = taxCredit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<TaxCredit>.Invalid(validationErrors);
    }

    await repository.AddAsync(taxCredit, cancellationToken);

    return taxCredit;
  }

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<TaxCredit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteAsync(new GetByIdSpec<TaxCredit>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Delete)]
  public async Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<TaxCredit> repository,
    CancellationToken cancellationToken = default)
    => await SoftDeleteRangeAsync(new GetByIdsSpec<TaxCredit>(ids), repository, cancellationToken);

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Create)]
  public async Task<Result<Operation>> AddOperation(
    int taxCreditId,
    OperationInput input,
    [Service] IRepository<TaxCredit> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var taxCredit = await repository
      .AsQueryable(new GetByIdSpec<TaxCredit>(taxCreditId), new EntityNonDeletedSpec<TaxCredit>())
      .SingleOrDefaultAsync(cancellationToken);

    if (taxCredit is null)
    {
      return Result<Operation>.NotFound();
    }

    Operation? operation;

    try
    {
      operation = await mapper.MapAsync<OperationInput, Operation>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Operation>.Invalid(exception.ValidationErrors.ToList());
    }

    if (operation is null)
    {
      return Result<Operation>.Error();
    }

    taxCredit.Operations.Add(operation);

    var validationErrors = taxCredit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Operation>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(taxCredit, cancellationToken);

    return operation;
  }
  
  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Update)]
  public async Task<Result<Operation>> UpdateOperation(
    int taxCreditId,
    int operationId,
    OperationInput input,
    [Service] IRepository<TaxCredit> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var taxCredit = await repository
      .AsQueryable(new GetByIdSpec<TaxCredit>(taxCreditId), new EntityNonDeletedSpec<TaxCredit>(), new TaxCreditIncludeAllSpec())
      .Include(credit => credit.Operations)
      .SingleOrDefaultAsync(cancellationToken);

    var operation = taxCredit?.Operations.SingleOrDefault(operation => operation.Id == operationId);
    if (operation is null)
    {
      return Result<Operation>.NotFound();
    }

    if (operation.AssetTaxPaymentId is not null)
    {
      return Result<Operation>.Forbidden();
    }    

    try
    {
      await mapper.MapAsync(input, operation, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Operation>.Invalid(exception.ValidationErrors.ToList());
    }

    if (operation is null)
    {
      return Result<Operation>.Error();
    }

    var validationErrors = taxCredit!.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Operation>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(taxCredit, cancellationToken);

    return operation;
  }

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Delete)]
  public async Task<Result> DeleteOperation(
    int taxCreditId,
    int operationId,
    [Service] IRepository<TaxCredit> repository,
    CancellationToken cancellationToken = default)
  {
    var taxCredit = await repository
      .AsQueryable(new GetByIdSpec<TaxCredit>(taxCreditId), new EntityNonDeletedSpec<TaxCredit>(), new TaxCreditIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    var operation = taxCredit?.Operations.SingleOrDefault(operation => operation.Id == operationId);

    if (operation is null)
    {
      return Result.NotFound();
    }

    if (operation.AssetTaxPaymentId is not null)
    {
      return Result.Forbidden();
    }

    taxCredit!.Operations.Remove(operation);
    await repository.UpdateAsync(taxCredit, cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.ECON_TAX_CREDIT_BASE, Permission.Delete)]
  public async Task<Result> DeleteOperationsRange(
    int taxCreditId,
    int[] operationIds,
    [Service] IRepository<TaxCredit> repository,
    CancellationToken cancellationToken = default)
  {
    var taxCredit = await repository
      .AsQueryable(new GetByIdSpec<TaxCredit>(taxCreditId), new EntityNonDeletedSpec<TaxCredit>(), new TaxCreditIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (taxCredit is null)
    {
      return Result.NotFound();
    }

    var operationsToDelete = taxCredit.Operations.Where(operation => operationIds.Contains(operation.Id)).ToList();
    foreach (var operation in operationsToDelete)
    {
      if (operation.AssetTaxPaymentId is not null)
      {
        return Result.Forbidden();
      }

      taxCredit!.Operations.Remove(operation);
    }

    await repository.UpdateAsync(taxCredit, cancellationToken);

    return Result.Success();
  }
}
