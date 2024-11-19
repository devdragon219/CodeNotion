using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mutations;

public class CadastralLandCategoryMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Create)]
  public async Task<Result<CadastralLandCategory>> Add(
   CadastralLandCategoryInput input,
   [Service] IRepository<CadastralLandCategory> repository,
   [Service] IMapper mapper,
   CancellationToken cancellationToken = default)
  {
    CadastralLandCategory? cadastralLandCategory;

    try
    {
      cadastralLandCategory = await mapper.MapAsync<CadastralLandCategoryInput, CadastralLandCategory>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CadastralLandCategory>.Invalid(exception.ValidationErrors.ToList());
    }

    if (cadastralLandCategory is null)
    {
      return Result<CadastralLandCategory>.Error();
    }

    var validationErrors = cadastralLandCategory.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CadastralLandCategory>.Invalid(validationErrors);
    }

    await repository.AddAsync(cadastralLandCategory, cancellationToken);
    return cadastralLandCategory;
  }


  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Update)]
  public async Task<Result<CadastralLandCategory>> Update(
    int id,
    CadastralLandCategoryInput input,
    [Service] IRepository<CadastralLandCategory> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var cadastralLandCategory = await repository.SingleOrDefaultAsync(new GetByIdSpec<CadastralLandCategory>(id), cancellationToken);
    if (cadastralLandCategory is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, cadastralLandCategory, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CadastralLandCategory>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = cadastralLandCategory.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CadastralLandCategory>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(cadastralLandCategory, cancellationToken);

    return cadastralLandCategory;
  }

  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<CadastralLandCategory> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<CadastralLandCategory>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_CADASTRAL_LAND_CATEGORY, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<CadastralLandCategory> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<CadastralLandCategory>(ids), repository, cancellationToken);
}
