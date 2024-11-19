using Ardalis.Result;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.IAM;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;

namespace RealGimm.Web.Asst.Mutations;

public class CatalogueItemMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Delete)]
  public async Task<Result> Delete(
    int id,
    [Service] IRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
    => await DeleteAsync(new GetByIdSpec<CatalogueItem>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Delete)]
  public async Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(new GetByIdsSpec<CatalogueItem>(ids), repository, cancellationToken);
  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Update)]
  public async Task<Result<CatalogueItem>> Update(
    CatalogueItemInput input,
    [Service] IRepository<CatalogueItem> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    if (!input.Id.HasValue)
    {
      return Result<CatalogueItem>.Forbidden();
    }

    var item = await repository
      .AsQueryable(new GetByIdSpec<CatalogueItem>(input.Id.Value), new CatalogueItemIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (item is null)
    {
      return Result<CatalogueItem>.Forbidden();
    }

    try
    {
      await mapper.MapAsync(input, item, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CatalogueItem>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = item!.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CatalogueItem>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(item, cancellationToken);

    return item;
  }
}
