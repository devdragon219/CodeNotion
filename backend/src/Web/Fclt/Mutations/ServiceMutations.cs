using Ardalis.Result;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.IAM;
using RealGimm.Core.Fclt.ServiceAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Mutations;

public class ServiceMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Create)]
  public async Task<Result<Service>> Add(
    ServiceInput input,
    [Service] IRepository<Service> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    Service? service;
    try
    {
      service = await mapper.MapAsync<ServiceInput, Service>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Service>.Invalid(exception.ValidationErrors.ToList());
    }

    if (service is null)
    {
      return Result<Service>.Error();
    }

    var validationErrors = service.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Service>.Invalid(validationErrors);
    }

    await repository.AddAsync(service, cancellationToken);

    return service;
  }

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Update)]
  public async Task<Result<Service>> Update(
    int id,
    ServiceInput input,
    [Service] IRepository<Service> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var existingService = await repository
      .AsQueryable(new GetByIdSpec<Service>(id), new ServiceIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (existingService is null)
    {
      return Result<Service>.NotFound();
    }

    Service? service;
    try
    {
      service = await mapper.MapAsync(input, existingService, cancellationToken);
    }
    catch (MappingException mappingException)
    {
      return Result<Service>.Invalid(mappingException.ValidationErrors);
    }

    if (service is null)
    {
      return Result<Service>.Error();
    }

    var errors = service.Validate().ToList();
    if (errors.Count > 0)
    {
      return Result<Service>.Invalid(errors);
    }

    if (service.InternalCode != null &&
        await repository
          .AsQueryable(new GetByInternalCodeSpec<Service>(service.InternalCode), new ExcludeByIdSpec<Service>(service.Id))
          .AnyAsync(cancellationToken))
    {
      return Result<Service>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(service, cancellationToken);

    return service;
  }

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Delete)]
  public async Task<Result> Delete(
    int serviceId,
    [Service] IRepository<Service> repository,
    CancellationToken cancellationToken = default)
    => await DeleteAsync(new GetByIdSpec<Service>(serviceId), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Delete)]
  public async Task<Result> DeleteRange(
    int[] serviceIds,
    [Service] IRepository<Service> repository,
    CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(new GetByIdsSpec<Service>(serviceIds), repository, cancellationToken);
}
