using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Docs;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Helpers;

public static class DocumentMutationsHelper
{
  public static async Task<Result<Document[]>> AddRangeAsync<TEntity>(
    int entityId,
    DocumentInput[] inputs,
    IRepository<Document> repository,
    IDocumentMapper<TEntity> mapper,
    CancellationToken cancellationToken)
  {
    var documents = new List<Document>();

    foreach (var input in inputs)
    {
      Document document;

      try
      {
        document = await mapper.MapAsync(entityId, null, input, cancellationToken);
      }
      catch (MappingException exception)
      {
        return Result<Document[]>.Invalid(exception.ValidationErrors);
      }

      if (document is null)
      {
        return Result<Document[]>.Error();
      }

      documents.Add(document);
    }

    try
    {
      await repository.AddRangeAsync(documents, cancellationToken);
    }
    catch (DuplicateDocumentNameException)
    {
      return Result<Document[]>.Invalid(ErrorCode.DuplicateDocumentName.ToValidationError());
    }

    return documents.ToArray();
  }

  public static async Task<Result<Document>> UpdateAsync<TEntity>(
    int entityId,
    DocumentInput input,
    IRepository<Document> repository,
    IDocumentMapper<TEntity> mapper,
    CancellationToken cancellationToken)
  {
    if (input.CmisId is null)
    {
      return Result<Document>.Forbidden();
    }

    var document = await repository.SingleOrDefaultAsync(
      new DocumentByIdAndEntityIdSpec<TEntity>(entityId, input.CmisId),
      cancellationToken);

    if (document is null)
    {
      return Result<Document>.NotFound();
    }

    try
    {
      await mapper.MapAsync(entityId, null, input, into: document, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Document>.Invalid(exception.ValidationErrors);
    }

    try
    {
      await repository.UpdateAsync(document, cancellationToken);
    }
    catch (DuplicateDocumentNameException)
    {
      return Result<Document>.Invalid(ErrorCode.DuplicateDocumentName.ToValidationError());
    }

    return document;
  }

  public static async Task<Result> DeleteRangeAsync<TEntity>(
    int entityId,
    string[] cmisIds,
    IRepository<Document> repository,
    CancellationToken cancellationToken)
  {
    var documents = await repository
      .AsQueryable(new DocumentsByEntityIdSpec<TEntity>(entityId), new DocumentsByCmisIdsSpec(cmisIds))
      .ToListAsync(cancellationToken);

    await repository.DeleteRangeAsync(documents, cancellationToken);

    return Result.Success();
  }
}
