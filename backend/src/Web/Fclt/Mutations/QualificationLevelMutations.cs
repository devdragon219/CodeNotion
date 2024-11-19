using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class QualificationLevelMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<QualificationLevel>> Add(
    QualificationLevelInput input,
    [Service] IRepository<QualificationLevel> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    QualificationLevel? qualificationLevel;

    try
    {
      qualificationLevel = await mapper.MapAsync<QualificationLevelInput, QualificationLevel>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<QualificationLevel>.Invalid(exception.ValidationErrors.ToList());
    }

    if (qualificationLevel is null)
    {
      return Result<QualificationLevel>.Error();
    }

    var validationErrors = qualificationLevel.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<QualificationLevel>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<QualificationLevel>(qualificationLevel.InternalCode), cancellationToken))
    {
      return Result<QualificationLevel>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(qualificationLevel, cancellationToken);

    return qualificationLevel;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<QualificationLevel>> Update(
    int id,
    QualificationLevelInput input,
    [Service] IRepository<QualificationLevel> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var qualificationLevel = await repository
      .AsQueryable(new GetByIdSpec<QualificationLevel>(id), new QualificationLevelIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (qualificationLevel is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, qualificationLevel, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<QualificationLevel>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = qualificationLevel.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<QualificationLevel>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<QualificationLevel>(qualificationLevel.InternalCode),
        new ExcludeByIdSpec<QualificationLevel>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<QualificationLevel>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(qualificationLevel, cancellationToken);

    return qualificationLevel;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<QualificationLevel> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<QualificationLevel>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<QualificationLevel> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<QualificationLevel>(ids), repository, cancellationToken);
}
