using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using Ardalis.Result;
using RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

namespace RealGimm.Web.Prop.Mutations;

public class ConfirmedRegistryCommunicationMutations
{
  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> CancelConfirmation(
    ConfirmedRegistryCommunicationGroupId groupId,
    [Service] IRepository<RegistryCommunication> registryCommunicationRepository,
    CancellationToken cancellationToken = default)
  {
    var communications = await registryCommunicationRepository.ListAsync(
      new ConfirmedRegistryCommunicationByGroupIdSpec(groupId),
      cancellationToken);

    if (communications.Count == 0)
    {
      return Result.NotFound();
    }

    foreach (var communication in communications)
    {
      communication.CancelConfirmation();
    }

    await registryCommunicationRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> CancelRangeConfirmation(
    ConfirmedRegistryCommunicationGroupId[] groupIds,
    [Service] IRepository<RegistryCommunication> registryCommunicationRepository,
    CancellationToken cancellationToken = default)
  {
    foreach (var groupid in groupIds)
    {
      var communications = await registryCommunicationRepository.ListAsync(
        new ConfirmedRegistryCommunicationByGroupIdSpec(groupid),
        cancellationToken);

      if (communications.Count == 0)
      {
        return Result.NotFound();
      }

      foreach (var communication in communications)
      {
        communication.CancelConfirmation();
      }
    }

    await registryCommunicationRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }
}
