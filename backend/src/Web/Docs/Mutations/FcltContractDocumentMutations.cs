using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;

namespace RealGimm.Web.Docs.Mutations;

public class FcltContractDocumentMutations
{
  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Create)]
  public Task<Result<Document[]>> AddRange(
    int contractId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Contract> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.AddRangeAsync(contractId, inputs, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Update)]
  public Task<Result<Document>> Update(
    int contractId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Contract> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.UpdateAsync(contractId, input, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Delete)]
  public async Task<Result<Document[]>> DeleteRange(
    int contractId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
    => await DocumentMutationsHelper.DeleteRangeAsync<Contract>(contractId, cmisIds, repository, cancellationToken);
}
