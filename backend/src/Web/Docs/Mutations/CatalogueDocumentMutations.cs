using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Docs;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mutations;

public class CatalogueDocumentMutations
{
  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Create)]
  public async Task<Result<Document[]>> AddRangeAsync(
    int catalogueTypeId,
    int estateId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<CatalogueType> mapper,
    CancellationToken cancellationToken)
  {
    var documents = new List<Document>();

    foreach (var input in inputs)
    {
      Document document;

      try
      {
        document = await mapper.MapAsync(catalogueTypeId, estateId, input, cancellationToken);
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

  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Update)]
  public async Task<Result<Document>> UpdateAsync(
    int catalogueTypeId,
    int estateId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<CatalogueType> mapper,
    CancellationToken cancellationToken)
  {
    if (input.CmisId is null)
    {
      return Result<Document>.Forbidden();
    }

    var document = await repository
      .AsQueryable(new DocumentsByEntityIdSpec<CatalogueType>(catalogueTypeId), new DocumentsByEstateIdSpec(estateId))
      .SingleOrDefaultAsync(cancellationToken);

    if (document is null)
    {
      return Result<Document>.NotFound();
    }

    try
    {
      await mapper.MapAsync(catalogueTypeId, estateId, input, into: document, cancellationToken);
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
  
  [BackOfficePermission(Features.ASST_CATALOGUE_CONFIG, Permission.Delete)]
  public async Task<Result> DeleteRangeAsync(
    int catalogueTypeId,
    int estateId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
  {
    var documents = await repository
      .AsQueryable(
        new DocumentsByEntityIdSpec<CatalogueType>(catalogueTypeId),
        new DocumentsByEstateIdSpec(estateId),
        new DocumentsByCmisIdsSpec(cmisIds))
      .ToArrayAsync(cancellationToken);

    await repository.DeleteRangeAsync(documents, cancellationToken);

    return Result.Success();
  }
}
