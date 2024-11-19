using RealGimm.SharedKernel.Interfaces;
using Ardalis.Result;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.IAM;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.WebCommons;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Mutations;

public class CatalogueMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Create)]
  public async Task<Result<CatalogueItem[]>> Add(
    CatalogueItemInput[] inputs,
    [Service] IRepository<CatalogueItem> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    if (inputs.DistinctBy(input => (input.EstateId, input.CatalogueTypeId)).Count() > 1)
    {
      return Result<CatalogueItem[]>.Forbidden();
    }

    IEnumerable<CatalogueItem?>? items;

    try
    {
      items = await mapper.MapAsync<CatalogueItemInput, CatalogueItem>(inputs, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CatalogueItem[]>.Invalid(exception.ValidationErrors.ToList());
    }

    if (items is null || items.Any(item => item is null))
    {
      return Result<CatalogueItem[]>.Error();
    }

    foreach (var item in items)
    {
      var validationErrors = item!.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<CatalogueItem[]>.Invalid(validationErrors);
      }
    }

    await repository.AddRangeAsync(items!, cancellationToken);

    return items.ToArray()!;
  }

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Update)]
  public async Task<Result<CatalogueItem[]>> Update(
    CatalogueId id,
    CatalogueItemInput[] inputs,
    [Service] IRepository<CatalogueItem> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    if (inputs.Any(input => new CatalogueId(input.EstateId, input.CatalogueTypeId) != id))
    {
      return Result<CatalogueItem[]>.Forbidden();
    }

    var anyDuplicateIds = inputs
      .Where(input => input.Id.GetValueOrDefault() != default)
      .GroupBy(input => input.Id!.Value)
      .Any(group => group.Count() > 1);

    if (anyDuplicateIds)
    {
      return Result<CatalogueItem[]>.Forbidden();
    }
    
    var items = await repository
      .AsQueryable(new CatalogueItemsByCatalogueIdSpec(id), new CatalogueItemIncludeAllSpec())
      .ToListAsync(cancellationToken);

    var itemsToDelete = items
      .Where(item => !inputs.Any(input => input.Id.GetValueOrDefault() != default && input.Id == item.Id))
      .ToArray();

    items.RemoveAll(item => itemsToDelete.Contains(item));
    repository.DeleteRangeSuspend(itemsToDelete);

    var inputsToUpdate = inputs.Where(input =>
      input.Id.GetValueOrDefault() != default &&
      items.Any(item => item.Id == input.Id));

    foreach (var input in inputsToUpdate)
    {
      var item = items.Single(item => item.Id == input.Id);

      try
      {
        await mapper.MapAsync(input, item, cancellationToken);
      }
      catch (MappingException exception)
      {
        return Result<CatalogueItem[]>.Invalid(exception.ValidationErrors.ToList());
      }

      repository.UpdateSuspend(item!);
    }

    var inputsToAdd = inputs.Where(input => input.Id.GetValueOrDefault() == default);
    foreach (var input in inputsToAdd)
    {
      CatalogueItem item;
      
      try
      {
        item = (await mapper.MapAsync<CatalogueItemInput, CatalogueItem>(input, cancellationToken))!;
      }
      catch (MappingException exception)
      {
        return Result<CatalogueItem[]>.Invalid(exception.ValidationErrors.ToList());
      }

      items.Add(item);
      repository.AddSuspend(item);
    }

    foreach (var item in items)
    {
      var validationErrors = item!.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<CatalogueItem[]>.Invalid(validationErrors);
      }
    }

    await repository.SaveChangesAsync(cancellationToken);

    return items.ToArray()!;
  }

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Delete)]
  public async Task<Result> Delete(
    CatalogueId id,
    [Service] IRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(new CatalogueItemsByCatalogueIdSpec(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Delete)]
  public async Task<Result> DeleteRange(
    CatalogueId[] ids,
    [Service] IRepository<CatalogueItem> repository,
    CancellationToken cancellationToken = default)
  {
    List<CatalogueItem> itemsToDelete = new();

    foreach (var id in ids)
    {
      itemsToDelete.AddRange(await repository.ListAsync(new CatalogueItemsByCatalogueIdSpec(id), cancellationToken));
    }

    try
    {
      await repository.DeleteRangeAsync(itemsToDelete, cancellationToken);
    }
    catch (DbUpdateException)
    {
      return Result.Invalid(ErrorCode.ItemInUseCannotBeDeleted.ToValidationError());
    }

    return Result.Success();
  }
}
