using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Mapping;
using RealGimm.Web.Anag.Models.OrgUnit;

namespace RealGimm.Web.Anag.Mutations;

public class OrgUnitMutations : MutationsBase
{
  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Create)]
  public async Task<Result<OrgUnit>> AddManagementOrgUnit(
    ManagementOrgUnitInput orgUnitInput,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> subRepository,
    [Service] IRepository<OrgUnit> ouRepository,
    CancellationToken cancellationToken = default)
  {
    var validationErrors = new List<ValidationError>();
    var existingSubject = await subRepository.FirstOrDefaultAsync(
      new GetByIdSpec<Subject>(orgUnitInput.ParentSubjectId),
      cancellationToken);

    if (existingSubject == null)
    {
      validationErrors.Add(ErrorCode.OrgUnitInvalidParentSubjectId.ToValidationError());
      return Result<OrgUnit>.Invalid(validationErrors);
    }

    var baseInsertionResult = await BaseOrgUnitInsertion(
      OrgUnitType.ManagementHierarchy,
      existingSubject,
      orgUnitInput,
      mapper,
      subRepository,
      ouRepository,
      cancellationToken);

    return baseInsertionResult;
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Create)]
  public async Task<Result<OrgUnit>> AddGeographicalOrgUnit(
    GeographicalOrgUnitInput orgUnitInput,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> subRepository,
    [Service] IRepository<OrgUnit> ouRepository,
    CancellationToken cancellationToken = default)
  {
    var validationErrors = new List<ValidationError>();
    var existingSubject = await subRepository.FirstOrDefaultAsync(
      new GetByIdSpec<Subject>(orgUnitInput.ParentSubjectId),
      cancellationToken);

    if (existingSubject == null)
    {
      validationErrors.Add(ErrorCode.OrgUnitInvalidParentSubjectId.ToValidationError());
      return Result<OrgUnit>.Invalid(validationErrors);
    }

    var baseInsertionResult = await BaseOrgUnitInsertion(
      OrgUnitType.GeographicalHierarchy,
      existingSubject,
      orgUnitInput,
      mapper,
      subRepository,
      ouRepository,
      cancellationToken);

    if (!baseInsertionResult.IsSuccess) return baseInsertionResult;

    var addedOrgUnit = baseInsertionResult.Value;

    if (orgUnitInput.GeographicalCities is not null && orgUnitInput.GeographicalCities.Any())
    {
      addedOrgUnit.AddGeographicalCities(orgUnitInput.GeographicalCities);
      await subRepository.UpdateAsync(existingSubject, cancellationToken);
    }

    return addedOrgUnit;
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Update)]
  public async Task<Result<OrgUnit>> UpdateManagementOrgUnit(
    ManagementOrgUnitInput orgUnitInput,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> subRepository,
    [Service] IRepository<OrgUnit> ouRepository,
    CancellationToken cancellationToken = default)
  {
    var validationErrors = new List<ValidationError>();

    var existingSubject = await subRepository.FirstOrDefaultAsync(
      new GetByIdSpec<Subject>(orgUnitInput.ParentSubjectId),
      cancellationToken);

    if (existingSubject == null)
    {
      validationErrors.Add(ErrorCode.OrgUnitInvalidParentSubjectId.ToValidationError());
      return Result<OrgUnit>.Invalid(validationErrors);
    }

    var baseUpdateResult = await BaseOrgUnitUpdate(
      existingSubject,
      orgUnitInput,
      ouRepository,
      mapper,
      cancellationToken);

    if (!baseUpdateResult.IsSuccess) return baseUpdateResult;

    await subRepository.UpdateAsync(existingSubject, cancellationToken);

    var addedOrgUnit = baseUpdateResult.Value;
    return addedOrgUnit;
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Update)]
  public async Task<Result<OrgUnit>> UpdateGeographicalOrgUnit(
    GeographicalOrgUnitInput orgUnitInput,
    [Service] IMapper mapper,
    [Service] IRepository<Subject> subRepository,
    [Service] IRepository<OrgUnit> ouRepository,
    CancellationToken cancellationToken = default)
  {
    var validationErrors = new List<ValidationError>();

    var existingSubject = await subRepository.FirstOrDefaultAsync(
      new GetByIdSpec<Subject>(orgUnitInput.ParentSubjectId),
      cancellationToken);

    if (existingSubject == null)
    {
      validationErrors.Add(ErrorCode.OrgUnitInvalidParentSubjectId.ToValidationError());
      return Result<OrgUnit>.Invalid(validationErrors);
    }

    var baseUpdateResult = await BaseOrgUnitUpdate(existingSubject,
      orgUnitInput,
      ouRepository,
      mapper,
      cancellationToken);

    if (!baseUpdateResult.IsSuccess) return baseUpdateResult;

    var addedOrgUnit = baseUpdateResult.Value;
    if (orgUnitInput.GeographicalCities is not null && orgUnitInput.GeographicalCities.Any())
    {
      addedOrgUnit.SetGeographicalCities(orgUnitInput.GeographicalCities);
    }
    else
    {
      addedOrgUnit.RemoveGeographicalCities();
    }

    await subRepository.UpdateAsync(existingSubject, cancellationToken);
    return addedOrgUnit;
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Delete)]
  public Task<Result> Delete(
    int orgUnitId,
    [Service] IRepository<OrgUnit> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<OrgUnit>(orgUnitId), repository, cancellationToken);

  private static async Task<Result<OrgUnit>> BaseOrgUnitInsertion(
    OrgUnitType orgUnitType,
    Subject existingSubject,
    OrgUnitInput orgUnitInput,
    IMapper mapper,
    IRepository<Subject> subRepository,
    IRepository<OrgUnit> ouRepository,
    CancellationToken cancellationToken = default)
  {
    var orgUnit = new OrgUnit();
    orgUnit.SetType(orgUnitType);

    await mapper.MapAsync(orgUnitInput, orgUnit, cancellationToken);

    var validationErrors = orgUnit!.Validate();
    if (validationErrors.Any())
    {
      return Result<OrgUnit>.Invalid(validationErrors.ToList());
    }

    //Check for any other orgUnit with same code
    if (await ouRepository.AnyAsync(new OrgUnitByInternalCodeSpec(orgUnit.InternalCode!), cancellationToken))
    {
      return Result<OrgUnit>.Invalid(ErrorCode.DuplicateOrgUnitCode.ToValidationError());
    }

    if (orgUnitInput.ParentOrgUnitId is not null && orgUnitInput.ParentOrgUnitId.HasValue)
    {
      var result = await ChangeOrgUnitParent(orgUnitInput, orgUnit, ouRepository);
      if (!result.IsSuccess) return result;
    }

    existingSubject.AddOrgUnit(orgUnit);
    await subRepository.UpdateAsync(existingSubject, cancellationToken);

    return orgUnit;
  }

  private static async Task<Result<OrgUnit>> BaseOrgUnitUpdate(
    Subject existingSubject,
    OrgUnitInput orgUnitInput,
    IRepository<OrgUnit> ouRepository,
    IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    OrgUnit? existingOrgUnit;

    if (orgUnitInput.OrgUnitId is not null && orgUnitInput.OrgUnitId.HasValue)
    {
      existingOrgUnit = await ouRepository
        .AsQueryable(new GetByIdSpec<OrgUnit>(orgUnitInput.OrgUnitId.Value), new OrgUnitIncludeAllSpec())
        .FirstOrDefaultAsync(cancellationToken);

      if (existingOrgUnit == null)
      {
        return Result<OrgUnit>.Invalid(ErrorCode.OrgUnitInvalidId.ToValidationError());
      }
    }
    else
    {
      return Result<OrgUnit>.Invalid(ErrorCode.OrgUnitInvalidId.ToValidationError());
    }

    if (existingOrgUnit.ParentSubjectId != orgUnitInput.ParentSubjectId)
    {
      var parentSubject = existingOrgUnit.ParentSubject;
      parentSubject.RemoveOrgUnit(existingOrgUnit);

      existingSubject.AddOrgUnit(existingOrgUnit);
    }

    await mapper.MapAsync(orgUnitInput, existingOrgUnit, cancellationToken);

    var validationErrors = existingOrgUnit!.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<OrgUnit>.Invalid(validationErrors);
    }

    //Check for code collision with other orgUnits
    if (await ouRepository
      .AsQueryable(
        new OrgUnitByInternalCodeSpec(existingOrgUnit.InternalCode!),
        new ExcludeByIdSpec<OrgUnit>(existingOrgUnit.Id))
      .AnyAsync(cancellationToken))
    {
      return Result<OrgUnit>.Invalid(ErrorCode.DuplicateOrgUnitCode.ToValidationError());
    }

    if (orgUnitInput.ParentOrgUnitId is not null && orgUnitInput.ParentOrgUnitId.HasValue)
    {
      var result = await ChangeOrgUnitParent(orgUnitInput, existingOrgUnit, ouRepository, cancellationToken);
      if (!result.IsSuccess)
      {
        return result;
      }
    }
    else
    {
      existingOrgUnit.RemoveParent();
    }

    //Check if the orgUnit is being closed and has children
    if (existingOrgUnit.EntryStatus is Core.Common.EntryStatus.FrozenClosed
      && existingOrgUnit.Children.Any())
    {
      foreach (var child in existingOrgUnit.Children)
      {
        child.RemoveParent();
        child.SetParentSubject(existingOrgUnit.ParentSubject);
        if (existingOrgUnit.ParentOrgUnitId is not null)
        {
          child.SetParentOrgUnitId(existingOrgUnit.ParentOrgUnitId.Value);
        }
      }
    }

    return existingOrgUnit;
  }

  private static async Task<Result<OrgUnit>> ChangeOrgUnitParent(
    OrgUnitInput orgUnitInput,
    OrgUnit orgUnit,
    [Service] IRepository<OrgUnit> ouRepository,
    CancellationToken cancellationToken = default)
  {
    if (orgUnitInput.ParentOrgUnitId is null || orgUnitInput.ParentOrgUnitId == orgUnit.Id)
    {
      return Result<OrgUnit>.Invalid(ErrorCode.OrgUnitInvalidParentOrgUnitId.ToValidationError());
    }

    var orgUnitParent = await ouRepository.AsQueryable(new GetByIdSpec<OrgUnit>(orgUnitInput.ParentOrgUnitId.Value), new OrgUnitIncludeAllSpec()).FirstOrDefaultAsync(cancellationToken);
    if (orgUnitParent is null)
    {
      return Result<OrgUnit>.Invalid(ErrorCode.OrgUnitInvalidParentOrgUnitId.ToValidationError());
    }

    // Check for cyclical dependencies
    var parent = orgUnitParent;
    while (parent!.ParentOrgUnitId is not null)
    {
      parent = await ouRepository.GetByIdAsync(parent.ParentOrgUnitId.Value, cancellationToken);

      if (parent is not null && parent.Id == orgUnit.Id)
      {
        return Result<OrgUnit>.Invalid(ErrorCode.OrgUnitCyclicalDependencies.ToValidationError());
      }
    }

    if (orgUnitParent.ParentSubjectId != orgUnitInput.ParentSubjectId)
    {
      return Result<OrgUnit>.Invalid(ErrorCode.OrgUnitDifferentParentSubjectIds.ToValidationError());
    }

    orgUnitParent.AddChild(orgUnit);
    return orgUnitParent;
  }
}
