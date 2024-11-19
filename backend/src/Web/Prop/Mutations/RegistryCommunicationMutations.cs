using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using Ardalis.Result;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons;

namespace RealGimm.Web.Prop.Mutations;

public class RegistryCommunicationMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> MarkAsExcluded(
    int id,
    [Service] IRepository<RegistryCommunication> repository,
    CancellationToken cancellationToken = default)
  {
    var communication = await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistryCommunication>(id), cancellationToken);
    if (communication is null)
    {
      return Result.NotFound();
    }
    
    communication.MarkAsExcluded();
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Update)]
  public async Task<Result> MarkAsIncluded(
    int id,
    [Service] IRepository<RegistryCommunication> repository,
    CancellationToken cancellationToken = default)
  {
    var communication = await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistryCommunication>(id), cancellationToken);
    if (communication is null)
    {
      return Result.NotFound();
    }
    
    communication.MarkAsIncluded();
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_REGISTRY_COMMUNICATION, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<RegistryCommunication> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<RegistryCommunication>(ids), repository, cancellationToken);
}
