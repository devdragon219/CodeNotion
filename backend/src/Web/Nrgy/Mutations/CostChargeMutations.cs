using RealGimm.Core.IAM;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;
using Ardalis.Result;
using RealGimm.Core.Nrgy.CostChargeAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Extensions;
using ClosedXML.Excel;
using RealGimm.Core.Fclt.Services;
using RealGimm.Core.Nrgy.Services;
using RealGimm.SharedKernel.Exceptions;
using DocumentFormat.OpenXml.Spreadsheet;

namespace RealGimm.Web.Nrgy.Mutations;

public class CostChargeMutations : MutationsBase
{
  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Create)]
  public async Task<Result<CostCharge>> Add(
    CostChargeInput input,
    [Service] IRepository<CostCharge> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    CostCharge? costCharge;

    try
    {
      costCharge = await mapper.MapAsync<CostChargeInput, CostCharge>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CostCharge>.Invalid(exception.ValidationErrors.ToList());
    }

    if (costCharge is null)
    {
      return Result<CostCharge>.Error();
    }

    var validationErrors = costCharge.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CostCharge>.Invalid(validationErrors);
    }

    await repository.AddAsync(costCharge, cancellationToken);

    return costCharge;
  }

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Update)]
  public async Task<Result<CostCharge>> Update(
    int id,
    CostChargeInput input,
    [Service] IRepository<CostCharge> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var costCharge = await repository
      .AsQueryable(new GetByIdSpec<CostCharge>(id), new CostChargeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (costCharge is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, costCharge, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<CostCharge>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = costCharge.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<CostCharge>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(costCharge, cancellationToken);
    return costCharge;
  }

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<CostCharge> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<CostCharge>(id), repository, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<CostCharge> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<CostCharge>(ids), repository, cancellationToken);

  [BackOfficePermission(Features.NRGY_COSTCHARGE_BASE, Permission.Create)]
  public async Task<Result<int>> Import(
    IFile file,
    [Service] CostChargeImportService importService,
    CancellationToken cancellationToken)
  {
    var stream = file.OpenReadStream();

    switch (System.IO.Path.GetExtension(file.Name))
    {
      case ".xls":
      case ".xlsx":
      {
        XLWorkbook workbook;

        try
        {
          workbook = new XLWorkbook(stream);
        }
        catch
        {
          return Result<int>.Invalid(ErrorCode.InvalidFileFormat.ToValidationError());
        }

        using (workbook)
        {
          try
          {
            return await importService.ImportAsyncFromExcel(workbook, cancellationToken);
          }
          catch (ValidationException validationException)
          {
            return Result<int>.Invalid(validationException.ValidationErrors);
          }
        }
      }

      case ".csv":
      {
        StreamReader reader;

        try
        {
          reader = new StreamReader(stream);
        }
        catch
        {
          return Result<int>.Invalid(ErrorCode.InvalidFileFormat.ToValidationError());
        }

        using (reader)
        {
          try
          {
            return await importService.ImportAsyncFromCsv(reader, cancellationToken);
          }
          catch (ValidationException validationException)
          {
            return Result<int>.Invalid(validationException.ValidationErrors);
          }
        }
      }
      
      default: return Result<int>.Invalid(ErrorCode.InvalidFileFormat.ToValidationError());
    }
  }
}
