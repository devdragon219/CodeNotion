using RealGimm.Core.IAM;
using RealGimm.Core;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Prop.AdministrationAggregate;
using Ardalis.Result;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;

namespace RealGimm.Web.Prop.Mutations;

public sealed class AdministrationMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Create)]
  public async Task<Result<Administration[]>> Add(
    int estateId,
    AdministrationInput[] inputs,
    [Service] IRepository<Administration> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    if (inputs.DistinctBy(input => input.EstateId).Count() > 1 && inputs.DistinctBy(input => input.EstateId).First().EstateId != estateId)
      return Result<Administration[]>.Forbidden();

    var existingAdministrations = await repository.AsQueryable().Where(e => e.EstateId == estateId).ToListAsync(cancellationToken);

    var validateCollidingAdministration = CheckCollidingAdministrations(null, inputs, existingAdministrations);
    if (validateCollidingAdministration is not null) return Result<Administration[]>.Invalid(validateCollidingAdministration);

    IEnumerable<Administration?>? administrations;

    try
    {
      administrations = await mapper.MapAsync<AdministrationInput, Administration>(inputs, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Administration[]>.Invalid(exception.ValidationErrors.ToList());
    }

    if (administrations is null || administrations.Any(item => item is null)) return Result<Administration[]>.Error();

    foreach (var administration in administrations)
    {
      var validationErrors = administration!.Validate().ToList();
      if (validationErrors.Count > 0) return Result<Administration[]>.Invalid(validationErrors);
    }

    await repository.AddRangeAsync(administrations!, cancellationToken);
    return administrations.ToArray()!;
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Update)]
  public async Task<Result<Administration>> Update(
    int id,
    AdministrationInput input,
    [Service] IRepository<Administration> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var administration = await repository.AsQueryable(new AdministrationIncludeAllSpec(), new GetByIdSpec<Administration>(id)).SingleOrDefaultAsync(cancellationToken);
    if (administration is null) return Result.NotFound();

    var existingAdministrations = await repository.AsQueryable().Where(e => e.EstateId == input.EstateId).ToListAsync(cancellationToken);

    var validateCollidingAdministration = CheckCollidingAdministrations(id, new AdministrationInput[] { input }, existingAdministrations);
    if (validateCollidingAdministration is not null) return Result<Administration>.Invalid(validateCollidingAdministration);

    try
    {
      await mapper.MapAsync(input, administration, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Administration>.Invalid(exception.ValidationErrors.ToList());
    }

    await repository.UpdateAsync(administration, cancellationToken);
    return administration;
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Delete)]
  public async Task<Result> Delete(
    int id,
    [Service] IRepository<Administration> repository,
    CancellationToken cancellationToken = default)
  {
    var existingAdministration = await repository.AsQueryable(new AdministrationIncludeAllSpec(), new GetByIdSpec<Administration>(id)).SingleOrDefaultAsync(cancellationToken);
    if (existingAdministration is null) return Result.NotFound();

    var activeTerms = existingAdministration.Terms.Where(e => e.Until > DateOnly.FromDateTime(DateTime.UtcNow));
    if (activeTerms.Any()) return Result.Invalid(ErrorCode.AdministrationNotDeletableActiveTerms.ToValidationError());

    await repository.DeleteAsync(existingAdministration, cancellationToken);
    
    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Delete)]
  public async Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Administration> repository,
    CancellationToken cancellationToken = default)
  {
    var existingAdministration = await repository.AsQueryable(new AdministrationIncludeAllSpec(), new GetByIdsSpec<Administration>(ids)).ToListAsync(cancellationToken);
    if (!existingAdministration.Any()) return Result.NotFound();

    foreach (var administration in existingAdministration)
    {
      var activeTerms = administration.Terms.Where(e => e.Until > DateOnly.FromDateTime(DateTime.UtcNow));
      if (activeTerms.Any()) return Result.Invalid(ErrorCode.AdministrationNotDeletableActiveTerms.ToValidationError());

      await repository.DeleteAsync(administration, cancellationToken);
    }

    return Result.Success();
  }

  private ValidationError? CheckCollidingAdministrations(
    int? updateAdministrationId,
    AdministrationInput[] inputs,
    List<Administration>? existingAdministrations)
  {
    foreach (var input in inputs)
    {
      var inputCollidingAdministration = inputs.Where(e => e != input && e.AdministrationType == input.AdministrationType &&
                                                ((e.Since <= input.Since && (e.Until >= input.Since || e.Until is null)) ||
                                                (e.Since <= input.Until && (e.Until >= input.Until || e.Until is null)) ||
                                                (e.Since >= input.Since && (e.Until <= input.Until || e.Until is null))));

      if (inputCollidingAdministration is not null && inputCollidingAdministration.Any())
        return ErrorCode.AdministrationCollidingInputAdministrator.ToValidationError();

      var dbCollidingAdministration = existingAdministrations?.Where(e => e.AdministrationType == input.AdministrationType &&
                                                              ((e.Since <= input.Since && (e.Until >= input.Since || e.Until is null)) ||
                                                              (e.Since <= input.Until && (e.Until >= input.Until || e.Until is null)) ||
                                                              (e.Since >= input.Since && (e.Until <= input.Until || e.Until is null))));

      if (updateAdministrationId.HasValue) dbCollidingAdministration = dbCollidingAdministration?.Where(e => e.Id != updateAdministrationId.Value);

      if (dbCollidingAdministration is not null && dbCollidingAdministration.Any())
        return ErrorCode.AdministrationCollidingExistingAdministrator.ToValidationError();
    }
    return null;
  }
}
