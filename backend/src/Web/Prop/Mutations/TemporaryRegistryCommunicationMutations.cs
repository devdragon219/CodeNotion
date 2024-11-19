using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using Ardalis.Result;
using RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Prop.Models;

namespace RealGimm.Web.Prop.Mutations;

public class TemporaryRegistryCommunicationMutations
{
  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> Confirm(
    TemporaryRegistryCommunicationGroupId groupId,
    DateOnly date,
    int requestingSubjectLegalRepresentativeId,
    int debtBankAccountId,
    [Service] IRepository<RegistryCommunication> registryCommunicationRepository,
    CancellationToken cancellationToken = default)
  {
    var communications = await registryCommunicationRepository
      .AsQueryable(new TemporaryRegistryCommunicationByGroupIdSpec(groupId))
      .ToListAsync(cancellationToken);

    if (communications.Count == 0)
    {
      return Result.NotFound();
    }

    foreach (var communication in communications)
    {
      communication.Confirm(date, requestingSubjectLegalRepresentativeId, debtBankAccountId);
    }
    
    await registryCommunicationRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> ConfirmRange(
    TemporaryRegistryCommunicationGroupId[] groupIds,
    ConfirmTemporaryRegistryCommunicationGroupInput[] inputs,
    [Service] IRepository<RegistryCommunication> registryCommunicationRepository,
    CancellationToken cancellationToken = default)
  {
    var inputsPerManagementSubject = inputs.ToDictionary(input => input.ManagementSubjectId);

    foreach (var groupId in groupIds)
    {
      var communicationsPerManagementSubject = await registryCommunicationRepository
        .AsQueryable(new TemporaryRegistryCommunicationByGroupIdSpec(groupId))
        .Include(communication => communication.Contract)
        .ToListAsync(cancellationToken);

      if (communicationsPerManagementSubject.Count == 0)
      {
        return Result.NotFound();
      }

      foreach (var communication in communicationsPerManagementSubject)
      {
        var input = inputsPerManagementSubject[groupId.ManagementSubjectId];
        communication.Confirm(input.Date, input.RequestingSubjectLegalRepresentativeId, input.DebtBankAccountId);
      }
    }

    await registryCommunicationRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> ConfirmAll(
    ConfirmTemporaryRegistryCommunicationGroupInput[] inputs,
    [Service] IRepository<RegistryCommunication> registryCommunicationRepository,
    CancellationToken cancellationToken = default)
  {
    var inputsPerManagementSubject = inputs.ToDictionary(input => input.ManagementSubjectId);

    var communicationsPerManagementSubject = await registryCommunicationRepository
      .AsQueryable(new TemporaryRegistryCommunicationSpec())
      .GroupBy(communication => communication.Contract!.ManagementSubjectId)
      .Select(group => new { group.Key, Items = group.ToList() })
      .ToDictionaryAsync(group => group.Key, group => group.Items, cancellationToken);

    foreach (var (managementSubjectId, communications) in communicationsPerManagementSubject)
    {
      foreach (var communication in communications)
      {
        var input = inputsPerManagementSubject[managementSubjectId];
        communication.Confirm(input.Date, input.RequestingSubjectLegalRepresentativeId, input.DebtBankAccountId);
      }
    }

    await registryCommunicationRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }
}
