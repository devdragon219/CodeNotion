using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.CalendarAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class CalendarMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<Calendar>> Add(
    CalendarInput input,
    [Service] IRepository<Calendar> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    Calendar? calendar;

    try
    {
      calendar = await mapper.MapAsync<CalendarInput, Calendar>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Calendar>.Invalid(exception.ValidationErrors.ToList());
    }

    if (calendar is null)
    {
      return Result<Calendar>.Error();
    }

    var validationErrors = calendar.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Calendar>.Invalid(validationErrors);
    }

    await repository.AddAsync(calendar, cancellationToken);

    return calendar;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<Calendar>> Update(
    int id,
    CalendarInput input,
    [Service] IRepository<Calendar> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var calendar = await repository
      .AsQueryable(new GetByIdSpec<Calendar>(id), new CalendarIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (calendar is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, calendar, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Calendar>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = calendar.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Calendar>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(calendar, cancellationToken);

    return calendar;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<Calendar>> Duplicate(
    int id,
    [Service] IRepository<Calendar> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var calendarCopy = await repository
      .AsQueryable(new GetByIdSpec<Calendar>(id), new CalendarIncludeAllSpec())
      .AsNoTracking()
      .SingleOrDefaultAsync(cancellationToken);

    if (calendarCopy is null)
    {
      return Result.NotFound();
    }

    // removing ids
    calendarCopy.Id = default;
    
    foreach (var day in calendarCopy.Days)
    {
      day.Id = default; 
    }

    foreach (var holiday in calendarCopy.Holidays)
    {
      holiday.Id = default;
    }

    var validationErrors = calendarCopy.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Calendar>.Invalid(validationErrors);
    }

    await repository.AddAsync(calendarCopy, cancellationToken);

    return calendarCopy;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Calendar> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Calendar>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Calendar> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Calendar>(ids), repository, cancellationToken);
}
