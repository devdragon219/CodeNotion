using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Prop.BillAggregate;
using Ardalis.Result;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons;
using RealGimm.Core.Prop.BillAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.BillAggregate.Events;
using Rebus.Bus;

namespace RealGimm.Web.Prop.Mutations;

public sealed class BillMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Update)]
  public async Task<Result<Bill>> Update(
    int id,
    BillInput input,
    [Service] IRepository<Bill> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken)
  {
    var bill = await repository
      .AsQueryable(new GetByIdSpec<Bill>(id), new BillIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (bill is null)
    {
      return Result.NotFound();
    }

    if (bill.FinalDate.HasValue)
    {
      return Result.Forbidden();
    }

    try
    {
      await mapper.MapAsync(input, bill, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Bill>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = bill.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Bill>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(bill, cancellationToken);

    return bill;
  }

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Update)]
  public async Task<Result> Finalize(
    int[] ids,
    [Service] IRepository<Bill> repository,
    [Service] IBus bus,
    CancellationToken cancellationToken)
  {
    var bills = await repository
      .AsQueryable(new GetByIdsSpec<Bill>(ids), new BillIncludeAllSpec())
      .ToListAsync(cancellationToken);

    foreach (var bill in bills)
    {
      if (!bill.IsTemporary)
      {
        return Result.Forbidden();
      }

      bill.SetFinalDate(DateTime.UtcNow);

      var validationErrors = bill.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result.Invalid(validationErrors);
      }
    }

    await repository.UpdateRangeAsync(bills, cancellationToken);
    await bus.Publish(new BillsFinalizedEvent(bills.Select(bill => bill.Id).ToArray()));

    return Result.Success();
  }
}
