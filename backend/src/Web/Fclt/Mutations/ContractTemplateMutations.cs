using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class ContractTemplateMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Create)]
  public async Task<Result<ContractTemplate>> Add(
    ContractTemplateInput input,
    [Service] IRepository<ContractTemplate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    ContractTemplate? contractTemplate;

    try
    {
      contractTemplate = await mapper.MapAsync<ContractTemplateInput, ContractTemplate>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<ContractTemplate>.Invalid(exception.ValidationErrors.ToList());
    }

    if (contractTemplate is null)
    {
      return Result<ContractTemplate>.Error();
    }

    var validationErrors = contractTemplate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<ContractTemplate>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<ContractTemplate>(contractTemplate.InternalCode), cancellationToken))
    {
      return Result<ContractTemplate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(contractTemplate, cancellationToken);

    return contractTemplate;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Update)]
  public async Task<Result<ContractTemplate>> Update(
    int id,
    ContractTemplateInput input,
    [Service] IRepository<ContractTemplate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var contractTemplate = await repository
      .AsQueryable(new GetByIdSpec<ContractTemplate>(id), new ContractTemplateIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (contractTemplate is null)
    {
      return Result.NotFound();
    }

    foreach (var sla in contractTemplate.SLAs)
    {
      await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
      await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
    }

    foreach (var penalty in contractTemplate.Penalties)
    {
      await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
    }

    try
    {
      await mapper.MapAsync(input, contractTemplate, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<ContractTemplate>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = contractTemplate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<ContractTemplate>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<ContractTemplate>(contractTemplate.InternalCode),
        new ExcludeByIdSpec<ContractTemplate>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<ContractTemplate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(contractTemplate, cancellationToken);

    return contractTemplate;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<ContractTemplate> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<ContractTemplate>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<ContractTemplate> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<ContractTemplate>(ids), repository, cancellationToken);
}
