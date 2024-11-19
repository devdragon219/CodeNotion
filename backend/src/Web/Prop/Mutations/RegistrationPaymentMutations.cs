using RealGimm.Core.IAM;
using RealGimm.Core;
using RealGimm.WebCommons.Mapping;
using Ardalis.Result;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Prop.RegistrationPaymentAggregate.Specification;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Prop.Mutations;

public sealed class RegistrationPaymentMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Create)]
  public async Task<Result<RegistrationPayment>> Add(
    RegistrationPaymentInput input,
    [Service] IRepository<RegistrationPayment> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken)
  { 
    RegistrationPayment? registrationPayment;

    try
    {
      registrationPayment = await mapper.MapAsync<RegistrationPaymentInput, RegistrationPayment>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<RegistrationPayment>.Invalid(exception.ValidationErrors.ToList());
    }

    if (registrationPayment is null)
    {
      return Result<RegistrationPayment>.Error();
    }
  
    registrationPayment.SetPaymentType(RegistrationPaymentType.ManualInput);

    await repository.AddAsync(registrationPayment, cancellationToken);
    return registrationPayment;
  }

  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Update)]
  public async Task<Result<RegistrationPayment>> Update(
    int id,
    RegistrationPaymentInput input,
    [Service] IRepository<RegistrationPayment> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var registrationPayment = await repository.AsQueryable(new RegistrationPaymentIncludeAllSpec(), 
                                                           new GetByIdSpec<RegistrationPayment>(id)).SingleOrDefaultAsync(cancellationToken);
    if (registrationPayment is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, registrationPayment, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<RegistrationPayment>.Invalid(exception.ValidationErrors.ToList());
    }

    await repository.UpdateAsync(registrationPayment, cancellationToken);
    return registrationPayment;
  }

  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<RegistrationPayment> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<RegistrationPayment>(id), repository, cancellationToken);

  [BackOfficePermission(Features.PROP_REGISTRATION_PAYMENT, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<RegistrationPayment> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<RegistrationPayment>(ids), repository, cancellationToken);
}