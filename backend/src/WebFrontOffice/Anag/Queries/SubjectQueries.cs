using Ardalis.Specification;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebFrontOffice.Anag.DataLoaders;
using RealGimm.WebFrontOffice.Anag.Queries.Filters;
using RealGimm.WebFrontOffice.Anag.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Anag.DataLoaders;
using RealGimm.WebCommons.Models;

namespace RealGimm.WebFrontOffice.Anag.Queries;

public class SubjectQueries : QueriesBase
{
  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentSubjectId,
    [Service] IReadRepository<Subject> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentSubjectId.HasValue
      ? await repository
          .AsQueryable(
            new GetByInternalCodeSpec<Subject>(internalCode.Trim()),
            new ExcludeByIdSpec<Subject>(currentSubjectId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<Subject>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  public async Task<bool> CanUseInterGroupSignature(
    string signature,
    int companyGroupId,
    int? currentSubjectId,
    [Service] IReadRepository<Subject> repository,
    CancellationToken cancellationToken = default)
  {
    var isSignatureInUse = currentSubjectId.HasValue
      ? await repository
          .AsQueryable(
            new SubjectByGroupSignatureSpec(signature.Trim(), companyGroupId),
            new ExcludeByIdSpec<Subject>(currentSubjectId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new SubjectByGroupSignatureSpec(signature.Trim(), companyGroupId), cancellationToken);

    return !isSignatureInUse;
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  public async Task<ISubject?> GetSubject(
    int subjectId,
    SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(subjectId, cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(SubjectFilterType))]
  [UseSorting(typeof(SubjectSortInputType))]
  public IQueryable<ISubject> ListSubjects(
    [Service(ServiceKind.Resolver)] IReadRepository<Subject> repository)
    => repository.AsQueryable(new EntityNonDeletedSpec<Subject>(), new SubjectIncludeAllSpec());

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  [UseFiltering(typeof(SubjectFilterType))]
  [UseSorting(typeof(SubjectSortInputType))]
  public IQueryable<ISubject> ListSubjectsFull(
    [Service(ServiceKind.Resolver)] IReadRepository<Subject> repository)
    => repository.AsQueryable(new EntityNonDeletedSpec<Subject>(), new SubjectIncludeAllSpec());

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  [UseFiltering(typeof(SubjectFilterType))]
  [UseSorting(typeof(SubjectSortInputType))]
  public async Task<FileUrlOutput> ExportSubjectsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<Subject> repository,
    [Service] IExportService<Subject> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var subjects = await repository
      .AsQueryable(new EntityNonDeletedSpec<Subject>(), new SubjectIncludeAllSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(subjects, distributedCache, exportService, cancellationToken); 
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<Subject> codeSuggest)
    => await codeSuggest.SuggestNextCode(null, (Subject?)null);

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  public bool CheckItalianTaxID(
    string firstName,
    string lastName,
    string gender,
    DateOnly birthDate,
    string cityIstatCode,
    string taxId,
    [Service] CheckItalianTaxID checkItalianTaxID)
    => checkItalianTaxID.Check(firstName, lastName, gender, birthDate, cityIstatCode, taxId);

  [BackOfficePermission(Features.ANAG_SUBJECT_BASE, Permission.Read)]
  public async Task<bool> CanBeGroupLeader(
    int managementSubjectId,
    int? subjectId,
    [Service] IRepository<Subject> repository,
    CancellationToken cancellationToken = default)
  {
    var exists = await repository.AnyAsync(new GetByIdSpec<Subject>(managementSubjectId), cancellationToken);
    if (!exists)
    {
      return false;
    }

    if (subjectId is null)
    {
      return await repository
        .AsQueryable(new GetByIdSpec<Subject>(managementSubjectId), new SubjectThatCanBeGroupLeaderSpec())
        .AnyAsync(cancellationToken);
    }

    return await repository
      .AsQueryable(new GetByIdSpec<Subject>(managementSubjectId), new SubjectThatCanBeGroupLeaderForSubjectIdSpec(subjectId.Value))
      .AnyAsync(cancellationToken);
  }
}
