using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mutations;

public class CatalogueTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Create)]
  public async Task<Result<CatalogueType>> Add(
    CatalogueTypeInput input,
    [Service] IRepository<CatalogueType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    CatalogueType? type;

    try
    {
      type = await mapper.MapAsync<CatalogueTypeInput, CatalogueType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CatalogueType>.Invalid(exception.ValidationErrors);
    }

    if (type is null)
    {
      return Result<CatalogueType>.Error();
    }

    var validationErrors = type.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CatalogueType>.Invalid(validationErrors);
    }

    await repository.AddAsync(type, cancellationToken);

    return type;
  }

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Update)]
  public async Task<Result<CatalogueType>> Update(
    int id,
    CatalogueTypeInput input,
    [Service] IRepository<CatalogueType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var сatalogueType = await repository
      .AsQueryable(new GetByIdSpec<CatalogueType>(id), new CatalogueTypeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (сatalogueType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, сatalogueType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CatalogueType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = сatalogueType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CatalogueType>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(сatalogueType, cancellationToken);

    return сatalogueType;
  }


  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Update)]
  public async Task<Result> Delete(
    int id,
    [Service] IRepository<CatalogueType> repository,
    [Service] IDeleteRestrictionChecker<CatalogueType> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => await DeleteAsync(
      new GetByIdSpec<CatalogueType>(id),
      repository,
      deleteRestrictionChecker.HasRestrictionsAsync,
      cancellationToken);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Update)]
  public async Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<CatalogueType> repository,
    [Service] IDeleteRestrictionChecker<CatalogueType> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(
      new GetByIdsSpec<CatalogueType>(ids),
      repository,
      deleteRestrictionChecker.HasRestrictionsAsync,
      cancellationToken);
}
