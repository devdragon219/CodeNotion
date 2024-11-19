using Ardalis.Result;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.IAM;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceCategoryAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Mutations;

public class ServiceCategoryMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Create)]
  public async Task<Result<ServiceCategory>> Add(
    ServiceCategoryInput input,
    [Service] IRepository<ServiceCategory> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    ServiceCategory? serviceCategory;
    try
    {
      serviceCategory = await mapper.MapAsync<ServiceCategoryInput, ServiceCategory>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<ServiceCategory>.Invalid(exception.ValidationErrors.ToList());
    }

    if (serviceCategory is null)
    {
      return Result<ServiceCategory>.Error();
    }

    var validationErrors = serviceCategory.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<ServiceCategory>.Invalid(validationErrors);
    }

    await repository.AddAsync(serviceCategory, cancellationToken);

    return serviceCategory;
  }

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Update)]
  public async Task<Result<ServiceCategory>> Update(
    int id,
    ServiceCategoryInput input,
    [Service] IRepository<ServiceCategory> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var existingServiceCategory = await repository
      .AsQueryable(new GetByIdSpec<ServiceCategory>(id), new ServiceCategoryIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (existingServiceCategory is null)
    {
      return Result<ServiceCategory>.NotFound();
    }

    ServiceCategory? serviceCategory;
    try
    {
      serviceCategory = await mapper.MapAsync(input, existingServiceCategory, cancellationToken);
    }
    catch (MappingException mappingException)
    {
      return Result<ServiceCategory>.Invalid(mappingException.ValidationErrors);
    }

    if (serviceCategory is null)
    {
      return Result<ServiceCategory>.Error();
    }

    var errors = serviceCategory.Validate().ToList();
    if (errors.Count > 0)
    {
      return Result<ServiceCategory>.Invalid(errors);
    }

    if (serviceCategory.InternalCode != null &&
        await repository
          .AsQueryable(new GetByInternalCodeSpec<ServiceCategory>(serviceCategory.InternalCode), new ExcludeByIdSpec<ServiceCategory>(serviceCategory.Id))
          .AnyAsync(cancellationToken))
    {
      return Result<ServiceCategory>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(serviceCategory, cancellationToken);

    return serviceCategory;
  }

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Delete)]
  public async Task<Result> Delete(
    int serviceCategoryId,
    [Service] IRepository<ServiceCategory> repository,
    CancellationToken cancellationToken = default)
    => await DeleteAsync(new GetByIdSpec<ServiceCategory>(serviceCategoryId), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_SERVICE_CATEGORY, Permission.Delete)]
  public async Task<Result> DeleteRange(
    int[] serviceCategoryIds,
    [Service] IRepository<ServiceCategory> repository,
    CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(new GetByIdsSpec<ServiceCategory>(serviceCategoryIds), repository, cancellationToken);
}
