﻿using RealGimm.Core.Common;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Ardalis.Result;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.ContractAggregate.Events;
using Rebus.Bus;
using Autofac.Core;

namespace RealGimm.Web.Prop.Mutations;

public class PassiveContractMutations : ContractVariationBaseMutations
{
  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> TakeoverTenants(
    int contractId,
    int legalRepresentativeSubjectId,
    DateOnly paymentDate,
    int[] successorIds,
    [Service] IRepository<Contract> repository,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    if (successorIds is null || successorIds.Length == 0)
    {
      return Result.Invalid(ErrorCode.ContractLandlordSuccessorIdsAreRequiredForTakeover.ToValidationError());
    }

    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(contractId), new ContractIncludeAllSpec(), new PassiveContractSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    var tenants = contract.Counterparts
      .Where(counterpart => !counterpart.IsMainCounterpart)
      .ToArray();

    foreach (var tenant in tenants)
    {
      var takeovers = successorIds.Select(successorId =>
      {
        var takeover = new Takeover();
        takeover.SetOriginalSubjectId(tenant.SubjectId);
        takeover.SetNewSubjectId(successorId);
        takeover.SetType(TakeoverType.ita_T2RightsTransfer);
        takeover.SetEffectiveDate(paymentDate);
        takeover.SetTakeoverDate(paymentDate);
        takeover.SetLegalRepresentativeSubjectId(legalRepresentativeSubjectId);

        return takeover;
      });

      contract.Takeovers.AddRange(takeovers);
    }

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);
    await bus.Publish(new ContractManagementSubjectTakeoveredEvent(contract.Id, paymentDate));

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> AddLandlords(
    int contractId,
    ContractVariationUpdatedCounterpartInput[] updatedCounterpartInputs,
    ContractVariationNewCounterpartInput[] newCounterpartInputs,
    [Service] IRepository<Contract> repository,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    if (newCounterpartInputs is null || newCounterpartInputs.Length == 0)
    {
      return Result.Invalid(ErrorCode.PassiveContractNewLandlordsForAddingAreNotProvided.ToValidationError());
    }

    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(contractId), new ContractIncludeAllSpec(), new PassiveContractSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    UpsertCounterpartsVariation(contract, updatedCounterpartInputs, newCounterpartInputs);

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);
    await bus.Publish(new ContractCounterpartsUpdatedEvent(contract.Id));

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> TransferLandlords(
    int contractId,
    DateOnly transferDate,
    ContractNoDateUpdateCounterpartInput[] updatedCounterpartInputs,
    ContractNoDateNewCounterpartInput[] newCounterpartInputs,
    [Service] IRepository<Contract> repository,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(contractId), new ContractIncludeAllSpec(), new PassiveContractSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    UpsertCounterpartsTransfer(contract, transferDate, updatedCounterpartInputs, newCounterpartInputs);

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);
    await bus.Publish(new ContractCounterpartsTransferedEvent(contract.Id));

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> TakeoverLandlords(
    int contractId,
    DateOnly takeoverDate,
    TakeoverType takeoverType,
    ContractNoDateUpdateCounterpartInput[] updatedCounterpartInputs,
    ContractNoDateNewCounterpartInput[] newCounterpartInputs,
    [Service] IRepository<Contract> repository,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(contractId), new ContractIncludeAllSpec(), new PassiveContractSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    UpsertCounterpartsTakeover(contract, takeoverDate, takeoverType, updatedCounterpartInputs, newCounterpartInputs);

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);
    await bus.Publish(new ContractCounterpartsTakeoveredEvent(contract.Id));

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Update)]
  public async Task<Result> TakeoverDeadLandlord(
    int contractId,
    int deadCounterpartId,
    ContractDeathVariationNewCounterpartInput[] heirInputs,
    ContractVariationUpdatedCounterpartInput[] updatedCounterpartInputs,
    [Service] IRepository<Contract> repository,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository
      .AsQueryable(new GetByIdSpec<Contract>(contractId), new ContractIncludeAllSpec(), new PassiveContractSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return Result.NotFound();
    }

    if (contract.Status == EntryStatus.FrozenClosed)
    {
      return Result.Invalid(ErrorCode.ContractIsFrozenClosed.ToValidationError());
    }

    var deadCounterpart = contract.Counterparts.FirstOrDefault(counterpart => counterpart.Id == deadCounterpartId);
    if (deadCounterpart is null)
    {
      return Result.Invalid(ErrorCode.NotExistingDeceasedCounterpart.ToValidationError());
    }

    UpsertCounterpartDeath(contract, deadCounterpart, heirInputs, updatedCounterpartInputs);

    var validationErrors = contract.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contract, cancellationToken);
    await bus.Publish(new ContractCounterpartDeathEvent(contract.Id));

    return Result.Success();
  }
}
