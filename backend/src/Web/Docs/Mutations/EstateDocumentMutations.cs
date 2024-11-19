using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;

namespace RealGimm.Web.Docs.Mutations;

public class EstateDocumentMutations
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Create)]
  public Task<Result<Document[]>> AddRange(
    int estateId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Estate> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.AddRangeAsync(estateId, inputs, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public Task<Result<Document>> Update(
    int estateId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Estate> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.UpdateAsync(estateId, input, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public async Task<Result<Document[]>> DeleteRange(
    int estateId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
    => await DocumentMutationsHelper.DeleteRangeAsync<Estate>(estateId, cmisIds, repository, cancellationToken);
}
