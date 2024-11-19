using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;

namespace RealGimm.Web.Docs.Mutations;

public class CatalogueItemDocumentMutations
{
  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Create)]
  public Task<Result<Document[]>> AddRange(
    int catalogueItemId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<CatalogueItem> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.AddRangeAsync(catalogueItemId, inputs, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Update)]
  public Task<Result<Document>> Update(
    int catalogueItemId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<CatalogueItem> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.UpdateAsync(catalogueItemId, input, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_CATALOGUE, Permission.Delete)]
  public async Task<Result<Document[]>> DeleteRange(
    int catalogueItemId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
    => await DocumentMutationsHelper.DeleteRangeAsync<CatalogueItem>(catalogueItemId, cmisIds, repository, cancellationToken);
}
