using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Events;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;
using Rebus.Bus;

namespace RealGimm.Web.Asst.Mutations;

public class CadastralUnitMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Create)]
  public async Task<Result<CadastralUnit>> AddCadastralUnit(
    CadastralUnitInput input,
    [Service] IRepository<CadastralUnit> repository,
    [Service] IMapper mapper,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    if (input.EstateUnitId is null)
    {
      return Result<CadastralUnit>.Forbidden();
    }

    var cadastralUnit = await mapper.MapAsync<CadastralUnitInput, CadastralUnit>(input, cancellationToken);
    if (cadastralUnit is null)
    {
      return Result<CadastralUnit>.Error();
    }

    var validationErrors = cadastralUnit.Validate();
    if (validationErrors.Any())
    {
      return Result<CadastralUnit>.Invalid(validationErrors.ToList());
    }

    await repository.AddAsync(cadastralUnit, cancellationToken);

    await bus.Publish(new CadastralUnitCreatedEvent(cadastralUnit.Id));

    return cadastralUnit;
  }

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Update)]
  public async Task<Result<CadastralUnit>> UpdateCadastralUnit(
    int id,
    bool? isVariation,
    CadastralUnitInput input,
    [Service] IRepository<CadastralUnit> repository,
    [Service] IMapper mapper,
    [Service] ICadastralUnitHystoricChangeService cadastralUnitHystoricChangeService,
    [Service] ICodeSuggestor<CadastralUnit> codeSuggestor,
    [Service] IBus bus,
    CancellationToken cancellationToken = default)
  {
    if (isVariation.GetValueOrDefault() && input.InternalCode is not null)
    {
      return Result<CadastralUnit>.Forbidden();
    }

    var cu = repository.AsQueryable(new GetByIdSpec<CadastralUnit>(id), new CadastralUnitIncludeAllSpec());
    CadastralUnit? exists;
    CadastralUnit? cadastralUnit;
    if (isVariation.GetValueOrDefault())
    {
      exists = await cu
        .AsNoTracking()
        .FirstOrDefaultAsync(cancellationToken);

      var nextCode = await codeSuggestor.SuggestNextCode(input.EstateUnitId, (CadastralUnit?)null)
        ?? throw new InvalidOperationException("Unable to calculate next internalCode for cadastral unit.");

      var fixInput = input with {
        InternalCode = nextCode
      };

      cadastralUnit = await mapper.MapAsync<CadastralUnitInput, CadastralUnit>(fixInput, cancellationToken);
    }
    else
    {
      exists = await cu
      .FirstOrDefaultAsync(cancellationToken);

      cadastralUnit = await mapper.MapAsync(input, exists,  cancellationToken);
    }

    if (exists is null)
    {
      return Result<CadastralUnit>.NotFound();
    }

    if (input.EstateUnitId is null)
    {
      return Result<CadastralUnit>.Forbidden();
    }
    
    if (cadastralUnit is null)
    {
      return Result<CadastralUnit>.Error();
    }

    var validationErrors = cadastralUnit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CadastralUnit>.Invalid(validationErrors);
    }

    if (isVariation.GetValueOrDefault())
    {
      await cadastralUnitHystoricChangeService.MakeChange(id, cadastralUnit, cancellationToken);
    }
    else
    {
      await repository.UpdateAsync(cadastralUnit, cancellationToken);
      await bus.Publish(new CadastralUnitUpdatedEvent(cadastralUnit.Id));
    }

    return cadastralUnit;
  }

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<CadastralUnit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteAsync(new GetByIdSpec<CadastralUnit>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<CadastralUnit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteRangeAsync(new GetByIdsSpec<CadastralUnit>(ids), repository, cancellationToken);
}
