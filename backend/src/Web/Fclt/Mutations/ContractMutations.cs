using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractMutations)}")]
public class ContractMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Create)]
  public async Task<Result<Contract>> Add(
    ContractInput input,
    [Service] IRepository<Contract> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    Contract? contract;

    try
    {
      contract = await mapper.MapAsync<ContractInput, Contract>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Contract>.Invalid(exception.ValidationErrors.ToList());
    }

    if (contract is null)
    {
      return Result<Contract>.Error();
    }

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Contract>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<Contract>(contract.InternalCode), cancellationToken))
    {
      return Result<Contract>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(contract, cancellationToken);

    return contract;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Update)]
  public async Task<Result<Contract>> Update(
    int id,
    ContractInput input,
    [Service] IRepository<Contract> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(id), new ContractIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    foreach (var sla in contract.SLAs)
    {
      await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
      await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
    }

    foreach (var penalty in contract.Penalties)
    {
      await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
    }

    try
    {
      await mapper.MapAsync(input, contract, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Contract>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Contract>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<Contract>(contract.InternalCode),
        new ExcludeByIdSpec<Contract>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<Contract>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(contract, cancellationToken);

    return contract;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Contract>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Contract>(ids), repository, cancellationToken);
}
