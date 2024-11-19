using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Common;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Events;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;
using Rebus.Bus;

namespace RealGimm.Web.Prop.Mutations;

public class ContractMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Create)]
  public async Task<Result<Contract>> Add(
    ContractInput input,
    [Service] IRepository<Contract> repository,
    [Service] IMapper mapper,
    [Service] IBus bus,
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

    var isDuplicateInternalCode = await repository.AnyAsync(
      new GetByInternalCodeSpec<Contract>(contract.InternalCode!),
      cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<Contract>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(contract, cancellationToken);
    await bus.Publish(new ContractAddedEvent(contract.Id));

    return contract;
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result<Contract>> Update(
    int id,
    ContractInput input,
    [Service] IRepository<Contract> repository,
    [Service] IMapper mapper,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(id), new ContractIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result<Contract>.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
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

    await repository.UpdateAsync(contract, cancellationToken);
    await bus.Publish(new ContractUpdatedEvent(contract.Id));

    return contract;
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result<BillingPause>> PauseBilling(
    int contractId,
    DateOnly since,
    string? notes,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository.SingleOrDefaultAsync(new GetByIdSpec<Contract>(contractId), cancellationToken);
    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result<BillingPause>.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    var billingPause = new BillingPause();
    billingPause.SetSince(since);
    billingPause.SetNotes(notes);

    contract.BillingPauses.Add(billingPause);

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<BillingPause>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);

    return billingPause;
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result<BillingPause>> ResumeBilling(
    int contractId,
    DateOnly pauseEndDate,
    bool isRecoveryArrears,
    string? notes,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository.SingleOrDefaultAsync(new GetByIdSpec<Contract>(contractId), cancellationToken);
    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result<BillingPause>.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    var lastBillingPause = contract.BillingPauses
      .Where(pause => pause.Until is null)
      .OrderBy(pause => pause.Since)
      .LastOrDefault();

    if (lastBillingPause is null)
    {
      return Result<BillingPause>.Invalid(ErrorCode.ContractBillingIsNotPaused.ToValidationError());
    }

    lastBillingPause.SetUntil(pauseEndDate);
    lastBillingPause.SetIsRecoveryArrears(isRecoveryArrears);
    
    if (!string.IsNullOrEmpty(notes))
    {
      lastBillingPause.SetNotes(notes);
    }

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<BillingPause>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);

    return lastBillingPause;
  } 
  
  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> Release(
    int id,
    ReleaseReason? releaseReason,
    DateOnly? releaseDate,
    bool isOccupiedWithoutRight,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository.SingleOrDefaultAsync(new GetByIdSpec<Contract>(id), cancellationToken);
    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.IsReleased)
    {
      return Result.Invalid(ErrorCode.ContractIsAlreadyReleased.ToValidationError());
    }

    contract.SetReleaseDetails(releaseReason, releaseDate, isOccupiedWithoutRight);

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> TransferManagementSubject(
    int[] contractIds,
    int newManagementSubjectId,
    int legalRepresentativeSubjectId,
    DateOnly paymentDate,
    DateOnly terminationDate,
    TakeoverType takeoverType,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
  {
    var contracts = await repository.ListAsync(new GetByIdsSpec<Contract>(contractIds.Distinct()), cancellationToken);
    if (contracts.Any(contract => contract.Status == EntryStatus.FrozenClosed))
    {
      return Result.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    foreach (var contract in contracts)
    {
      var oldManagementSubjectId = contract.ManagementSubjectId;
      contract.SetManagementSubjectId(newManagementSubjectId);

      var takeover = new Takeover();
      takeover.SetOriginalSubjectId(oldManagementSubjectId);
      takeover.SetNewSubjectId(newManagementSubjectId);
      takeover.SetType(takeoverType);
      takeover.SetEffectiveDate(terminationDate);
      takeover.SetTakeoverDate(paymentDate);
      takeover.SetLegalRepresentativeSubjectId(legalRepresentativeSubjectId);

      if (takeover.Type != TakeoverType.ita_T3CompanyTransformation &&
        takeover.Type != TakeoverType.ita_T4CompanyMerger &&
        takeover.Type != TakeoverType.ita_T5CompanySplit &&
        takeover.Type != TakeoverType.ita_T6Others)
      {
        return Result.Invalid(ErrorCode.ContractTransferInvalidTakeoverType.ToValidationError());
      }

      contract.Takeovers.Add(takeover);

      var validationErrors = contract.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result.Invalid(validationErrors);
      }

      repository.UpdateSuspend(contract);
    }

    await repository.UpdateRangeAsync(contracts, cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Contract>(id), repository, cancellationToken);

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Contract> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Contract>(ids), repository, cancellationToken);
}
