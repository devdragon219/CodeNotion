using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mutations;
public class FloorTemplateMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<FloorTemplate>> AddFloorTemplate(
    FloorTemplateInput input,
    [Service] IRepository<FloorTemplate> repository,
    CancellationToken cancellationToken = default)
  {
    var exists = await repository.AnyAsync(new FloorTemplateByNameSpec(input.Name.Trim()), cancellationToken);
    if (exists)
    {
      return Result<FloorTemplate>.Invalid(ErrorCode.DuplicateFloorTemplateName.ToValidationError());
    }

    var floorTemplate = new FloorTemplate(input.Name.Trim(), input.Position);

    return await repository.AddAsync(floorTemplate, cancellationToken);
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<List<FloorTemplate>>> AddFloorTemplates(
    FloorTemplateInput[] input,
    [Service] IRepository<FloorTemplate> repository,
    CancellationToken cancellationToken = default)
  {
    if (!input.Any())
    {
      return Result<List<FloorTemplate>>.Error();
    }

    var returnList = new List<FloorTemplate>();

    foreach (var floor in input)
    {
      returnList.Add(await AddFloorTemplate(floor, repository, cancellationToken));
    }
    
    return Result<List<FloorTemplate>>.Success(returnList);
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<FloorTemplate>> UpdateFloor(
  int floorTemplateId,
  FloorTemplateInput input,
  [Service] IRepository<FloorTemplate> repository,
  [Service] IMapper mapper,
  CancellationToken cancellationToken = default
  )
  {
    var existingFloor = await repository
      .AsQueryable(new GetByIdSpec<FloorTemplate>(floorTemplateId))
      .FirstOrDefaultAsync(cancellationToken);

    if (existingFloor == null)
    {
      return Result<FloorTemplate>.NotFound();
    }

    FloorTemplate? floor;

    try
    {
      floor = await mapper.MapAsync<FloorTemplateInput, FloorTemplate>(input, existingFloor, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<FloorTemplate>.Invalid(exception.ValidationErrors.ToList());
    }

    if (floor is null)
    {
      return Result<FloorTemplate>.Error();
    }

    var validationErrors = floor.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<FloorTemplate>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(floor, cancellationToken);

    return floor;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> DeleteFloor(
    int floorId,
    [Service] IRepository<FloorTemplate> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync<FloorTemplate>(new GetByIdSpec<FloorTemplate>(floorId), repository, cancellationToken);


  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> DeleteRangeFloor(
    int[] floorIds,
    [Service] IRepository<FloorTemplate> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync<FloorTemplate>(new GetByIdsSpec<FloorTemplate>(floorIds), repository, cancellationToken);
}
