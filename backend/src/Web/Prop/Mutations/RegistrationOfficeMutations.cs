using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mutations;

public class RegistrationOfficeMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_REGISTRATION_OFFICES, Permission.Create)]
  public async Task<Result<RegistrationOffice>> Add(
    RegistrationOfficeInput input,
    [Service] IRepository<RegistrationOffice> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    RegistrationOffice? regOffice;

    try
    {
      regOffice = await mapper.MapAsync<RegistrationOfficeInput, RegistrationOffice>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<RegistrationOffice>.Invalid(exception.ValidationErrors.ToList());
    }

    if (regOffice is null)
    {
      return Result<RegistrationOffice>.Error();
    }

    var validationErrors = regOffice.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<RegistrationOffice>.Invalid(validationErrors);
    }

    await repository.AddAsync(regOffice, cancellationToken);

    return regOffice;
  }

  [BackOfficePermission(Features.PROP_REGISTRATION_OFFICES, Permission.Update)]
  public async Task<Result<RegistrationOffice>> Update(
    int id,
    RegistrationOfficeInput input,
    [Service] IRepository<RegistrationOffice> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var regOffice = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<RegistrationOffice>(id), cancellationToken);
    if (regOffice is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, regOffice, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<RegistrationOffice>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = regOffice.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<RegistrationOffice>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(regOffice, cancellationToken);

    return regOffice;
  }

  [BackOfficePermission(Features.PROP_REGISTRATION_OFFICES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<RegistrationOffice> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<RegistrationOffice>(id), repository, cancellationToken);

  [BackOfficePermission(Features.PROP_REGISTRATION_OFFICES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<RegistrationOffice> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<RegistrationOffice>(ids), repository, cancellationToken);
}
