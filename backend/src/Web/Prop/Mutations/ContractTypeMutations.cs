using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mutations;

public class ContractTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Create)]
  public async Task<Result<ContractType>> Add(
    ContractTypeInput input,
    [Service] IRepository<ContractType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    ContractType? contractType;

    try
    {
      contractType = await mapper.MapAsync<ContractTypeInput, ContractType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<ContractType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (contractType is null)
    {
      return Result<ContractType>.Error();
    }

    var validationErrors = contractType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<ContractType>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository.AnyAsync(
      new GetByInternalCodeSpec<ContractType>(contractType.InternalCode!),
      cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<ContractType>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(contractType, cancellationToken);

    return contractType;
  }

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Update)]
  public async Task<Result<ContractType>> Update(
    int id,
    ContractTypeInput input,
    [Service] IRepository<ContractType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var contractType = await repository.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(id), cancellationToken);
    if (contractType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, contractType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<ContractType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = contractType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<ContractType>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(contractType, cancellationToken);

    return contractType;
  }

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<ContractType> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<ContractType>(id), repository, cancellationToken);

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<ContractType> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<ContractType>(ids), repository, cancellationToken);
}
