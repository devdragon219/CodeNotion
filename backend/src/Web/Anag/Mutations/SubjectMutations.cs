using Ardalis.Result;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mutations;

public class SubjectMutations : MutationsBase
{
  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Create)]
  public async Task<Result<PhysicalSubject>> AddPhysicalSubject(
    PhysicalSubjectInput input,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> repository,
    [Service] SubjectUpsertService upserter,
    [Service] ILogger<SubjectMutations> logger,
    CancellationToken cancellationToken = default)
  {
    if (input.Id is not null)
    {
      return Result<PhysicalSubject>.Forbidden();
    }

    return await UpsertPhysicalSubject(input,
      mapper,
      repository,
      logger,
      upserter,
      cancellationToken);
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Update)]
  public async Task<Result<PhysicalSubject>> UpdatePhysicalSubject(
    PhysicalSubjectInput input,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> repository,
    [Service] SubjectUpsertService upserter,
    [Service] ILogger<SubjectMutations> logger,
    CancellationToken cancellationToken = default)
  {
    if (input.Id is null)
    {
      return Result<PhysicalSubject>.Forbidden();
    }

    return await UpsertPhysicalSubject(input,
      mapper,
      repository,
      logger,
      upserter,
      cancellationToken);
  }

  private static async Task<Result<PhysicalSubject>> UpsertPhysicalSubject(
    PhysicalSubjectInput input,
    IMapper mapper,
    IRepository<Subject> repository,
    ILogger<SubjectMutations> logger,
    SubjectUpsertService upserter,
    CancellationToken cancellationToken = default)
  {
    try
    {
      var existingSubject = input.Id.HasValue
        ? await repository
          .AsQueryable(new SubjectRelationsSpec(), new GetByIdSpec<Subject>(input.Id.Value))
          .FirstOrDefaultAsync(cancellationToken)
        : null;

      var subject = await mapper.MapAsync(input, existingSubject as PhysicalSubject, cancellationToken);

      return await upserter.Upsert(subject!, cancellationToken);
    }
    catch (ArgumentOutOfRangeException e)
    {
      logger.LogError(e, "Invalid data upserting Physical Subject");
      return Result<PhysicalSubject>.Invalid(new ValidationError()
      {
        Identifier = e.Message,
        ErrorMessage = e.Message
      });
    }
    catch (MappingException e)
    {
      return Result<PhysicalSubject>.Invalid(e.ValidationErrors);
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to upsert Physical Subject");
      return Result.Error(e.Message);
    }
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Create)]
  public async Task<Result<ManagementSubject>> AddManagementSubject(
      ManagementSubjectInput input,
      [Service] IMapper mapper,
      [Service] IRepository<Subject> repository,
      [Service] SubjectUpsertService upserter,
      [Service] ILogger<SubjectMutations> logger,
      CancellationToken cancellationToken = default)
  {
    if (input.Id is not null)
    {
      return Result<ManagementSubject>.Forbidden();
    }

    return await UpsertManagementSubject(input,
      mapper,
      repository,
      logger,
      upserter,
      cancellationToken);
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Update)]
  public async Task<Result<ManagementSubject>> UpdateManagementSubject(
    ManagementSubjectInput input,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> repository,
    [Service] SubjectUpsertService upserter,
    [Service] ILogger<SubjectMutations> logger,
    CancellationToken cancellationToken = default)
  {
    if (input.Id is null)
    {
      return Result<ManagementSubject>.Forbidden();
    }

    return await UpsertManagementSubject(input,
      mapper,
      repository,
      logger,
      upserter,
      cancellationToken);
  }

  private static async Task<Result<ManagementSubject>> UpsertManagementSubject(
    ManagementSubjectInput input,
    IMapper mapper,
    IRepository<Subject> repository,
    ILogger<SubjectMutations> logger,
    SubjectUpsertService upserter,
    CancellationToken cancellationToken = default)
  {
    try
    {
      var existingSubject = input.Id.HasValue
        ? await repository
          .AsQueryable(new SubjectRelationsSpec(), new GetByIdSpec<Subject>(input.Id.Value))
          .FirstOrDefaultAsync(cancellationToken)
        : null;

      var subject = await mapper.MapAsync(input, existingSubject as ManagementSubject, cancellationToken);

      return await upserter.Upsert(subject!, cancellationToken);
    }
    catch (ArgumentOutOfRangeException e)
    {
      logger.LogError(e, "Invalid data upserting Management Subject");
      return Result<ManagementSubject>.Invalid(new ValidationError()
      {
        Identifier = e.Message,
        ErrorMessage = e.Message
      });
    }
    catch (MappingException e)
    {
      return Result<ManagementSubject>.Invalid(e.ValidationErrors);
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to upsert Management Subject");
      return Result.Error(e.Message);
    }
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Create)]
  public async Task<Result<LegalSubject>> AddLegalSubject(
    LegalSubjectInput input,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> repository,
    [Service] SubjectUpsertService upserter,
    [Service] ILogger<SubjectMutations> logger,
    CancellationToken cancellationToken = default)
  {
    if (input.Id is not null)
    {
      return Result<LegalSubject>.Forbidden();
    }

    return await UpsertLegalSubject(input,
      mapper,
      repository,
      logger,
      upserter,
      cancellationToken);
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Update)]
  public async Task<Result<LegalSubject>> UpdateLegalSubject(
    LegalSubjectInput input,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> repository,
    [Service] SubjectUpsertService upserter,
    [Service] ILogger<SubjectMutations> logger,
    CancellationToken cancellationToken = default)
  {
    if (input.Id is null)
    {
      return Result<LegalSubject>.Forbidden();
    }

    return await UpsertLegalSubject(input,
      mapper,
      repository,
      logger,
      upserter,
      cancellationToken);
  }

  private static async Task<Result<LegalSubject>> UpsertLegalSubject(
    LegalSubjectInput input,
    IMapper mapper,
    IRepository<Subject> repository,
    ILogger<SubjectMutations> logger,
    SubjectUpsertService upserter,
    CancellationToken cancellationToken = default)
  {
    try
    {
      var existingSubject = input.Id.HasValue
        ? await repository
          .AsQueryable(new SubjectRelationsSpec(), new GetByIdSpec<Subject>(input.Id.Value))
          .FirstOrDefaultAsync(cancellationToken)
        : null;

      var subject = await mapper.MapAsync(input, existingSubject as LegalSubject, cancellationToken);

      return await upserter.Upsert(subject!, cancellationToken);
    }
    catch (ArgumentOutOfRangeException e)
    {
      logger.LogError(e, "Invalid data upserting Legal Subject");
      return Result<LegalSubject>.Invalid(new ValidationError()
      {
        Identifier = e.Message,
        ErrorMessage = e.Message
      });
    }
    catch (MappingException e)
    {
      return Result<LegalSubject>.Invalid(e.ValidationErrors);
    }
    catch (Exception e)
    {
      logger.LogError(e, "Unable to upsert Legal Subject");
      return Result.Error(e.Message);
    }
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Update)]
  public async Task<Result<PhysicalSubject>> AddHeirs(
    int subjectId,
    HeirInput[] heirs,
    [Service] IRepository<Subject> repository,
    CancellationToken cancellationToken = default)
  {
    var subject = await repository
      .AsQueryable(new SubjectRelationsSpec(), new GetByIdSpec<Subject>(subjectId))
      .FirstOrDefaultAsync(cancellationToken);

    if (subject is PhysicalSubject pSubject)
    {
      foreach (var heirInput in heirs)
      {
        var heir = await repository
          .AsQueryable(new GetByIdSpec<Subject>(heirInput.Id), new SubjectRelationsSpec())
          .SingleAsync(cancellationToken);

        if (!heir.OwningMgmtSubjects.Select(sr => sr.MainId)
        .Intersect(subject.OwningMgmtSubjects.Select(sr => sr.MainId))
        .Any())
        {
          return Result.Invalid(ErrorCode.HeirMustBeManagedByCommonManagementSubject.ToValidationError());
        }

        if (heir is PhysicalSubject pHeir)
        {
          pSubject.AddHeir(pHeir, heirInput.Since, heirInput.Notes);
        }
        else
        {
          throw new ArgumentOutOfRangeException($"Heir {heir.Id} is not a physical subject");
        }
      }

      await repository.UpdateAsync(subject, cancellationToken);
      return pSubject;
    }
    else
    {
      return Result.Invalid(ErrorCode.SubjectNeedsToBeOfPhysicalType.ToValidationError());
    }
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int subjectId,
    [Service] IRepository<Subject> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteAsync(new GetByIdSpec<Subject>(subjectId), repository, cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Delete)]
  public async Task<Result> DeleteByIds(
    int[] subjectIds,
    [Service] IRepository<Subject> repository,
    CancellationToken cancellationToken = default)
    => await SoftDeleteRangeAsync(
        new ISpecification<Subject>[] { new GetByIdsSpec<Subject>(subjectIds), new SubjectIncludeAllSpec() },
        repository,
        cancellationToken);

}
