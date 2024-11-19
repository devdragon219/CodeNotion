using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.Services;
using ClosedXML.Excel;
using RealGimm.SharedKernel.Exceptions;

namespace RealGimm.Web.Fclt.Mutations;

public class PriceListArticleMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Create)]
  public async Task<Result<PriceListArticle>> Add(
    AddPriceListArticleInput input,
    [Service] IRepository<PriceListArticle> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    PriceListArticle? priceListArticle;

    try
    {
      priceListArticle = await mapper.MapAsync<AddPriceListArticleInput, PriceListArticle>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<PriceListArticle>.Invalid(exception.ValidationErrors.ToList());
    }

    if (priceListArticle is null)
    {
      return Result<PriceListArticle>.Error();
    }

    var validationErrors = priceListArticle.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<PriceListArticle>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<PriceListArticle>(priceListArticle.InternalCode), cancellationToken))
    {
      return Result<PriceListArticle>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(priceListArticle, cancellationToken);

    return priceListArticle;
  }

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Update)]
  public async Task<Result<PriceListArticle>> Update(
    int id,
    UpdatePriceListArticleInput input,
    [Service] IRepository<PriceListArticle> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var priceListArticle = await repository
      .AsQueryable(new GetByIdSpec<PriceListArticle>(id), new PriceListArticleIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (priceListArticle is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, priceListArticle, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<PriceListArticle>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = priceListArticle.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<PriceListArticle>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<PriceListArticle>(priceListArticle.InternalCode),
        new ExcludeByIdSpec<PriceListArticle>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<PriceListArticle>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(priceListArticle, cancellationToken);

    return priceListArticle;
  }

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<PriceListArticle> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<PriceListArticle>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<PriceListArticle> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<PriceListArticle>(ids), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_ARTICLES, Permission.Create)]
  public async Task<Result<int>> ImportFromExcel(
    IFile file,
    [Service] PriceListArticleImportService importService,
    CancellationToken cancellationToken)
  {
    XLWorkbook workbook;

    try
    {
      workbook = new XLWorkbook(file.OpenReadStream());
    }
    catch
    {
      return Result<int>.Invalid(ErrorCode.InvalidFileFormat.ToValidationError());
    }

    using (workbook)
    {
      try
      {
        return await importService.ImportAsync(workbook, cancellationToken);
      }
      catch (ValidationException validationException)
      {
        return Result<int>.Invalid(validationException.ValidationErrors);
      }
    }
  }
}
