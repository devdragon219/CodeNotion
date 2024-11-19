using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;

namespace RealGimm.Web.Docs.Mutations;

public class EstateUnitDocumentMutations
{
  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Create)]
  public Task<Result<Document[]>> AddRange(
    int estateUnitId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<EstateUnit> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.AddRangeAsync(estateUnitId, inputs, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Update)]
  public Task<Result<Document>> Update(
    int estateUnitId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<EstateUnit> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.UpdateAsync(estateUnitId, input, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Delete)]
  public async Task<Result<Document[]>> DeleteRange(
    int estateUnitId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
    => await DocumentMutationsHelper.DeleteRangeAsync<EstateUnit>(estateUnitId, cmisIds, repository, cancellationToken);
}
