using Ardalis.Specification;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Models;

namespace RealGimm.Web.Prop.Mutations;

public abstract class ContractVariationBaseMutations
{
  public void UpsertCounterpartsVariation(
    Contract contract,
    ContractVariationUpdatedCounterpartInput[] updatedCounterpartInputs,
    ContractVariationNewCounterpartInput[] newCounterpartInputs)
  {
    var counterpartsAndInputs = contract.Counterparts
    .OrderBy(counterpart => counterpart.Id)
    .Zip(updatedCounterpartInputs.OrderBy(input => input.Id));

    // updating existing counterparts
    foreach (var (counterpart, input) in counterpartsAndInputs)
    {
      counterpart.SetType(contract.Type.IsActive ? input.Type!.Value : CounterpartType.Regular);
      counterpart.SetContractSharePercent(input.ContractSharePercent);
      counterpart.SetIsMainCounterpart(input.IsMainCounterpart);
    }

    // adding new counterparts
    contract.Counterparts.AddRange(newCounterpartInputs.Select(input =>
    {
      var counterpartToAdd = new Counterpart();
      counterpartToAdd.SetSubjectId(input.SubjectId);
      counterpartToAdd.SetSince(input.Since);
      counterpartToAdd.SetType(contract.Type.IsActive ? input.Type!.Value : CounterpartType.Regular);
      counterpartToAdd.SetContractSharePercent(input.ContractSharePercent);
      counterpartToAdd.SetIsMainCounterpart(input.IsMainCounterpart);
      return counterpartToAdd;
    }));
  }

  public void UpsertCounterpartsTakeover(
    Contract contract,
    DateOnly takeoverDate,
    TakeoverType takeoverType,
    ContractNoDateUpdateCounterpartInput[] updatedCounterpartInputs,
    ContractNoDateNewCounterpartInput[] newCounterpartInputs)
  {
    var outgoingCounterparts = contract.Counterparts
      .Where(counterpart => !updatedCounterpartInputs.Select(input => input.Id).Contains(counterpart.Id))
      .ToArray();

    // removing outgoing counterparts
    foreach (var counterpart in outgoingCounterparts)
    {
      contract.Counterparts.Remove(counterpart);
    }

    var counterpartsAndInputs = contract.Counterparts
      .OrderBy(counterpart => counterpart.Id)
      .Zip(updatedCounterpartInputs.OrderBy(input => input.Id));

    // updating existing counterparts
    foreach (var (counterpart, input) in counterpartsAndInputs)
    {
      counterpart.SetContractSharePercent(input.ContractSharePercent);
      counterpart.SetIsMainCounterpart(input.IsMainCounterpart);
    }

    // adding new conuterparts
    foreach (var input in newCounterpartInputs)
    {
      var newCounterpart = new Counterpart();
      newCounterpart.SetSubjectId(input.SubjectId);
      newCounterpart.SetSince(takeoverDate);
      newCounterpart.SetContractSharePercent(input.ContractSharePercent);
      newCounterpart.SetIsMainCounterpart(input.IsMainCounterpart);
      newCounterpart.SetType(contract.Type.IsActive ? input.Type!.Value : CounterpartType.Regular);

      contract.Counterparts.Add(newCounterpart);

      // creating takeovers for every outgoing counterpart
      foreach (var outgoingTenant in outgoingCounterparts)
      {
        var takeover = new Takeover();
        takeover.SetTakeoverDate(takeoverDate);
        takeover.SetEffectiveDate(takeoverDate);
        takeover.SetType(takeoverType);
        takeover.SetOriginalSubjectId(outgoingTenant.SubjectId);
        takeover.SetNewSubjectId(newCounterpart.SubjectId);

        contract.Takeovers.Add(takeover);
      }
    }
  }

  public void UpsertCounterpartsTransfer(
    Contract contract,
    DateOnly transferDate,
    ContractNoDateUpdateCounterpartInput[] updatedCounterpartInputs,
    ContractNoDateNewCounterpartInput[] newCounterpartInputs
    )
  {
    var outgoingCounterparts = contract.Counterparts
      .Where(counterpart => !updatedCounterpartInputs.Select(input => input.Id).Contains(counterpart.Id))
      .ToArray();

    // removing outgoing counterparts
    foreach (var counterpart in outgoingCounterparts)
    {
      contract.Counterparts.Remove(counterpart);
    }

    var counterpartsAndInputs = contract.Counterparts
      .OrderBy(counterpart => counterpart.Id)
      .Zip(updatedCounterpartInputs.OrderBy(input => input.Id));

    // updating existing counterparts
    foreach (var (counterpart, input) in counterpartsAndInputs)
    {
      counterpart.SetContractSharePercent(input.ContractSharePercent);
      counterpart.SetIsMainCounterpart(input.IsMainCounterpart);
    }

    // adding new conuterparts
    foreach (var input in newCounterpartInputs)
    {
      var newCounterpart = new Counterpart();
      newCounterpart.SetSubjectId(input.SubjectId);
      newCounterpart.SetSince(transferDate);
      newCounterpart.SetContractSharePercent(input.ContractSharePercent);
      newCounterpart.SetIsMainCounterpart(input.IsMainCounterpart);
      newCounterpart.SetType(contract.Type.IsActive ? input.Type!.Value : CounterpartType.Regular);

      contract.Counterparts.Add(newCounterpart);
    }
  }

  public void UpsertCounterpartDeath(
    Contract contract,
    Counterpart deadCounterpart, 
    ContractDeathVariationNewCounterpartInput[] heirInputs,
    ContractVariationUpdatedCounterpartInput[] updatedCounterpartInputs)
  {
    // removing dead counterpart
    contract.Counterparts.Remove(deadCounterpart);

    var counterpartsAndInputs = contract.Counterparts
      .OrderBy(counterpart => counterpart.Id)
      .Zip(updatedCounterpartInputs.OrderBy(input => input.Id));

    // updating existing counterparts
    foreach (var (counterpart, input) in counterpartsAndInputs)
    {
      counterpart.SetIsMainCounterpart(input.IsMainCounterpart);
      counterpart.SetContractSharePercent(input.ContractSharePercent);
    }

    // adding heir conuterparts & takeovers
    foreach (var input in heirInputs)
    {
      var heirCounterpart = new Counterpart();
      heirCounterpart.SetSubjectId(input.SubjectId);
      heirCounterpart.SetSince(input.TakeoverDate);
      heirCounterpart.SetContractSharePercent(input.ContractSharePercent);
      heirCounterpart.SetIsMainCounterpart(input.IsMainCounterpart);
      heirCounterpart.SetType(contract.Type.IsActive ? input.Type!.Value : CounterpartType.Regular);

      contract.Counterparts.Add(heirCounterpart);

      var takeover = new Takeover();
      takeover.SetTakeoverDate(input.TakeoverDate);
      takeover.SetEffectiveDate(input.TakeoverDate);
      takeover.SetType(TakeoverType.ita_T1Demise);
      takeover.SetOriginalSubjectId(deadCounterpart.SubjectId);
      takeover.SetNewSubjectId(heirCounterpart.SubjectId);

      contract.Takeovers.Add(takeover);
    }
  }
}
