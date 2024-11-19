using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mutations;

public class CatalogueCategoryMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Create)]
  public async Task<Result<CatalogueCategory>> Add(
    CatalogueCategoryInput input,
    [Service] IRepository<CatalogueCategory> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    CatalogueCategory? category;

    try
    {
      category = await mapper.MapAsync<CatalogueCategoryInput, CatalogueCategory>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CatalogueCategory>.Invalid(exception.ValidationErrors);
    }

    if (category is null)
    {
      return Result<CatalogueCategory>.Error();
    }

    var validationErrors = category.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CatalogueCategory>.Invalid(validationErrors);
    }

    await repository.AddAsync(category, cancellationToken);

    return category;
  }

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Update)]
  public async Task<Result<CatalogueCategory>> Update(
    int id,
    CatalogueCategoryInput input,
    [Service] IRepository<CatalogueCategory> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var category = await repository
      .AsQueryable(new GetByIdSpec<CatalogueCategory>(id), new CatalogueCategoryIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (category is null)
    {
      return Result<CatalogueCategory>.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, category, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CatalogueCategory>.Invalid(exception.ValidationErrors);
    }

    var validationErrors = category.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CatalogueCategory>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(category, cancellationToken);

    return category;
  }

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<CatalogueCategory> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<CatalogueCategory>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<CatalogueCategory> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<CatalogueCategory>(ids), repository, cancellationToken);
}
